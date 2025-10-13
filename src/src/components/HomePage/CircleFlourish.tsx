"use client";

import React, { useEffect, useRef } from "react";

const angleToCartesian = (
  angle: number,
  magnitude: number
): { x: number; y: number } => {
  const theta = angle * (Math.PI / 180);
  const x = magnitude * Math.cos(theta);
  const y = magnitude * Math.sin(theta);
  return { x, y };
};

const ring = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  currentAngle: number,
  color: string,
  color2: string
) => {
  // Draw the arc from 0 to currentAngle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 360);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
};

const ringCluster = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  currentAngle: number,
  color: string,
  color2: string
) => {
  const ringSteps = 6;
  for (let i = 0; i < ringSteps; i++) {
    const ringStepDeg = Math.floor(360 / ringSteps);
    const { x, y } = angleToCartesian(
      ringStepDeg * i + Math.sin(currentAngle) * 360,
      Math.sin(currentAngle) * (radius / 2)
    );
    ring(
      ctx,
      centerX + x,
      centerY + y,
      radius / 2,
      0, // pulse effect
      color,
      color2
    );
  }
};

const CircleFlourish = ({ isDark, full }: { isDark: boolean, full: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let animationFrameId: number;
    let w: number, h: number, cursorX: number, cursorY: number;

    // Function to resize the canvas to full window size
    const resizeCanvas = () => {
      w = canvas.clientWidth * window.devicePixelRatio;
      h = canvas.clientHeight * window.devicePixelRatio;
      canvas.width = w;
      canvas.height = h;
      updateVariables();
    };

    // Variables to store center coordinates and radius
    let centerX: number, centerY: number, radiusInner: number;

    // Update variables when canvas size changes
    const updateVariables = () => {
      centerX = w / 2;
      centerY = h / 2;
      radiusInner = Math.min(w, h) * 0.45;
    };

    // Initialize canvas size and variables
    resizeCanvas();

    // Set up ResizeObserver to handle canvas resizing
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);

    let currentAngle = 0;
    const speed = 0.005; // Adjust the speed of the animation
    ctx.lineCap = "round";

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ringCluster(
        ctx,
        centerX,
        centerY,
        radiusInner,
        currentAngle,
        "#888888",
        "#888888"
      );

      currentAngle += speed;
      if (currentAngle > 2 * Math.PI) {
        currentAngle = 0; // Reset the angle to start over
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup function
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isDark]);

  return (
    <div className={full ? "size-full" : "w-20 h-20"}>
      <canvas
        ref={canvasRef}
        style={{
          backfaceVisibility: "hidden",
          display: "block",
          backgroundColor: "transparent",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default CircleFlourish;
