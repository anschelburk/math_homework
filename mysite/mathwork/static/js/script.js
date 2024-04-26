// Global scope for canvas variable
var canvas;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Fabric.js canvas
    canvas = new fabric.Canvas('c', {
        isDrawingMode: true
    });

    fabric.Object.prototype.transparentCorners = false;

    var drawingModeEl = document.getElementById('drawing-mode'),
        drawingOptionsEl = document.getElementById('drawing-mode-options'),
        drawingColorEl = document.getElementById('drawing-color'),
        drawingShadowColorEl = document.getElementById('drawing-shadow-color'),
        drawingLineWidthEl = document.getElementById('drawing-line-width'),
        drawingShadowWidth = document.getElementById('drawing-shadow-width'),
        drawingShadowOffset = document.getElementById('drawing-shadow-offset'),
        clearEl = document.getElementById('clear-canvas');

    clearEl.onclick = function() { canvas.clear() };

    drawingModeEl.onclick = function() {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        if (canvas.isDrawingMode) {
            drawingModeEl.innerHTML = 'Cancel drawing mode';
            drawingOptionsEl.style.display = '';
        }
        else {
            drawingModeEl.innerHTML = 'Enter drawing mode';
            drawingOptionsEl.style.display = 'none';
        }
    };

    // Additional setup for brushes...

    // Load existing drawing
    fetch('/load-drawing/1/')  // Assume 1 is the drawing ID
    .then(response => response.json())
    .then(data => {
        if (data.canvas_data) {
            canvas.loadFromJSON(data.canvas_data, function() {
                canvas.renderAll();
                console.log("Canvas has been loaded.");
            });
        } else {
            console.error('No drawing data found:', data);
        }
    })
    .catch(error => console.error('Error loading the drawing:', error));

    // Save drawing
    document.getElementById('save-canvas').addEventListener('click', function() {
        var name = document.getElementById('drawing-name').value;
        if (!name) {
          alert('Please enter a name for the drawing.');
          return;
        }
        var json = JSON.stringify({ name: name, canvas_data: canvas.toJSON() });
        saveDrawing(json);
    });

    fetch('/list-drawings/')
    .then(response => response.json())
    .then(data => {
        var select = document.getElementById('load-drawing-select');
        data.drawings.forEach(drawing => {
            var option = new Option(drawing.name, drawing.id);
            select.add(option);
        });
    });

    document.getElementById('load-drawing').addEventListener('click', function() {
        var select = document.getElementById('load-drawing-select');
        var drawingId = select.value;
        if (drawingId) {
            fetch(`/load-drawing/${drawingId}/`)
            .then(response => response.json())
            .then(data => {
                canvas.loadFromJSON(data.canvas_data, canvas.renderAll.bind(canvas));
            })
            .catch(error => console.error('Error loading the drawing:', error));
        } else {
            alert('Please select a drawing to load.');
        }
    });
});

function saveDrawing(jsonData) {
    fetch('/save-drawing/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

