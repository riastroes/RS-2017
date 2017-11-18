/* Ria Stroes */
/* @updated: november 2017  
/* Het begin van kant.*/


var print3D;

var start; //set first point to start
var end; //set last point before you go to start
var maxlayers;
var layer;


var palette;
var colors;

var maxw, maxh;
var marge;
var offset;



var steps;
var rot;
var controls;
var a, b, c, d, e, f;
var abde, bcef, cafd;

var miny = 70;
var maxy = 1050;
var minx = 50;
var maxx = 1050;

var roosA, roosB, roosC;

var issaved;


function setup() {

    var canvas = createCanvas(1100, 1100);
    windowscale = 1;

    background(200);
    layer = 0;
    maxlayers = 3;
    palette = new Color();


    //palette.addHuePalette(60, 50, 50);
    palette.add(color(60, 50, 50));
    palette.add(color(90, 50, 50));
    palette.add(color(120, 50, 50));
    palette.add(color(160, 50, 50));
    palette.add(color(190, 50, 50));

    colors = palette.colors;

    print3D = new Print3D("Ultimaker2+", "PLA", "normal", maxlayers, 1, 4);

    start = createVector(150, 200);


    layer = 0;


    issaved = false;


    print3D.start();

}

function mousePressed() {
    if (!issaved) {
        print3D.gcode.save("Rozen");
        issaved = true;
    }

}

function draw() {


    if (layer == 0) {



        drierozenCreate();
        print3D.print(layer);




    } else if (layer < 3) {
        drierozen();
        print3D.print(layer);
    } else {

        print3D.stop();
        noLoop();

    }
    layer++;

}

function drierozenCreate() {

    var a, b, c;
    var a1, b1, c1;
    var next;

    roosA = new Roos();
    roosB = new Roos();
    roosC = new Roos();

    a = createVector(400, 150, -1);
    a1 = createVector(200, 350, -1);
    b = createVector(550, 150, -1);
    b1 = createVector(450, 700, -1);
    c = createVector(1000, 150, -1);
    c1 = createVector(800, 350, -1);
    fill(0)
    ellipse(a.x, a.y, 10, 10);

    print3D.addPointToLayer(layer, a);
    print3D.addPointToLayer(layer, a.add(0, 200));
    ellipse(a1.x, a1.y, 10, 10);
    print3D.addToLayer(layer, roosA.create(a1));

    print3D.addPointToLayer(layer, a);

    print3D.addPointToLayer(layer, b);
    print3D.addPointToLayer(layer, b.add(450, 550));
    print3D.addToLayer(layer, roosB.create(b1));

    print3D.addPointToLayer(layer, b);

    print3D.addPointToLayer(layer, c);
    print3D.addPointToLayer(layer, c.add(0, 200));
    print3D.addToLayer(layer, roosC.create(c1));

    print3D.addPointToLayer(layer, c);


}

function drierozen() {
    var a, b, c;
    var a1, b1, c1;
    var next;



    a = createVector(400, 150, -1);
    a1 = createVector(200, 350, -1);
    b = createVector(550, 150, -1);
    b1 = createVector(450, 700, -1);
    c = createVector(1000, 150, -1);
    c1 = createVector(800, 350, -1);
    fill(0)
    ellipse(a.x, a.y, 10, 10);

    print3D.addPointToLayer(layer, a);
    print3D.addPointToLayer(layer, a.add(0, 200));
    ellipse(a1.x, a1.y, 10, 10);
    print3D.addToLayer(layer, roosA.path);

    print3D.addPointToLayer(layer, a);

    print3D.addPointToLayer(layer, b);
    print3D.addPointToLayer(layer, b.add(450, 550));
    print3D.addToLayer(layer, roosB.path);

    print3D.addPointToLayer(layer, b);

    print3D.addPointToLayer(layer, c);
    print3D.addPointToLayer(layer, c.add(0, 200));
    print3D.addToLayer(layer, roosC.path);

    print3D.addPointToLayer(layer, c);


}