// JavaScript
var canvas = document.getElementById('demo');
var ctx = canvas.getContext('2d');

// Define a Line class
function Line(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    };
}

// Example usage
var myLine = new Line(10, 10, 100, 100);
myLine.draw();
