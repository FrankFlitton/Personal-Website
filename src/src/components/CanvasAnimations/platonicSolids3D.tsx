"use client";

import React, { useEffect, useRef, useState } from "react";
import { applyGlitchEffect } from "@/utils/canvasGlitch";

const amber500 = "#f59e0b";
const amber400 = "#fbbf24";
const blue600 = "#2563eb";
const blue800 = "#1e40af";

// Define vertices for platonic solids
const platonicSolids = {
    tetrahedron: {
        vertices: [
            [1, 1, 1],
            [1, -1, -1],
            [-1, 1, -1],
            [-1, -1, 1]
        ],
        edges: [
            [0, 1], [0, 2], [0, 3],
            [1, 2], [1, 3], [2, 3]
        ]
    },
    cube: {
        vertices: [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ],
        edges: [
            [0, 1], [1, 2], [2, 3], [3, 0], // bottom face
            [4, 5], [5, 6], [6, 7], [7, 4], // top face
            [0, 4], [1, 5], [2, 6], [3, 7]  // vertical edges
        ]
    },
    octahedron: {
        vertices: [
            [1, 0, 0], [-1, 0, 0],
            [0, 1, 0], [0, -1, 0],
            [0, 0, 1], [0, 0, -1]
        ],
        edges: [
            [0, 2], [0, 3], [0, 4], [0, 5],
            [1, 2], [1, 3], [1, 4], [1, 5],
            [2, 4], [2, 5], [3, 4], [3, 5]
        ]
    },
    dodecahedron: {
        vertices: (() => {
            const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
            const invPhi = 1 / phi;
            return [
                // (±1, ±1, ±1)
                [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
                [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
                // (0, ±φ, ±1/φ)
                [0, phi, invPhi], [0, phi, -invPhi], [0, -phi, invPhi], [0, -phi, -invPhi],
                // (±1/φ, 0, ±φ)
                [invPhi, 0, phi], [invPhi, 0, -phi], [-invPhi, 0, phi], [-invPhi, 0, -phi],
                // (±φ, ±1/φ, 0)
                [phi, invPhi, 0], [phi, -invPhi, 0], [-phi, invPhi, 0], [-phi, -invPhi, 0]
            ];
        })(),
        edges: [
            // This is a simplified edge set for the dodecahedron
            [0, 8], [0, 12], [0, 16], [1, 9], [1, 13], [1, 16],
            [2, 10], [2, 12], [2, 17], [3, 11], [3, 13], [3, 17],
            [4, 8], [4, 14], [4, 18], [5, 9], [5, 15], [5, 18],
            [6, 10], [6, 14], [6, 19], [7, 11], [7, 15], [7, 19],
            [8, 9], [10, 11], [12, 14], [13, 15], [16, 17], [18, 19]
        ]
    },
    icosahedron: {
        vertices: (() => {
            const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
            return [
                // (0, ±1, ±φ)
                [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
                // (±1, ±φ, 0)
                [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
                // (±φ, 0, ±1)
                [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
            ];
        })(),
        edges: [
            [0, 2], [0, 4], [0, 6], [0, 8], [0, 10],
            [1, 3], [1, 4], [1, 6], [1, 9], [1, 11],
            [2, 5], [2, 7], [2, 8], [2, 10], [3, 5],
            [3, 7], [3, 9], [3, 11], [4, 6], [4, 8],
            [4, 9], [5, 7], [5, 8], [5, 9], [6, 10],
            [6, 11], [7, 10], [7, 11], [8, 9], [10, 11]
        ]
    }
};

// 3D rotation matrices
const rotateX = (point: number[], angle: number): number[] => {
    const [x, y, z] = point;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [x, y * cos - z * sin, y * sin + z * cos];
};

const rotateY = (point: number[], angle: number): number[] => {
    const [x, y, z] = point;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [x * cos + z * sin, y, -x * sin + z * cos];
};

const rotateZ = (point: number[], angle: number): number[] => {
    const [x, y, z] = point;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [x * cos - y * sin, x * sin + y * cos, z];
};

// Project 3D point to 2D screen coordinates
const project3D = (
    point: number[],
    centerX: number,
    centerY: number,
    scale: number,
    distance: number = 5
): { x: number; y: number } => {
    const [x, y, z] = point;
    const projectedX = (x * distance) / (distance + z) * scale + centerX;
    const projectedY = (y * distance) / (distance + z) * scale + centerY;
    return { x: projectedX, y: projectedY };
};

const drawPlatonicSolid = (
    ctx: CanvasRenderingContext2D,
    solid: { vertices: number[][]; edges: number[][] },
    centerX: number,
    centerY: number,
    scale: number,
    rotationX: number,
    rotationY: number,
    rotationZ: number,
    color: string,
    lineWidth: number = 2,
    opacity: number = 1,
    glitchAmount: number = 0
) => {
    // Apply rotations to all vertices
    const rotatedVertices = solid.vertices.map(vertex => {
        let rotated = rotateX(vertex, rotationX);
        rotated = rotateY(rotated, rotationY);
        rotated = rotateZ(rotated, rotationZ);
        return rotated;
    });

    // Project vertices to 2D
    const projectedVertices = rotatedVertices.map(vertex =>
        project3D(vertex, centerX, centerY, scale)
    );

    // Apply glitch effect
    const glitchedVertices = projectedVertices.map(point => ({
        x: point.x + (Math.random() - 0.5) * glitchAmount,
        y: point.y + (Math.random() - 0.5) * glitchAmount
    }));

    // Set opacity
    ctx.globalAlpha = opacity;

    // Draw edges with glitch effect
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";

    solid.edges.forEach(([start, end]) => {
        const startPoint = glitchedVertices[start];
        const endPoint = glitchedVertices[end];

        // Add random line breaks for glitch effect
        if (glitchAmount > 0 && Math.random() < glitchAmount / 50) {
            // Draw fragmented line
            const segments = 3 + Math.floor(Math.random() * 5);
            for (let i = 0; i < segments; i++) {
                const t1 = i / segments + (Math.random() - 0.5) * 0.1;
                const t2 = (i + 1) / segments + (Math.random() - 0.5) * 0.1;

                const x1 = startPoint.x + (endPoint.x - startPoint.x) * t1;
                const y1 = startPoint.y + (endPoint.y - startPoint.y) * t1;
                const x2 = startPoint.x + (endPoint.x - startPoint.x) * t2;
                const y2 = startPoint.y + (endPoint.y - startPoint.y) * t2;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        } else {
            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.stroke();
        }
    });

    // Draw vertices as small circles with glitch
    ctx.fillStyle = color;
    glitchedVertices.forEach(point => {
        const radius = 3 + (Math.random() - 0.5) * glitchAmount * 0.5;
        ctx.beginPath();
        ctx.arc(point.x, point.y, Math.max(1, radius), 0, Math.PI * 2);
        ctx.fill();
    });

    // Reset opacity
    ctx.globalAlpha = 1;
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
        let w: number, h: number;

        // Function to resize the canvas to full window size
        const resizeCanvas = () => {
            w = canvas.clientWidth * window.devicePixelRatio;
            h = canvas.clientHeight * window.devicePixelRatio;
            canvas.width = w;
            canvas.height = h;
            updateVariables();
        };

        // Variables to store center coordinates and scale
        let centerX: number, centerY: number, scale: number;

        // Update variables when canvas size changes
        const updateVariables = () => {
            centerX = w / 2;
            centerY = h / 2;
            scale = Math.min(w, h) * 0.15; // Increased from 0.08 to fill more of the frame
        };

        // Initialize canvas size and variables
        resizeCanvas();

        // Set up ResizeObserver to handle canvas resizing
        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });
        resizeObserver.observe(canvas);

        let currentAngle = 0;
        const speed = 0.01; // Adjust the speed of the animation

        const solids = Object.values(platonicSolids);
        const solidNames = Object.keys(platonicSolids);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Timing calculations (shared between phase matter and solid rendering)
            const morphDuration = 4000; // 4 seconds per solid
            const transitionDuration = 800; // 0.8 seconds transition
            const totalCycleTime = morphDuration + transitionDuration;
            const totalTime = Date.now();
            const cyclePosition = (totalTime % (totalCycleTime * solids.length)) / totalCycleTime;
            const currentSolidIndex = Math.floor(cyclePosition);
            const nextSolidIndex = (currentSolidIndex + 1) % solids.length;
            const phaseProgress = cyclePosition - currentSolidIndex;
            const isTransitioning = phaseProgress > (morphDuration / totalCycleTime);
            const transitionProgress = isTransitioning
                ? (phaseProgress - (morphDuration / totalCycleTime)) / (transitionDuration / totalCycleTime)
                : 0;

            // Rotation calculations (shared)
            const rotationX = currentAngle * 1.2;
            const rotationY = currentAngle * 0.8;
            const rotationZ = currentAngle * 0.6;

            // Get current solid for phase matter generation
            const currentSolid = solids[currentSolidIndex];
            const phaseScale = scale * 6; // Much larger scale for particle generation
            const particleColor = "#AAAAAA";

            const rotatedVertices = currentSolid.vertices.map(vertex => {
                let rotated = rotateX(vertex, rotationX);
                rotated = rotateY(rotated, rotationY);
                rotated = rotateZ(rotated, rotationZ);
                return rotated;
            });

            // Project vertices to 2D for particle generation
            const projectedVertices = rotatedVertices.map(vertex =>
                project3D(vertex, centerX, centerY, phaseScale)
            );

            // Generate particles around the solid's structure
            ctx.fillStyle = particleColor;

            // Particles from vertices
            projectedVertices.forEach((vertex, index) => {
                const numParticles = 8 + Math.floor(Math.random() * 12);

                for (let i = 0; i < numParticles; i++) {
                    // Random dispersion around vertex
                    const disperseRadius = 30 + Math.random() * 50;
                    const disperseAngle = (Math.random() * Math.PI * 2);
                    const startX = vertex.x + Math.cos(disperseAngle) * disperseRadius;
                    const startY = vertex.y + Math.sin(disperseAngle) * disperseRadius;

                    // Movement toward center with some variation
                    const progress = (currentAngle * 0.5 + i * 0.1 + index * 0.05) % (Math.PI * 2);
                    const moveProgress = (Math.sin(progress) + 1) / 2; // 0 to 1

                    // Current particle position (moving toward center)
                    const currentX = startX + (centerX - startX) * moveProgress;
                    const currentY = startY + (centerY - startY) * moveProgress;

                    // Particle size and opacity based on distance to center
                    const distanceToCenter = Math.sqrt((currentX - centerX) ** 2 + (currentY - centerY) ** 2);
                    const maxDistance = Math.sqrt((startX - centerX) ** 2 + (startY - centerY) ** 2);
                    const proximityFactor = 1 - (distanceToCenter / maxDistance);

                    const particleSize = 1 + proximityFactor * 2;
                    ctx.globalAlpha = 0.3 + proximityFactor * 0.5;

                    // Add slight orbital motion
                    const orbitalOffset = Math.sin(currentAngle * 2 + i) * 5;
                    const finalX = currentX + orbitalOffset;
                    const finalY = currentY + Math.cos(currentAngle * 2 + i) * 3;

                    //   ctx.beginPath();
                    //   ctx.arc(finalX, finalY, particleSize, 0, Math.PI * 2);
                    //   ctx.fill();

                    // + as particle

                    ctx.fillText("+", finalX, finalY);

                }
            });

            // Generate particles along edges for more density
            currentSolid.edges.forEach(([start, end], edgeIndex) => {
                const startVertex = projectedVertices[start];
                const endVertex = projectedVertices[end];
                const numEdgeParticles = 6 + Math.floor(Math.random() * 8);

                for (let i = 0; i < numEdgeParticles; i++) {
                    // Position along edge
                    const t = i / numEdgeParticles;
                    const edgeX = startVertex.x + (endVertex.x - startVertex.x) * t;
                    const edgeY = startVertex.y + (endVertex.y - startVertex.y) * t;

                    // Random dispersion perpendicular to edge
                    const edgeAngle = Math.atan2(endVertex.y - startVertex.y, endVertex.x - startVertex.x);
                    const perpAngle = edgeAngle + Math.PI / 2;
                    const disperseDistance = (Math.random() - 0.5) * 40;

                    const startX = edgeX + Math.cos(perpAngle) * disperseDistance;
                    const startY = edgeY + Math.sin(perpAngle) * disperseDistance;

                    // Movement toward center
                    const progress = (currentAngle * 0.3 + i * 0.15 + edgeIndex * 0.08) % (Math.PI * 2);
                    const moveProgress = (Math.sin(progress) + 1) / 2;

                    const currentX = startX + (centerX - startX) * moveProgress;
                    const currentY = startY + (centerY - startY) * moveProgress;

                    // Particle rendering
                    const distanceToCenter = Math.sqrt((currentX - centerX) ** 2 + (currentY - centerY) ** 2);
                    const maxDistance = Math.sqrt((startX - centerX) ** 2 + (startY - centerY) ** 2);
                    const proximityFactor = 1 - (distanceToCenter / maxDistance);

                    const particleSize = 0.8 + proximityFactor * 1.5;
                    ctx.globalAlpha = 0.2 + proximityFactor * 0.4;

                    ctx.beginPath();
                    ctx.arc(currentX, currentY, particleSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Reset alpha
            ctx.globalAlpha = 1;

            // Center position
            const x = centerX;
            const y = centerY;

            // Scale with subtle pulsing
            const baseScale = scale * 2;
            const pulseScale = baseScale * (1 + Math.sin(currentAngle * 2) * 0.1);

            if (!isTransitioning) {
                // Normal display of current solid
                const currentSolid = solids[currentSolidIndex];
                const color = isDark ? blue600 : amber500;

                drawPlatonicSolid(
                    ctx,
                    currentSolid,
                    x,
                    y,
                    pulseScale,
                    rotationX,
                    rotationY,
                    rotationZ,
                    color,
                    2,
                    1,
                    0
                );

            } else {
                // Transition phase - glitch effect
                const currentSolid = solids[currentSolidIndex];
                const nextSolid = solids[nextSolidIndex];

                // Glitch intensifies during middle of transition
                const glitchIntensity = Math.sin(transitionProgress * Math.PI) * 30;

                // Current solid fades out with glitch
                const currentOpacity = 1 - transitionProgress;
                const currentColor = isDark ? blue600 : amber500;

                drawPlatonicSolid(
                    ctx,
                    currentSolid,
                    x,
                    y,
                    pulseScale,
                    rotationX + (Math.random() - 0.5) * transitionProgress,
                    rotationY + (Math.random() - 0.5) * transitionProgress,
                    rotationZ + (Math.random() - 0.5) * transitionProgress,
                    currentColor,
                    2,
                    currentOpacity,
                    glitchIntensity
                );

                // Next solid fades in with glitch
                if (transitionProgress > 0.3) {
                    const nextOpacity = (transitionProgress - 0.3) / 0.7;
                    const nextColor = isDark ? blue800 : amber400;

                    drawPlatonicSolid(
                        ctx,
                        nextSolid,
                        x + (Math.random() - 0.5) * glitchIntensity * 0.5,
                        y + (Math.random() - 0.5) * glitchIntensity * 0.5,
                        pulseScale,
                        rotationX + (Math.random() - 0.5) * (1 - transitionProgress),
                        rotationY + (Math.random() - 0.5) * (1 - transitionProgress),
                        rotationZ + (Math.random() - 0.5) * (1 - transitionProgress),
                        nextColor,
                        2,
                        nextOpacity,
                        glitchIntensity * (1 - transitionProgress)
                    );
                }

                // Glitched text during transition
                if (Math.random() < 0.7) {
                    ctx.fillStyle = isDark ? "#ffffff" : "#000000";
                    ctx.font = `${scale * 0.4}px monospace`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "top";

                    const currentName = transitionProgress < 0.5 ?
                        solidNames[currentSolidIndex] : solidNames[nextSolidIndex];

                    // Glitch the text
                    let glitchedName = currentName.toUpperCase();
                    if (Math.random() < transitionProgress) {
                        glitchedName = glitchedName.split('').map(char =>
                            Math.random() < 0.3 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char
                        ).join('');
                    }

                    ctx.fillText(
                        glitchedName,
                        x + (Math.random() - 0.5) * glitchIntensity * 0.3,
                        y + baseScale * 1.2 + (Math.random() - 0.5) * glitchIntensity * 0.2
                    );
                }
            }

            // Apply glitch effect if hovering
            if (isHovered) {
                applyGlitchEffect(ctx, w, h);
            }

            currentAngle += speed;
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