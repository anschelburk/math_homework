// Global scope for canvas variable
var canvas;
var undoStack = [];
var redoStack = [];

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

    canvas.on('object:added', () => {
        undoStack.push(canvas.toJSON());
        console.log(undoStack);
        redoStack = []
    });
    canvas.on('object:modified', () => {
        undoStack.push(canvas.toJSON());
        console.log(undoStack);
        redoStack = []
    });

    // canvas.on('object:removed', () => {
    //     redoStack.push(canvas.toJSON());
    // });

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

    var backgroundSelector = document.getElementById('backgroundSelector');
    backgroundSelector.addEventListener('change', function() {
        var selectedValue = backgroundSelector.value;
        updateCanvasBackground(selectedValue); // Call a function to update the canvas background
    });

    var userInputSelector = document.getElementById('userInputSelector');
    userInputSelector.addEventListener('change', function() {
        var selectedValue = userInputSelector.value;
        updateUserInputMode(selectedValue); // Call a function to update the line drawing mode
    });


    var undoBtn = document.getElementById('undo');
    var redoBtn = document.getElementById('redo');

    undoBtn.addEventListener('click', function() {
        undo();
    });

    redoBtn.addEventListener('click', function() {
        redo();
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

// Update the background
function updateCanvasBackground(selectedValue) {
    if (selectedValue === 'blank') {
        canvas.setBackgroundColor('#ffffff', function() {
            canvas.renderAll();
        });
    } else if (selectedValue === 'cartesian') {
        canvas.setBackgroundImage('/static/img/cartesian_plane.png', function() {
            canvas.renderAll();
        });
    }
    // Can copy/paste the above block to add more conditions for other images or custom backgrounds
}

function updateUserInputMode(selectedValue) {
    if (selectedValue === 'line') {
        // Activate line drawing mode
        canvas.on('mouse:down', (options) => {
            isDrawing = true;
            startPoint = canvas.getPointer(options.e);
        });
        canvas.on('mouse:up', (options) => {
            if (isDrawing) {
                const endPoint = canvas.getPointer(options.e);
                canvas.add(new fabric.Line([startPoint.x, startPoint.y, endPoint.x, endPoint.y], {
                    stroke: 'black',
                    strokeWidth: 2,
                }));
                isDrawing = false;
            }
        });
    } else if (selectedValue === 'freedraw') {
        // Deactivate line drawing mode
        canvas.off('mouse:down');
        canvas.off('mouse:up');
    }
    else if (selectedValue === 'typing') {
      // Set up click to add text
      canvas.on('mouse:up', (options) => {
          const pointer = canvas.getPointer(options.e);
          const text = new fabric.IText('', {
              fontFamily: 'Arial',
              left: pointer.x,
              top: pointer.y,
              fontSize: 20,
              fill: 'black'
          });

          // Add a flag to check if the default text has been edited
          text.defaultText = true;

          // Add the text to the canvas
          canvas.add(text);

          // Automatically enter editing mode
          text.on('selected', function() {
              if (this.defaultText) {
                  this.selectAll();
              }
          });

          text.on('editing:entered', function() {
              if (this.defaultText) {
                  this.defaultText = false;
                  this.text = ''; // Clear the default text on first edit
              }
          });

          text.enterEditing(); // This will put the text in editing mode directly
      });
    }
  }

  function undo() {
    if (undoStack.length > 1) {
        const prevState = undoStack.pop(); // Remove the current state
        redoStack.push(canvas.toJSON()); // Log the current state to redoStack
        canvas.loadFromJSON(undoStack[undoStack.length - 1]);
        canvas.renderAll();
    }
}

function redo() {
    // if (redoStack.length > 0) {
        const nextState = redoStack.pop();
        undoStack.push(canvas.toJSON()); // Log the current state to undoStack
        canvas.loadFromJSON(redoStack[redoStack.length]);
        canvas.renderAll();
    }
// }