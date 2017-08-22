/* Ria Stroes */
/* @updated: augustus 2017  */


var grid;
var colors;
var angle;
var c;

function setup() {

    var canvas = createCanvas(windowWidth, windowHeight);

    grid = new Grid();
    grid.init(10, 10);

    colors = [];
    for (var i = 0; i < 10; i++) {
        colors[i] = color(random(255), random(255), random(255), 80);
    }

    angle = 0;
    c = 0;
    rectMode(CENTER);
    noStroke();



}

function draw() {
    if (frameCount % 100 == 0) {
        blendMode(ADD);
        background(255, 10);
    } else {
        blendMode(BLEND);
    }

    for (var i = 0; i < grid.p.length; i++) {
        if (i % 7 == 0) {
            fill(colors[0]);

            push();
            translate(grid.p[i].x + 50, grid.p[i].y + c)
            rotate(angle);
            rect(0, 0, 40, 40, 4 + (c / 10));
            pop();
            angle += 0.00008;
        } else if (i % 3 == 1) {
            fill(colors[1]);

            push();
            translate(grid.p[i].x + c, grid.p[i].y)
            rotate(angle);
            rect(-70, 0, 80, 80, 4 + (c / 10));
            pop();
            angle += 0.00008;
        } else if (i % 3 == 2) {
            fill(colors[2]);
            push();
            translate(grid.p[i].x, grid.p[i].y)
            rotate(angle);
            rect(0, 30, 80, 130, 4 + (c / 10));
            pop();
            angle += 0.00003;

        } else if (i % 3 == 3) {
            fill(colors[3]);
            push();
            translate(grid.p[i].x + 50, grid.p[i].y)
            rotate(angle);
            rect(0, 0, 120, 60, 4 + (c / 10));
            pop();
            angle += 0.00001;
        }
        if (angle < 0) angle = -angle;
        c += sin(angle) / 100;

    }

}

function mousePressed() {
    noLoop();
}