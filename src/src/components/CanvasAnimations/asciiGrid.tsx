"use client";

import React, { useEffect, useRef, useState } from "react";
import { applyGlitchEffect } from "@/utils/canvasGlitch";

const amber500 = "#f59e0b";
const amber400 = "#fbbf24";
const blue600 = "#2563eb";
const blue800 = "#1e40af";

const makeAsciiGrid = (
    ctx: CanvasRenderingContext2D,
    currentAngle: number,
    width: number,
    height: number,
    centerX: number,
    centerY: number,
    radiusInner: number,
    cellSize: number,
    color: string,
    color2: string
) => {

    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.font = `${cellSize * 0.8}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const frame = width;
    const timeline = frame * 5

    const padding = radiusInner;

    // circle animation
    const firstThreshEnter = ((currentAngle % timeline) / timeline) * frame;
    const secondThreshEnter = Math.sin((currentAngle % timeline) / timeline * Math.PI * 3) * radiusInner + padding;

    // Character string and function to get character by position
    const firstString = "OURFATHERWHOARTINHEAVEN_HALLOWEDBETHYNAME";
    const secondString = "JOHN117:1-26";
    const getChar = (str: string, index: number) => str[index % str.length];

    let charIndex = 0;

    for (let col = 0; col <= cols; col++) {
        for (let row = 0; row <= rows; row++) {
            const x = col * cellSize + cellSize / 2;
            const y = row * cellSize + cellSize / 2;

            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < firstThreshEnter && distance > padding) {
                ctx.fillStyle = color;
                ctx.fillText(getChar(firstString, charIndex), x, y);

            } else if (distance < secondThreshEnter) {
                ctx.fillStyle = color2;
                ctx.fillText(getChar(secondString, charIndex), x, y);
            } else {
                // Optional: Draw a faint grid or leave blank
                ctx.fillStyle = "#444"; // Faint color for inactive cells
                const char = Math.random() < 0.32 ? "▢" : "▣";
                ctx.fillText(char, x, y);
            }
            charIndex++;
        }
    }
    // Precompute squares to draw for vertical and horizontal bars
    const centerCol = Math.round(centerX / cellSize);
    const centerRow = Math.round(centerY / cellSize);
    const jitterProbability = 0.025;

    // Vertical bar: longer, centered
    const verticalBarLength = Math.floor(rows * 0.7);
    const verticalBarStart = centerRow - Math.floor(verticalBarLength / 2);
    const verticalBarEnd = centerRow + Math.floor(verticalBarLength / 2);

    // Horizontal bar: shorter, centered horizontally, higher up
    const horizontalBarLength = Math.floor(cols * 0.35);
    const horizontalBarStart = centerCol - Math.floor(horizontalBarLength / 2);
    const horizontalBarEnd = centerCol + Math.floor(horizontalBarLength / 2);
    const horizontalBarRow = centerRow - Math.floor(verticalBarLength * 0.25);

    // Helper to check if a cell contains a valid character (not "•")
    const isValidChar = (col: number, row: number) => {
        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < firstThreshEnter && distance > padding) {
            return true;
        } else if (distance < secondThreshEnter) {
            return true;
        }
        return false;
    };

    // Collect squares to draw
    const squares: { x: number; y: number }[] = [];

    for (let row = verticalBarStart; row <= verticalBarEnd; row++) {
        if (Math.random() < jitterProbability && isValidChar(centerCol, row)) {
            squares.push({
                x: centerCol * cellSize + cellSize / 2,
                y: row * cellSize + cellSize / 2,
            });
        }
    }
    for (let col = horizontalBarStart; col <= horizontalBarEnd; col++) {
        if (Math.random() < jitterProbability && isValidChar(col, horizontalBarRow)) {
            squares.push({
                x: col * cellSize + cellSize / 2,
                y: horizontalBarRow * cellSize + cellSize / 2,
            });
        }
    }

    // Draw lines connecting the squares
    if (squares.length > 1) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(squares[0].x, squares[0].y);
        for (let i = 1; i < squares.length; i++) {
            ctx.lineTo(squares[i].x, squares[i].y);
        }
        ctx.stroke();
        ctx.restore();
    }

    // Paint the squares
    for (const { x, y } of squares) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(x - cellSize / 2, y - cellSize / 2, cellSize, cellSize);
        ctx.restore();
    }

};

const Component = ({ isDark }: { isDark: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isHovered, setIsHovered] = useState(false);

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
        const speed = 5; // Adjust the speed of the animation
        ctx.lineCap = "round";

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            makeAsciiGrid(ctx, currentAngle, w, h, centerX, centerY, radiusInner,
                20, isDark ? blue600 : amber500, isDark ? blue800 : amber400);

            // Apply glitch effect if hovering
            if (isHovered) {
                applyGlitchEffect(ctx, w, h);
            }

            currentAngle += speed % (w * 2);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            // Cleanup function
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
        };
    }, [isDark, isHovered]);

    return (
        <div className="w-full h-full">
            <canvas
                ref={canvasRef}
                className="bg-black block w-full h-full relative select-none cursor-pointer"
                style={{
                    backfaceVisibility: "hidden",
                }}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            />
        </div>
    );
};

export default Component;
