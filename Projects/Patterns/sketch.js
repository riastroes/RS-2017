/* Ria Stroes */
/* @updated: augustus 2017  */


var grid;
var colors;
var a, b, c, d;
var maxw, maxh;
var pattern;

function setup() {

    var canvas = createCanvas(windowWidth, windowHeight);

    grid = new Grid();
    maxw = 10;
    maxh = 10;
    grid.init(maxw, maxh);

    colors = [];
    for (var i = 0; i < 10; i++) {
        colors[i] = color(random(255), random(255), random(255), 80);
    }
    pattern = new Pattern(((width + 100) / maxw) - 100, (height + 100) / maxh);



}

function draw() {
    for (var i = 0; i < grid.p.length; i++) {
        //point(grid.p[i].x, grid.p[i].y);
        pattern.draw(grid.p[i]);
        if (i % maxw != (maxw - 1)) { // eind van een regel.
            line(pattern.end.x + grid.p[i].x, pattern.end.y + grid.p[i].y, pattern.start.x + grid.p[i + 1].x, pattern.start.y + grid.p[i + 1].y)
        }
        stroke(0);
        point(grid.p[i].x, grid.p[i].y)
    }
    noLoop();
}

function mousePressed() {
    noLoop();
}