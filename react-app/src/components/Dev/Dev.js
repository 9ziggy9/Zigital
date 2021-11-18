// development route
import React, {useRef,
               useState,
               useEffect} from 'react';
import {createGrid, handleGrid} from '../../logic/grid';
import "../../index.css";

const Dev = ({tool}) => {
  const size = {width: 400, height: 250};
  const canvasRef = useRef(null);

  const renderFrame = () => {
    // ... render logic
  };

  const t = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestAnimationFrame(t);
  }

  useEffect(() => {
    requestAnimationFrame(t);
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
