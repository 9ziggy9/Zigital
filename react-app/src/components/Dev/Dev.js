// development route
import React, {useRef,
               useState,
               useEffect} from 'react';
import {createGrid, handleGrid} from '../../logic/grid';
import "../../index.css";

// Global canvas variables
const CELL_SIZE = 40;
const GRID = [];

const Dev = ({tool}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // const draw = (ctx, frameCount, canvas) => {
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  //   drawBackground(ctx);
  //   createGrid(ctx, CELL_SIZE, GRID);
  //   handleGrid(GRID);
  // }

  const handleMouseDown = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX,offsetY);
    setIsDrawing(true);
  }

  const handleMouseUp = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing) {
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  const drawBackground = (ctx) => {
    ctx.fillStyle = '#5fafd7';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2; //target higher resolution screens
    canvas.height = window.innerHeight * 2; //target higher resolution screens
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2,2); //target higher resolution screens
    context.lineCap = "round" //looks better
    context.lineWidth = 2;
    contextRef.current = context;

    drawBackground(contextRef.current);
    createGrid(contextRef.current, CELL_SIZE/2, GRID, 0.25);
    handleGrid(GRID);
    createGrid(contextRef.current, CELL_SIZE, GRID);
    handleGrid(GRID);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.strokeStyle = tool;
  }, [tool])

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext('2d');
  //   let frameCount = 0;
  //   let animationFrameId;

  //   const render = () => {
  //     frameCount++;
  //     draw(context, frameCount);
  //     animationFrameId = window.requestAnimationFrame(render);
  //   }

  //   render();

  //   return () => {
  //     window.cancelAnimationFrame(animationFrameId);
  //   }
  // }, [draw])

  return (
    <>
        <div className="canvas-area">
            <canvas
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove = {draw}
              ref={canvasRef}
            />
        </div>
    </>
  )
}

export default Dev;
