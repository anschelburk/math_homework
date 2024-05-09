// Global scope for canvas variable
var canvas;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Fabric.js canvas
    canvas = new fabric.Canvas('c', {
        isDrawingMode: true
    });

    fabric.Object.prototype.transparentCorners = false;

    // Define eraser brush
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 10; // Optional: Set the eraser width
    canvas.freeDrawingBrush.inverted = true; // Enable undo erasing

    // Set initial eraser brush settings
    let isEraserMode = false;
    var eraserBtn = document.getElementById('eraser-toggle');

    // Toggle between standard brush and eraser brush
    eraserBtn.onclick = function() {
        isEraserMode = !isEraserMode;
        if (isEraserMode) {
            // Switch to eraser brush
            canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
            eraserBtn.innerHTML = 'Pencil'
        }
        else {
            // Switch back to standard brush (e.g., PencilBrush)
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            eraserBtn.innerHTML = "Eraser"
        }
    };


    var drawingModeEl = document.getElementById('drawing-mode'),
        drawingOptionsEl = document.getElementById('drawing-mode-options'),
        // drawingColorEl = document.getElementById('drawing-color'),
        // drawingShadowColorEl = document.getElementById('drawing-shadow-color'),
        // drawingLineWidthEl = document.getElementById('drawing-line-width'),
        // drawingShadowWidth = document.getElementById('drawing-shadow-width'),
        // drawingShadowOffset = document.getElementById('drawing-shadow-offset'),
        clearEl = document.getElementById('clear-canvas');

    clearEl.onclick = function() {
      canvas.clear()
    };

    canvas.on('object:added', () => {
    });
    canvas.on('object:modified', () => {
    });

    canvas.on('object:removed', () => {
    });

    drawingModeEl.onclick = function() {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        if (canvas.isDrawingMode) {
            drawingModeEl.innerHTML = 'Stop Drawing';
            drawingOptionsEl.style.display = '';
        }
        else {
            drawingModeEl.innerHTML = 'Draw More';
            drawingOptionsEl.style.display = 'none';
        }
    };

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

});


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
    if (selectedValue === 'freedraw') {
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
    canvas.undo();
}

function redo() {
    canvas.redo();
}


document.addEventListener('keyup', (event) => {
    const { keyCode, ctrlKey } = event;
    if (!ctrlKey) return;

    if (keyCode === 90) { // Ctrl+Z for Undo
        undo();
    }

    if (keyCode === 89) { // Ctrl+Y for Redo
        redo();
    }
});

