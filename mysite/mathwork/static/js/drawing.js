document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let isErasing = false;
    let isDrawingLine = false;
    let isDrawingPoint = false; // New flag for point drawing
    let lastX = 0;
    let lastY = 0;
    let lineStartX = 0;
    let lineStartY = 0;
    let lineEndX = 0;
    let lineEndY = 0;
    const existingDrawings = [];

    // Add an event listener for the eraser button
    const eraserButton = document.getElementById("eraserButton");
    eraserButton.addEventListener("click", () => {
        isErasing = true;
        isDrawingLine = false;
        isDrawingPoint = false; // Disable point drawing
    });

    // Add an event listener for the line toggle switch
    const lineToggle = document.getElementById("lineToggle");
    lineToggle.addEventListener("change", () => {
        isDrawingLine = lineToggle.checked;
        isErasing = false;
        isDrawingPoint = false; // Disable point drawing
    });

    // Add an event listener for the point toggle switch
    const pointToggle = document.getElementById("pointToggle");
    pointToggle.addEventListener("change", () => {
        isDrawingPoint = pointToggle.checked; // Update the flag based on the switch state
        isErasing = false;
        isDrawingLine = false;
    });

    canvas.addEventListener("mousedown", (e) => {
        if (!isErasing && !isDrawingLine && !isDrawingPoint) {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        } else if (isDrawingLine) {
            [lineStartX, lineStartY] = [e.offsetX, e.offsetY];
        }
    });

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
        isErasing = false;
        isDrawingLine = false;
        isDrawingPoint = false;
    });
    canvas.addEventListener("mouseout", () => {
        isDrawing = false;
        isErasing = false;
        isDrawingLine = false;
        isDrawingPoint = false;
    });

    function draw(e) {
        if (!isDrawing && !isErasing && !isDrawingLine && !isDrawingPoint) return;

        if (isErasing) {
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = 10;
        } else if (isDrawingLine) {
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 2;
            lineEndX = e.offsetX;
            lineEndY = e.offsetY;
            drawExistingPoints();
            ctx.beginPath();
            ctx.moveTo(lineStartX, lineStartY);
            ctx.lineTo(lineEndX, lineEndY);
            ctx.stroke();
        } else if (isDrawingPoint) {
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "#000000"; // Set point color
            ctx.beginPath();
            ctx.arc(e.offsetX, e.offsetY, 2, 0, 2 * Math.PI); // Draw a small circle (point)
            ctx.fill();
            existingDrawings.push([e.offsetX, e.offsetY]);
        } else {
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
            existingDrawings.push([lastX, lastY]);
        }
    }

    function drawExistingPoints() {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#000000"; // Set point color
        for (const [x, y] of existingDrawings) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, 2 * Math.PI); // Draw existing points
            ctx.fill();
        }
    }
});
