/* Ria Stroes */
/* @updated: november 2017  
/* Het begin van kant.*/


var print3D;

var start; //set first point to start
var end; //set last point before you go to start
var maxlayers;
var layer;

var grid;
var pool;
var colors;
var a, b, c, d;
var maxw, maxh;
var marge;
var offset;

var windowscale;


var l;

var model;
var ladder;
var steps;
var rot;
var controls;
var a, b, c, d, e, f, g, h, i, j;
var end, begin;
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
    maxlayers = 1;
    start = createVector(550, 550);
    print3D = new Print3D("Anet", "ABS", "normal", maxlayers);





    // /*ladder*/
    // controls = [];
    // a = createVector(250, 300);
    // b = createVector(850, 300);

    // controls[0] = createVector(50, -0);
    // controls[1] = createVector(1050, -0);

    // c = createVector(50, 500); //150
    // d = createVector(1050, 500); //950

    // controls[2] = createVector(1050, -1500);
    // controls[3] = createVector(50, -1500);

    /*ladder*/
    controls = [];
    a = createVector(550, 350);
    b = createVector(375, 625);
    c = createVector(725, 725);





    end = createVector(1000, 200);

    layer = 0;
    steps = 21;
    rot = 0;
    issaved = false;




}

function mousePressed() {
    if (!issaved) {
        print3D.gcode.save("LineControl");
        issaved = true;
    }

}

function draw() {


    if (layer < maxlayers) {


        d = a.copy();
        d.add(-10, 0);
        e = b.copy();
        e.add(-10, 0);

        controls[0] = createVector(550, 300);
        controls[1] = createVector(100, 625);
        controls[2] = createVector(550, 300);
        controls[3] = createVector(100, 625);



        ladder = new Ladder(a, b, d, e, controls);
        append(ladder.path, createVector(550, 550)); //start
        ladder.create(steps);
        append(ladder.path, createVector(550, 550)); //end

        f = b.copy();
        f.add(0, 10);
        g = c.copy();
        g.add(0, 10);

        controls[0] = createVector(100, 625);
        controls[1] = createVector(1050, 625);
        controls[2] = createVector(100, 625);
        controls[3] = createVector(1050, 625);
        print3D.addToLayer(layer, ladder.path);

        ladder = new Ladder(b, c, f, g, controls);
        append(ladder.path, createVector(550, 550)); //start
        ladder.create(steps);
        append(ladder.path, createVector(550, 550)); //end
        print3D.addToLayer(layer, ladder.path);


        controls[0] = createVector(100, 625);
        controls[1] = createVector(1050, 625);
        controls[2] = createVector(100, 625);
        controls[3] = createVector(1050, 625);

        i = a.copy();
        i.add(10, 0);
        j = b.copy();
        j.add(0, 10);

        controls[0] = createVector(1050, 625);
        controls[1] = createVector(0, 625);
        controls[2] = createVector(1050, 625);
        controls[3] = createVector(0, 625);


        ladder = new Ladder(g, i, h, j, controls);
        append(ladder.path, createVector(550, 550)); //start
        ladder.create(steps);
        append(ladder.path, createVector(550, 550)); //end
        print3D.addToLayer(layer, ladder.path);

        //ladder.rotate(-rot);
        //ladder.shift(100, 500);
        //if (print3D.checkPrint(ladder.path, 50, 70, 1050, 1050)) {





    } else {
        print3D.print(start);
        noLoop();
    }
    layer++;





}