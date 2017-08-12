/*
Datum: 2 augustus 2017 
Creator: Ria Stroes
Title: LineDrawing01
Subject: Line drawing on a grid
*/

var grid;
var shape;
var a;
var speed, maxspeed;
var darkblue;

function setup() {
    createCanvas(1500, 150);

    grid = new Grid(10, 3);
    shape = new Shape(4);
    darkblue = color(0, 0, 20, 80);


    a = 0;
    maxspeed = speed = 1;
    frameRate(speed);

}

function draw() {
    //background(0,0,30,2);
    if (frameCount == 3) {

        fill(0, 0, 50);
        noStroke();
        rect(0, 30, 400, 90);
        //quad(800,0, 1100, 0, 850,150, 550,150);
    }
    if (frameCount == 2) {
        fill(darkblue);
        noStroke();
        rect(250, 30, 400, 90);
        quad(1300, 0, 1500, 0, 1250, 150, 1050, 150);
    }
    if (frameCount == 3) {
        fill(0, 0, 50);
        noStroke();
        //rect(250,30,400,90);
        quad(1200, 0, 1400, 0, 1150, 150, 950, 150);
    }
    if (frameCount == 4) {
        noLoop();
    }
    var s = random(300);
    var r = 0;

    for (var i = 0; i < grid.p.length; i++) {
        shape.start(grid.p[i]);
        shape.size(s, r);
        r = 1;
        shape.style(255, -1, 2);
        shape.draw();
    }
}
/*
Datum: 2 augustus 2017 
Creator: Ria Stroes
Title: LineDrawing01
Subject: Line drawing on a grid
*/


function mousePressed() {
    if (speed < 10) {
        speed = maxspeed;
        frameRate(speed);
    } else {
        speed = 1;
        frameRate(1);
    }
}

function keyPressed() {
    if (key == ' ') {
        saveFrame("lines2" + random(100) + ".png");
    }
}