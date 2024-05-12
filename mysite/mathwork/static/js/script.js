var canvas;
let isCartesianBackground = false;
let isEraserMode = false;

document.addEventListener('DOMContentLoaded', function() {
    canvas = new fabric.Canvas('c', {
        isDrawingMode: true
    });

    fabric.Object.prototype.transparentCorners = false;

    let eraserBtn = document.getElementById('eraser-toggle');

    eraserBtn.onclick = function() {
        isEraserMode = !isEraserMode;
        if (isEraserMode) {
            // Switch to eraser
            canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
            canvas.freeDrawingBrush.width = 10; // otherwise way to narrow
            // canvas.freeDrawingBrush.inverted = true; // Enable undo erasing
            eraserBtn.innerHTML = 'Pencil'
        }
        else {
            // Switch back to standard brush
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            eraserBtn.innerHTML = "Eraser"
        }
    };


    var drawingModeEl = document.getElementById('drawing-mode');
    var drawingOptionsEl = document.getElementById('drawing-mode-options');
    var clearEl = document.getElementById('clear-canvas');

    clearEl.onclick = function() {
            canvas.clear()
            if (isCartesianBackground) {
                updateCanvasBackground('cartesian')
            }
            else if (isCartesianBackground === false) {
                updateCanvasBackground('blank')
            };
        };

    drawingModeEl.onclick = function() {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        if (canvas.isDrawingMode) {
            drawingModeEl.innerHTML = 'Stop Drawing';
        } else {
            drawingModeEl.innerHTML = 'Draw More';
        }
    };

    var backgroundSelector = document.getElementById('backgroundSelector');
    backgroundSelector.addEventListener('change', function() {
        var selectedValue = backgroundSelector.value;
        updateCanvasBackground(selectedValue);
    });

    var userInputSelector = document.getElementById('userInputSelector');
    userInputSelector.addEventListener('change', function() {
        var selectedValue = userInputSelector.value;
        updateUserInputMode(selectedValue);
    });

});


// Update the background
function updateCanvasBackground(selectedValue) {
    if (selectedValue === 'blank') {
        isCartesianBackground = false;
        canvas.setBackgroundColor('#ffffff', function() {
            canvas.renderAll();
        });
        canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
    } else if (selectedValue === 'cartesian') {

        isCartesianBackground = true;
        var cartesianImg = new Image()
        cartesianImg.src = '/static/img/cartesian_plane.png'

        cartesianImg.onload = function() {
            var fabricCartesianBackground = new fabric.Image(cartesianImg, {
                left: 0,
                top: 0,
                scaleX: canvas.width / cartesianImg.width,
                scaleY: canvas.height / cartesianImg.height,
                originX: 'left',
                originY: 'top',
                erasable: false
            });
            canvas.setBackgroundImage(fabricCartesianBackground, canvas.renderAll.bind(canvas));
        };
    }
}

function updateUserInputMode(selectedValue) {
    if (selectedValue === 'freedraw') {
        if (isEraserMode === false) {
            canvas.freeDrawingBrush.width = 1
        }
        // Deactivate line drawing mode
        canvas.off('mouse:down');
        canvas.off('mouse:up');
    }
    else if (selectedValue === 'typing') {
      // Set up click to add text
      if (isEraserMode === false) {
        canvas.freeDrawingBrush.width = 0
      };
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
                  this.text = '';
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

