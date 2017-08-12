/*
EXAMPLES    http://zenozeng.github.io/p5.js-svg/test/
*/

var grid;
var exportSVG = false;

function setup() {
    createCanvas(1200, 1200);
    stroke(0);
    strokeWeight(3);
}

function draw() {

    if (exportSVG) beginRecord();

    background(100);
    fill(255, 0, 0);
    ellipse(100, 100, 50, 50);
    fill(0, 255, 0);
    rect(200, 200, 200, 200);

    if (exportSVG) {
        exportSVG = false;
        endRecord();
    }
}

function keyPressed() {
    if (key == "S") {
        exportSVG = true;
    }
}