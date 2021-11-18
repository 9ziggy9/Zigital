// development route
import React, {useRef,
               useEffect} from 'react';
import "./canvas.css";
import frameRenderer from "./frameRenderer";
import {createGrid, handleGrid} from '../../logic/grid';

const Dev = ({tool}) => {
  const size = {width: window.innerWidth, height: window.innerHeight - 40};
  const canvasRef = useRef(null);
  // global canvas parameters
  const gridRef = useRef([]);
  const CELL_SIZE = 40;
  // for cleanup
  const requestIdRef = useRef(null);

  const renderFrame = () => {
    const ctx = canvasRef.current.getContext("2d");
    //References are passed via built in call() method.
    frameRenderer.call(ctx, size, gridRef.current);
  };

  const t = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestIdRef.current = requestAnimationFrame(t);
  }

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(t);
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    }
  }, []);

  return (
    <>
      <div className="canvas-area">
        <canvas
          {...size}
          ref={canvasRef}
        />
      </div>
    </>
  )
}

export default Dev;
