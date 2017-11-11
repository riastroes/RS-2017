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
var center;


var steps;
var rot;
var controls;
var a, b, c, d, e, f;
var abde, bcef, cafd;

var miny = 70;
var maxy = 1050;
var minx = 50;
var maxx = 1050;

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

    print3D = new Print3D("Ultimaker2+", "PLA", "normal", maxlayers);

    center = createVector(550, 550);
    layer = 0;
    issaved = false;


    print3D.start();

}

function mousePressed() {
    if (!issaved) {
        print3D.gcode.save("Spiralen");
        issaved = true;
    }

}

function draw() {


    if (layer == 0) {

        createtriangle(createVector(200, 300), 120);
        print3D.addPointToLayer(layer, createVector(350, 300, -1));
        createtriangle(createVector(500, 400), 120);
        // print3D.addPointToLayer(layer, createVector(700, 400, -1));
        // print3D.addPointToLayer(layer, createVector(800, 300, -1));

        createtriangle(createVector(800, 300), 120);
        //print3D.addPointToLayer(layer, createVector(550, 150, -1));
        print3D.print(layer);


    } else {


        createtriangle(createVector(200, 300), 120);
        print3D.addPointToLayer(layer, createVector(350, 300));
        createtriangle(createVector(500, 400), 120);
        // print3D.addPointToLayer(layer, createVector(500, 600));
        // print3D.addPointToLayer(layer, createVector(800, 600));
        createtriangle(createVector(800, 300), 120);
        print3D.print(layer);


    }
    if (layer == maxlayers - 1) {
        print3D.stop();
        noLoop();
    }
    layer++;

}

function createtriangle(center, size) {
    var a, b, c, d, e, f;
    var path = [];
    var s = size / 2;

    a = center.copy();
    a.z = 0;

    a.add(0, -(s + 10));

    d = center.copy();
    d.add(0, 0);
    d.z = 0;


    b = center.copy();
    b.add(-(s + 30), s);
    b.z = 0;

    e = center.copy()
    e.add(0, 0);
    e.z = 0;

    c = center.copy()
    c.add(s + 30, s);
    c.z = 0;

    f = center.copy();
    f.add(0, 0);
    f.z = 0



    var i = layer;
    var p = a.copy().add(0, -40)

    append(path, p);
    append(path, d);
    append(path, a);

    append(path, a.copy().add(0, -10));
    append(path, a.copy().add(-60, 50));
    append(path, a.copy().add(0, -40));
    append(path, a.copy().add(60, +50));
    append(path, a.copy().add(0, -10));

    append(path, e);

    append(path, b);
    append(path, b.copy().add(70, 25));
    append(path, b.copy().add(-30, 25));
    append(path, b.copy().add(25, -60));
    append(path, b.copy());

    append(path, f);

    append(path, c.copy());

    append(path, c.copy().add(-70, 25));
    append(path, c.copy().add(30, 25));
    append(path, c.copy().add(-20, -60));

    append(path, c.copy());

    append(path, d);
    append(path, a.add(0, -40));
    showlast(path);
    //append(path, c.copy().add(30, 20));
    var h = c.copy().add(50, 30);
    // append(path, h);

    print3D.addToLayer(layer, path);

}

function showlast(path) {
    var p = path[path.length - 1];
    stroke(0);
    ellipse(p.x, p.y, 10, 10);
}