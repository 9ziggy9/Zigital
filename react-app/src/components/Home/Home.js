import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import {
  createGrid,
  handleGrid,
  handleGateHighlight,
  handleWireHighlight,
  handleGates,
  aStar
} from '../../logic/grid';
import {Gate} from '../../logic/classes/gates';
import {toolLabels, gateLabels} from '../ComponentsTree/ComponentsTree';
import "../../index.css";

// Global canvas variables
const CELL_SIZE = 40;
const GRID = [];
const CIRCUIT_BOARD = [];
const WIRE_BOARD = [];
const GATES = [];
let OCCUPIED;

const Home = ({tool}) => {
  const backgroundRef = useRef(null);
  const backgroundCtxRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const mouseRef = useRef({
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1,
  });
  const [isWiring, setIsWiring] = useState(false);
  const [start, setStart] = useState({point: {x:null, y:null}, parent: null});

  const drawBackground = (ctx) => {
    ctx.fillStyle = '#5fafd7';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  useEffect(() => {
    const canvas = backgroundRef.current;
    canvas.width = window.innerWidth * 2; //target higher resolution screens
    canvas.height = window.innerHeight * 2; //target higher resolution screens
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2,2); //target higher resolution screens
    context.lineCap = "round" //looks better
    context.lineWidth = 2;
    backgroundCtxRef.current = context;

    const app = canvasRef.current;
    app.width = window.innerWidth * 2; //target higher resolution screens
    app.height = window.innerHeight * 2; //target higher resolution screens
    app.style.width = `${window.innerWidth}px`;
    app.style.height = `${window.innerHeight}px`;

    const app_ctx = app.getContext('2d');
    app_ctx.scale(2,2); //target higher resolution screens
    app_ctx.lineCap = "round" //looks better
    app_ctx.lineWidth = 2;
    contextRef.current = app_ctx;

    // Initialize background grid
    drawBackground(backgroundCtxRef.current);
    createGrid(backgroundCtxRef.current, CELL_SIZE/2, GRID, 0.25);
    handleGrid(GRID);
    createGrid(backgroundCtxRef.current, CELL_SIZE, GRID);
    handleGrid(GRID);

    // Initialize circuit board
    createGrid(contextRef.current, CELL_SIZE*2, CIRCUIT_BOARD, 4);
    createGrid(contextRef.current, CELL_SIZE, WIRE_BOARD, 4);
    OCCUPIED = [...Array(Math.floor(canvasRef.current.width / (CELL_SIZE * 2)))]
          .map(e => Array(Math.floor(canvasRef.current.height / (CELL_SIZE * 2)))
          .fill(0));
  }, []);

  // THIS IS FRAME RENDERING CALLED BY ANIMATION LOOP
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    let mouse = mouseRef.current;

    // Selection highlighting
    if (gateLabels.has(tool)) {
      handleGateHighlight(CIRCUIT_BOARD, mouse);
    }
    if (tool === "wire") {
      handleWireHighlight(WIRE_BOARD, mouse);
    }

    handleGates(GATES, tool);

    for (let y = 0; y < OCCUPIED[0].length; y++) {
      for (let x= 0; x < OCCUPIED.length; x++) {
        ctx.lineWidth=4;
        ctx.strokeStyle="green";
        ctx.strokeRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
        if (OCCUPIED[y][x]===1)
          ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
      }
    }
    // CIRCUIT_BOARD.forEach(e => {
    //   ctx.strokeStyle = 'red';
    //   ctx.strokeRect(e.x, e.y, e.width, e.height);
    // })

    // Using this as a performance indication
    ctx.beginPath()
    ctx.arc(1100, 720, 80*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
    // Using this as a speed indication
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.strokeStyle = tool;
  }, [tool])


  useEffect(() => {
    const context = contextRef.current;
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    }

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw])

  const handleClick = ({nativeEvent}) => {
    const mouse = mouseRef.current;
    const context = contextRef.current;
    let gridPositionX, gridPositionY;

    if (gateLabels.has(tool)) {
      gridPositionX = mouse.x - (mouse.x % (CELL_SIZE * 2));
      gridPositionY = mouse.y - (mouse.y % (CELL_SIZE * 2));
      GATES.push(new Gate(gridPositionX, gridPositionY, CELL_SIZE, context, tool));
      // INPUT JUNCTIONS
      OCCUPIED[gridPositionY/CELL_SIZE][gridPositionX/CELL_SIZE] = 'i';
      OCCUPIED[(gridPositionY/CELL_SIZE) + 1][gridPositionX/CELL_SIZE] = 'i';
      // GATE ITSELF (expanded to deter path finding along edges)
      // Primary cells
      OCCUPIED[gridPositionY/CELL_SIZE][(gridPositionX/CELL_SIZE) + 1] = 1;
      OCCUPIED[gridPositionY/CELL_SIZE][(gridPositionX/CELL_SIZE) + 2] = 1;
      OCCUPIED[(gridPositionY/CELL_SIZE)+1][(gridPositionX/CELL_SIZE) + 1] = 1;
      OCCUPIED[(gridPositionY/CELL_SIZE)+1][(gridPositionX/CELL_SIZE) + 2] = 1;
      // OUTPUT JUNCTIONS
      OCCUPIED[gridPositionY/CELL_SIZE][(gridPositionX/CELL_SIZE)+3] = 'i';
      OCCUPIED[(gridPositionY/CELL_SIZE) + 1][(gridPositionX/CELL_SIZE)+3] = 'i';
    }
    if (tool === 'wire') {
      if (!isWiring) {
        setStart({point: {x:mouse.x - (mouse.x % CELL_SIZE),
                          y:mouse.y - (mouse.y % CELL_SIZE)},
                  parent: null});
        setIsWiring(true);
        console.log(start);
      } else {
        setStart({point: {x:null, y:null}, parent: null});
        setIsWiring(false);
        console.log(start);
      }
    }
  }

  // const handleMouseDown = ({nativeEvent}) => {
  //   const {offsetX, offsetY} = nativeEvent;
  //   contextRef.current.beginPath();
  //   contextRef.current.moveTo(offsetX,offsetY);
  //   setIsWiring(true);
  // }

  // const handleMouseUp = () => {
  //   contextRef.current.closePath();
  //   setIsWiring(false);
  // }

  const mouseMove = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    mouseRef.current.x = offsetX;
    mouseRef.current.y = offsetY;
    mouseRef.current.width = 0.1;
    mouseRef.current.height = 0.1;
    if (isWiring) {
      const endX = mouseRef.current.x - mouseRef.current.x % CELL_SIZE;
      const endY = mouseRef.current.y - mouseRef.current.y % CELL_SIZE;
      const end = {
        point: {x: endX, y: endY},
        parent: null
      }
      const ACCESSIBLE = OCCUPIED.map(o => {
        if (o === true) return false;
        else return true;
      });
      aStar(start,end,OCCUPIED[0].length,OCCUPIED.length,ACCESSIBLE);
    }
  }


  return (
    <>
      <div className="canvas-bg-area">
        <canvas
          ref={backgroundRef}
        />
      </div>
      <div className="canvas-area">
        <canvas
          onClick={handleClick}
          /* onMouseDown={handleMouseDown} */
          /* onMouseUp={handleMouseUp} */
          onMouseMove={mouseMove}
          ref={canvasRef}
        />
      </div>
    </>
  )
}

export default Home;
