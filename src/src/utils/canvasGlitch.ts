/**
 * Applies a horizontal glitch effect to a canvas context
 * Slices the canvas into horizontal rows and randomly offsets/filters them
 */
export const applyGlitchEffect = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    options?: {
        rowHeight?: number;
        glitchProbability?: number;
        maxOffset?: number;
    }
) => {
    const rowHeight = options?.rowHeight ?? 25; // Height of each horizontal slice
    const numRows = Math.floor(height / rowHeight);
    const glitchProbability = options?.glitchProbability ?? 0.05; // Probability of a row being glitched
    const maxOffset = options?.maxOffset ?? 200; // Maximum horizontal offset

    // Get the current canvas image data
    const imageData = ctx.getImageData(0, 0, width, height);

    // Create a temporary canvas to work with
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) return;

    tempCtx.putImageData(imageData, 0, 0);

    // Clear the original canvas
    ctx.clearRect(0, 0, width, height);

    // Process each row
    for (let i = 0; i < numRows; i++) {
        const y = i * rowHeight;

        if (Math.random() < glitchProbability) {
            // Apply glitch to this row
            const offsetX = (Math.random() - 0.5) * maxOffset;
            const effectType = Math.random();

            // Save the current state
            ctx.save();

            // Apply filter effect (greyscale or hue rotation)
            if (effectType < 0.4) {
                // Greyscale with random contrast and brightness
                ctx.filter = `grayscale(${Math.random() * 100}%) contrast(${1 - Math.random()}) brightness(${1 + Math.random() * 50})`;
            } else if (effectType < 0.8) {
                // Hue rotation
                ctx.filter = `hue-rotate(${Math.random() * 360}deg)`;
            } else {
                // Combination
                ctx.filter = `hue-rotate(${Math.random() * 360}deg) saturate(${150 + Math.random() * 100}%)`;
            }

            // Draw the offset row
            ctx.drawImage(
                tempCanvas,
                0, y, width, rowHeight,
                offsetX, y, width, rowHeight
            );

            ctx.restore();
        } else {
            // Draw the row normally
            ctx.drawImage(
                tempCanvas,
                0, y, width, rowHeight,
                0, y, width, rowHeight
            );
        }
    }
};
