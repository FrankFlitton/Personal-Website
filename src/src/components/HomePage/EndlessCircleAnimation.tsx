"use client";

import { debounce } from "lodash";
import React, { useEffect, useRef } from "react";

const amber500 = "#f59e0b";
const amber400 = "#fbbf24";
const blue600 = "#2563eb";
const blue800 = "#1e40af";

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
  const grd = ctx.createConicGradient(
    currentAngle,
    centerX,
    centerY
    // centerX,
    // centerY,
    // // 5,
    // centerX + x,
    // centerY + y
    // radius * 1.34
  );
  grd.addColorStop(0, "#000000");
  grd.addColorStop(0.08, color);
  grd.addColorStop(0.34, color2);
  grd.addColorStop(0.45, "#000000");
  grd.addColorStop(0.55, color);
  grd.addColorStop(0.89, color2);
  grd.addColorStop(1, "#000000");

  ctx.strokeStyle = grd;
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
  // Draw the arc from 0 to currentAngle
  // const ringSteps = 28;
  const ringSteps = 21;
  for (let i = 0; i < ringSteps; i++) {
    const ringStepDeg = Math.floor(360 / ringSteps);
    const { x, y } = angleToCartesian(ringStepDeg * i, radius * 0.21);
    ring(
      ctx,
      centerX + x,
      centerY + y,
      radius / 2,
      currentAngle + (i * 2 * Math.PI) / ringSteps, // pulse effect
      color,
      color2
    );
  }
};

const EndlessCircleAnimation = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isMobile = window.innerWidth < 768;
    const image = new Image();
    image.src = "/icon.png";
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

    const handleMouseMove = (e?: MouseEvent) => {
      cursorX = isMobile ? 0 : e?.clientX || 0;
      cursorY = isMobile ? 0 : e?.clientY || 0;
      updateVariables();
    };

    // Function to resize the canvas to full window size
    const resizeCanvas = () => {
      isMobile = window.innerWidth < 768;
      w = canvas.clientWidth * window.devicePixelRatio;
      h = canvas.clientHeight * window.devicePixelRatio;
      canvas.width = w;
      canvas.height = h;
      updateVariables();
    };

    // Variables to store center coordinates and radius
    let centerX: number,
      centerY: number,
      radiusInner: number,
      radiusOuter: number;

    // Update variables when canvas size changes
    const updateVariables = () => {
      centerX = isMobile ? w / 2 : w / 2 + ((cursorX - w) / w) * -50;
      centerY = isMobile ? h * 0.45 : h * 0.45 + ((cursorY - h) / h) * -50;
      radiusInner = isMobile ? Math.max(w, h) * 0.34 : Math.min(w, h) * 0.54;
      radiusOuter = isMobile ? Math.max(w, h) * 0.89 : Math.min(w, h) * 1.32;
    };

    // Initialize canvas size and variables
    handleMouseMove();
    resizeCanvas();
    const debouncedResize = debounce(resizeCanvas, 5);
    const debouncedMouseMove = debounce(handleMouseMove, 5);
    window.addEventListener("resize", debouncedResize);
    window.addEventListener("mousemove", debouncedMouseMove);

    let currentAngle = 0;
    const speed = 0.02; // Adjust the speed of the animation
    ctx.lineCap = "round";

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ringCluster(
        ctx,
        centerX,
        centerY,
        radiusInner,
        currentAngle,
        isDark ? blue600 : amber500,
        isDark ? blue800 : amber400
      );

      // shadow puppet
      ctx.beginPath();
      ctx.arc(centerX, centerY, radiusInner * 0.68, 0, 360);
      ctx.strokeStyle = "black";
      ctx.lineWidth = radiusInner * 0.13;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radiusInner * 0.68 - radiusInner * 0.065,
        0,
        360
      );
      ctx.strokeStyle = isDark ? blue600 : amber400;
      ctx.lineWidth = 1;
      ctx.stroke();

      ringCluster(
        ctx,
        isMobile ? centerX : centerX + ((cursorX - w) / w) * -10,
        isMobile ? centerY : centerY + ((cursorY - h) / h) * -10,
        radiusOuter,
        currentAngle + 180,
        "#444444",
        "#444444"
      );

      // place image in center
      ctx.drawImage(
        image,
        isMobile
          ? centerX - radiusInner * 0.17
          : centerX - radiusInner * 0.17 + ((cursorX - w) / w) * -10,
        isMobile
          ? centerY - radiusInner * 0.17
          : centerY - radiusInner * 0.17 + ((cursorY - h) / h) * -10,
        radiusInner * 0.34,
        radiusInner * 0.34
      );
      ctx.beginPath();

      ctx.fillStyle = "goldenrod"; // hue doesn't matter here
      ctx.fill();

      currentAngle += speed;
      if (currentAngle > 2 * Math.PI) {
        currentAngle = 0; // Reset the angle to start over
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup function
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", debouncedMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        backfaceVisibility: "hidden",
        display: "block",
        backgroundColor: "black",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default EndlessCircleAnimation;
