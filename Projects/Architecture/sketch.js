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
var pg;
var x, y, z;

function preload() {
    img = loadImage("lines001.png");
}

function setup() {
    createCanvas(1500, 500, WEBGL);
    pg = createGraphics(1500, 150);
    pg.background(0, 0, 0)
    grid = new Grid(10, 3);
    shape = new Shape(4);
    darkblue = color(0, 0, 20, 80);


    a = 0;
    z = y = x = 0;
    maxspeed = speed = 1;
    frameRate(speed);

}

function draw() {
    background(0);

    if (frameCount == 3) {

        pg.fill(0, 0, 50);
        pg.noStroke();
        pg.rect(0, 30, 400, 90);
        //quad(800,0, 1100, 0, 850,150, 550,150);
    }
    if (frameCount == 2) {
        pg.fill(darkblue);
        pg.noStroke();
        pg.rect(250, 30, 400, 90);
        pg.quad(1300, 0, 1500, 0, 1250, 150, 1050, 150);
    }
    if (frameCount == 3) {
        pg.fill(0, 0, 50);
        pg.noStroke();
        //rect(250,30,400,90);
        pg.quad(1200, 0, 1400, 0, 1150, 150, 950, 150);
    }
    if (frameCount <= 4) {
        //noLoop();

        var s = random(300);
        var r = 0;

        for (var i = 0; i < grid.p.length; i++) {
            shape.start(grid.p[i]);
            shape.size(s, r);
            r = 1;
            shape.style(255, -1, 2);
            shape.draw(pg);
        }
    }
    //rotateZ(z);
    rotateY(y);
    //rotateX(x);
    specularMaterial(255);
    texture(pg);
    plane(1500, 50);
    z += 0.01;
    y += 0.1;
    x += 0.1;

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