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

    print3D = new Print3D("Ultimaker2+", "PLAFLEX", "normal", maxlayers, 1);




    start = createVector(150, 200);


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

        driespiralen();
        print3D.print(layer);




    } else {
        driespiralen();
        print3D.print(layer);
        print3D.stop();
        noLoop();

    }
    layer++;

}

function driespiralen() {

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

    ellipse(a1.x, a1.y, 10, 10);
    spiraal2(a1);

    print3D.addPointToLayer(layer, a);

    print3D.addPointToLayer(layer, b);
    spiraal2(b1);
    print3D.addPointToLayer(layer, b);

    print3D.addPointToLayer(layer, c);
    spiraal2(c1);
    print3D.addPointToLayer(layer, c);


}

function spiraal(center) {

    var path = [];
    var steps = 20;
    var g = 0;
    var size = 200;
    var corner = 0;
    var hoek = TWO_PI / ((steps * 2) + 1);
    var radius1 = size / 3;
    var radius2 = size;

    var begin = center.copy();


    for (var i = 0; i <= (16 * 8) + 1; i++) {
        var p = center.copy();

        radius2 = size - (i * 1);
        radius1 = radius2 / 3;

        if (i % 4 == 0) {
            p.x += radius2 * cos((hoek * (i - 1)));
            p.y += radius2 * sin((hoek * (i - 1)));
        } else if (i % 4 == 1) {
            p.x += radius2 * cos((hoek * (i)));
            p.y += radius2 * sin((hoek * (i)));
        } else if (i % 4 == 2) {
            p.x += radius1 * cos((hoek * (i - 1)));
            p.y += radius1 * sin((hoek * (i - 1)));
        } else if (i % 4 == 3) {
            p.x += radius1 * cos((hoek * (i)));
            p.y += radius1 * sin((hoek * (i)));
        }


        append(path, p);



    }


    var max = path.length - 1;

    for (var i = 0; i < max; i++) {
        append(path, path[max - i]);
    }

    print3D.addToLayer(layer, path);
}

function spiraal2(center) {

    var path = [];
    var steps = 30;
    var g = 0;
    var size = 200;
    var corner = 0;
    var hoek = TWO_PI / ((steps * 2) + 1);
    var radius1 = size / 5;
    var radius2 = size;

    var begin = center.copy();


    for (var i = 0; i <= (16 * 32) + 1; i++) {
        var p = center.copy();

        radius2 -= 0.2

        if (i % 4 == 0) {
            p.x += radius2 * cos((hoek * (i - 1)));
            p.y += radius2 * sin((hoek * (i - 1)));
        } else if (i % 4 == 1) {
            p.x += radius2 * cos((hoek * (i)));
            p.y += radius2 * sin((hoek * (i)));
        } else if (i % 4 == 2) {
            p.x += radius1 * cos((hoek * (i - 1)));
            p.y += radius1 * sin((hoek * (i - 1)));
        } else if (i % 4 == 3) {
            p.x += radius1 * cos((hoek * (i)));
            p.y += radius1 * sin((hoek * (i)));
        }
        p.z = 0.3;

        append(path, p);



    }


    var max = path.length - 1;

    for (var i = 0; i < max; i++) {
        append(path, path[max - i]);
    }

    print3D.addToLayer(layer, path);
}