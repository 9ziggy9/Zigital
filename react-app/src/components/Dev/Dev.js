// development route
import React, {useRef,
               useEffect} from 'react';
import "./canvas.css";
import frameRenderer from "./frameRenderer";

const Dev = ({tool}) => {
  const size = {width: 400, height: 250};
  const canvasRef = useRef(null);
  const ballRef = useRef({ x: 50, y: 50, vx: 3.9, vy: 3.3, radius: 20 });
  const requestIdRef = useRef(null);

 const updateBall = () => {
    const ball = ballRef.current;
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x + ball.radius >= size.width) {
      ball.vx = -ball.vx;
      ball.x = size.width - ball.radius;
    }
    if (ball.x - ball.radius <= 0) {
      ball.vx = -ball.vx;
      ball.x = ball.radius;
    }
    if (ball.y + ball.radius >= size.height) {
      ball.vy = -ball.vy;
      ball.y = size.height - ball.radius;
    }
    if (ball.y - ball.radius <= 0) {
      ball.vy = -ball.vy;
      ball.y = ball.radius;
    }
  };

  const renderFrame = () => {
    const ctx = canvasRef.current.getContext("2d");
    updateBall();
    frameRenderer.call(ctx, size, ballRef.current);
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
