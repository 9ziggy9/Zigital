import React, {useRef,
               useState,
               useEffect} from 'react';
import {createGrid, handleGrid, handleHighlight, handleGates} from '../../logic/grid';
import {Gate} from '../../logic/classes/gates';
import "../../index.css";

// Global canvas variables
const CELL_SIZE = 40;
const GRID = [];
const CIRCUIT_BOARD = [];
const GATES = [];
let OCCUPIED;

const Home = ({tool}) => {
  const backgroundRef = useRef(null);
  const backgroundCtxRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const circuitBoardRef = useRef([]);
  const mouseRef = useRef({
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1,
  });
  const [isDrawing, setIsDrawing] = useState(false);

  const handleClick = ({nativeEvent}) => {
    const mouse = mouseRef.current;
    const context = contextRef.current;
    const gridPositionX = mouse.x - (mouse.x % (CELL_SIZE * 2));
    const gridPositionY = mouse.y - (mouse.y % (CELL_SIZE * 2));
    GATES.push(new Gate(gridPositionX, gridPositionY, CELL_SIZE, context));
    console.log(gridPositionX / (CELL_SIZE * 2), gridPositionY / (CELL_SIZE * 2));
  }

  const handleMouseDown = ({nativeEvent}) => {
    // const {offsetX, offsetY} = nativeEvent;
    // contextRef.current.beginPath();
    // contextRef.current.moveTo(offsetX,offsetY);
    // setIsDrawing(true);
  }

  const handleMouseUp = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const mouseMove = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    mouseRef.current.x = offsetX;
    mouseRef.current.y = offsetY;
    mouseRef.current.width = 0.1;
    mouseRef.current.height = 0.1;
  }

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
    OCCUPIED = [...Array(Math.floor(canvasRef.current.width / (CELL_SIZE * 4)))]
          .map(e => Array(Math.floor(canvasRef.current.height / (CELL_SIZE * 4)))
          .fill(0));
  }, []);

  // THIS IS FRAME RENDERING CALLED BY ANIMATION LOOP
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    let mouse = mouseRef.current;
    ctx.fillStyle = tool;
    handleHighlight(CIRCUIT_BOARD, mouse, tool);
    handleGates(GATES);
    // Let's see what circuit board grid looks like
    CIRCUIT_BOARD.forEach(e => {
      ctx.strokeStyle = 'red';
      ctx.strokeRect(e.x, e.y, e.width, e.height);
    })
    ctx.beginPath()
    ctx.arc(580, 360, 80*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.strokeStyle = tool;
    console.log(OCCUPIED);
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
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={mouseMove}
          ref={canvasRef}
        />
      </div>
    </>
  )
}

export default Home;
