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
  handleBulbs,
  handlePower,
  quadrantSnapper,
  generateComponent,
  openWireRoute,
  occupiedSpace,
} from '../../logic/grid';
import {aStar} from '../../logic/astar.js';
import {Project} from '../../logic/classes/project';
import {Gate} from '../../logic/classes/gates';
import {toolLabels, gateLabels} from '../ComponentsTree/ComponentsTree';
import "../../index.css";

// Global canvas variables
const CELL_SIZE = 20;
const GRID = []; // general grid, used in bg rendering process
const CIRCUIT_BOARD = []; // contains drawable gate elements
const WIRE_BOARD = []; // contains cells in which wires are instantiated
let WIRE_SEGMENTS = []; // contains drawable wire segments
let GATES = []; // set of instantiated gates
let BULBS = []; // set of instantiated bulbs/endpoints
let POWER = []; // set of power sources
let OCCUPIED; // occupation array for collisions
let WIRE_COLORS = ['black', 'black', '#ffaf00', "#d75f00", '#d70000', '#5f8700',
                  '#ff5faf', '#8700af', '#d7875f', '#d0d0d0', '#af005f']

const Home = ({tool, save, setSave}) => {
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
  const [start, setStart] = useState({x:null, y:null});
  const [end, setEnd] = useState({x:null, y:null});
  const [occStart, setOccStart] = useState({x:null, y:null});
  const [occEnd, setOccEnd] = useState({x:null, y:null});
  const [wireRoute, setWireRoute] = useState([]);
  const [io, setIo] = useState('start');
  const [wireColor, setWireColor] = useState(0);

  const drawBackground = (ctx) => {
    ctx.fillStyle = '#696969';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  // // // // // ////
  // sponge: init //
  // // // // // //

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
    createGrid(contextRef.current, CELL_SIZE/2, WIRE_BOARD, 4);
    OCCUPIED = [...Array(Math.floor(canvasRef.current.height / (CELL_SIZE * 2)))]
          .map(e => Array(Math.floor(canvasRef.current.width / (CELL_SIZE * 2)))
          .fill(0));
  }, []);

  // // // // // // // // // // //
  // DRAW frames called by     //
  // render                   //
  // sponge: draw            //
  // // // // // // // // ////

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    let mouse = mouseRef.current;

    // Selection highlighting
    if (gateLabels.has(tool)) {
      handleGateHighlight(CIRCUIT_BOARD, mouse);
    }
    if (tool === "wire") {
      openWireRoute(OCCUPIED, ctx, CELL_SIZE, io);
      if (isWiring) {
        const cellQuad = {x: mouse.x % CELL_SIZE - (CELL_SIZE/2),
                          y: mouse.y % CELL_SIZE - (CELL_SIZE/2)};
        const {x:endX, y:endY} = quadrantSnapper(cellQuad, mouse, CELL_SIZE);

        // MANUAL WIRING, we will eschew this for A*
        // ctx.beginPath();
        // ctx.strokeStyle = 'black';
        // ctx.setLineDash([0,0]);
        // ctx.moveTo(start.x, start.y);
        // ctx.lineTo(endX, endY);
        // ctx.stroke();
      }
      handleWireHighlight(WIRE_BOARD, mouse, OCCUPIED, CELL_SIZE);
    }

    // handle wire segments
    // TODO: refactor this and place in grid.js
    // In reality, all that really needs to be done is to implement A* as a
    // subroutine to this process, the wires themselves are meaningless, only
    // instantiation of the future connection class.
    //
    // Remember that WIRE_SEGMENTS is an array with objects of type
    // {start: {x,y}, end: {x,y}}

    WIRE_SEGMENTS.forEach(w => {
      ctx.beginPath();
      ctx.moveTo(w.start.x, w.start.y);
      ctx.lineTo(w.end.x, w.end.y);
      ctx.strokeStyle = w.color;
      ctx.stroke();
    })

    handleGates(GATES);
    handleBulbs(BULBS);
    handlePower(POWER);


    // Using this as a performance indication
    ctx.beginPath()
    ctx.arc(1100, 720, 80*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.strokeStyle = tool;
  }, [tool])

  // // // // // // // // // // //
  // RENDER LOOP => calls draw //
  // sponge: render           //
  // // // // // // // // // //

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

  useEffect(() => {
    for (let n = 0; n < wireRoute.length - 1; n++) {
      const X0 = wireRoute[n].x;
      const Y0 = wireRoute[n].y;
      const X1 = wireRoute[n+1].x;
      const Y1 = wireRoute[n+1].y;
      WIRE_SEGMENTS.push({
        start: {x: X0 * CELL_SIZE + CELL_SIZE/2, y: Y0 * CELL_SIZE + CELL_SIZE/2},
        end: {x: X1 * CELL_SIZE + CELL_SIZE/2, y: Y1 * CELL_SIZE + CELL_SIZE/2},
        color: WIRE_COLORS[wireColor % WIRE_COLORS.length]
      })
    }
    setWireColor(n => n+1);
  }, [end]);

  const handleClick = ({nativeEvent}) => {
    const mouse = mouseRef.current;
    const context = contextRef.current;

    // // // // // // // // // // //
    // GATE STATE LOGIC HANDLING //
    // sponge: gates            //
    // // // // // // // // // //

    if (gateLabels.has(tool)) {
      generateComponent(GATES, OCCUPIED, mouse, CELL_SIZE, context, tool)
    }

    if (tool === 'power') {
      generateComponent(POWER, OCCUPIED, mouse, CELL_SIZE, context, tool)
    }

    if (tool === 'bulb') {
      generateComponent(BULBS, OCCUPIED, mouse, CELL_SIZE, context, tool)
    }

    // // // // // // // // // // //
    // TOOL STATE LOGIC HANDLING //
    // sponge: wires            //
    // // // // // // // // // //

    if (tool === 'wire') {
      if (!isWiring) {

        // The following object contains the information necessary to determine
        // what quadrant a click on a cell lives in. We use this in the if/else
        // to determine establish with respect to what point of reference we shoud
        // be finding the center relative to.

        const cellQuad = {x: mouse.x % CELL_SIZE - (CELL_SIZE/2),
                          y: mouse.y % CELL_SIZE - (CELL_SIZE/2)};
        const snapped = quadrantSnapper(cellQuad, mouse, CELL_SIZE);
        const {x:occX, y:occY} = occupiedSpace(snapped.x,snapped.y,CELL_SIZE);
        const junction = OCCUPIED[occY][occX];

        if(junction < -1) {
          setIo('input');
        }
        if(junction > 1) {
          setIo('output');
        }

        setStart(snapped);
        setOccStart({x:occX,y:occY});

        // Change to wiring state, important because on exit we will push
        // connection class instantiations.
        setIsWiring(true);

      } else {

        const cellQuad = {x: mouse.x % CELL_SIZE - (CELL_SIZE/2),
                          y: mouse.y % CELL_SIZE - (CELL_SIZE/2)};
        const snapped = quadrantSnapper(cellQuad, mouse, CELL_SIZE);
        const {x:occX, y:occY} = occupiedSpace(snapped.x,snapped.y,CELL_SIZE);
        setIo('start');
        setEnd(snapped);
        setOccEnd({x:occX,y:occY})

        // sponge: aStar call!
        // Connection logic will be instantiated at this point, we will check
        // for input/outputs of gates here.
        // NOTE: we pass points in this form so that a history lookup is aware
        // of each cell's previous step, i.e. parent.
        const wirePath = aStar(OCCUPIED, {point: {x:occStart.x,y:occStart.y},
                                          parent:null},
                                         {point: {x:occX,y:occY},
                                          parent:null},
                                          canvasRef.current,
                                          CELL_SIZE);
        setWireRoute(wirePath);
        setIsWiring(false);
      }
    }

    if (tool === 'delete') {
      GATES = GATES.filter(G =>
        !(mouse.x - G.x <= G.width && mouse.x - G.x > 0 &&
          mouse.y - G.y <= G.height && mouse.y - G.y > 0 ));
      WIRE_SEGMENTS = WIRE_SEGMENTS.filter(W => {
        //need to implement this, for now, just clear
        return false;
      });
      BULBS = BULBS.filter(G =>
        !(mouse.x - G.x <= G.width && mouse.x - G.x > 0 &&
          mouse.y - G.y <= G.height && mouse.y - G.y > 0 ));
      POWER = POWER.filter(G =>
        !(mouse.x - G.x <= G.width && mouse.x - G.x > 0 &&
          mouse.y - G.y <= G.height && mouse.y - G.y > 0 ));
    }

    setSave(new Project(GATES, BULBS, POWER, WIRE_SEGMENTS, OCCUPIED))
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
  }

  const handleLeftClick = (e) => {
    e.preventDefault();
    if(isWiring) {
      setIsWiring(false);
      setIo('start');
    }
    console.log(OCCUPIED);
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
          onContextMenu={handleLeftClick}
          onMouseMove={mouseMove}
          ref={canvasRef}
        />
      </div>
    </>
  )
}

export default Home;
