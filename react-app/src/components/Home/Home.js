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
import {Project} from '../../logic/classes/project';
import {Gate} from '../../logic/classes/gates';
import {toolLabels, gateLabels} from '../ComponentsTree/ComponentsTree';
import "../../index.css";

// Global canvas variables
const CELL_SIZE = 40;
const GRID = []; // general grid, used in bg rendering process
const CIRCUIT_BOARD = []; // contains drawable gate elements
const WIRE_BOARD = []; // contains cells in which wires are instantiated
let WIRE_SEGMENTS = []; // contains drawable wire segments
let GATES = []; // set of instantiated gates
let BULBS = []; // set of instantiated bulbs/endpoints
let POWER = []; // set of power sources
let OCCUPIED; // occupation array for collisions

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
  const [start, setStart] = useState({x:null, y:null});
  const [end, setEnd] = useState({x:null, y:null});

  const drawBackground = (ctx) => {
    ctx.fillStyle = '#5fafd7';
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
    OCCUPIED = [...Array(Math.floor(canvasRef.current.width / (CELL_SIZE * 2)))]
          .map(e => Array(Math.floor(canvasRef.current.height / (CELL_SIZE * 2)))
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
      openWireRoute(OCCUPIED, ctx, CELL_SIZE);
      if (isWiring) {
        const cellQuad = {x: mouse.x % CELL_SIZE - (CELL_SIZE/2),
                          y: mouse.y % CELL_SIZE - (CELL_SIZE/2)};
        const {x:endX, y:endY} = quadrantSnapper(cellQuad, mouse, CELL_SIZE);
        const {x:occX, y:occY} = occupiedSpace(endX,endY,CELL_SIZE);
        console.log(occX, occY);
        console.log(OCCUPIED[occY][occX]);

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.setLineDash([0,0]);
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
      handleWireHighlight(WIRE_BOARD, mouse, OCCUPIED, CELL_SIZE);
    }

    handleGates(GATES);
    handleBulbs(BULBS);
    handlePower(POWER);

    // handle wire segments
    // TODO: refactor this and place in grid.js
    WIRE_SEGMENTS.forEach(w => {
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.setLineDash([0,0]);
      ctx.moveTo(w.start.x, w.start.y);
      ctx.lineTo(w.end.x, w.end.y);
      ctx.stroke();
    })

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
    WIRE_SEGMENTS.push({start,end});
  },[end]);

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
        setStart(snapped);

        // Change to wiring state, important because on exit we will push
        // connection class instantiations.
        setIsWiring(true);

      } else {

        const cellQuad = {x: mouse.x % CELL_SIZE - (CELL_SIZE/2),
                          y: mouse.y % CELL_SIZE - (CELL_SIZE/2)};
        const snapped = quadrantSnapper(cellQuad, mouse, CELL_SIZE);
        setEnd(snapped);

        // Connection logic will be instantiated at this point, we will check
        // for input/outputs of gates here.
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
