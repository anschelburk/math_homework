document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let isErasing = false; // Add this variable to track eraser usage
    let lastX = 0;
    let lastY = 0;

    // Add an event listener for the eraser button
    const eraserButton = document.getElementById("eraserButton");
    eraserButton.addEventListener("click", () => {
        isErasing = true;
    });

    canvas.addEventListener("mousedown", (e) => {
        if (!isErasing) {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }
    });

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
        isErasing = false; // Reset the eraser flag
    });
    canvas.addEventListener("mouseout", () => {
        isDrawing = false;
        isErasing = false; // Reset the eraser flag
    });

    function draw(e) {
        if (!isDrawing && !isErasing) return;

        if (isErasing) {
            // Use white color for erasing
            ctx.globalCompositeOperation = "destination-out"; // Set the eraser mode
            ctx.lineWidth = 10; // Adjust the eraser width as needed
        } else {
            ctx.globalCompositeOperation = "source-over"; // Default drawing mode
            ctx.strokeStyle = "#000"; // Default color for drawing
            ctx.lineWidth = 2;
        }

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});

console.log("Eraser feature added to the JavaScript code.");
