/* Ria Stroes */
/* @updated: november 2017  */
/* Project 'SOLO', The Opera Dress
/* Co-creation with Jolanta Izabela Pawlak
*/


var grid;
var palette;
var colors;
var marge;

var print3D;
var layer;
var maxlayers;

var issaved;

var name;



function setup() {

    var canvas = createCanvas(1100, 1100);
    windowscale = 1;


    palette = new Color();
    colors = palette.create();


    layer = 0;
    maxlayers = 1;
    var maxskirt = 3;
    print3D = new Print3D("Anet", "PLA", "normal", maxlayers, maxskirt);
    name = "FollowLine";



    marge = 50;

    print3D.start();

    issaved = false;




}

function mousePressed() {
    if (!issaved) {
        print3D.gcode.save(name);
        issaved = true;
    }
}

function draw() {


    if (layer == 0) {
        var show = true;

        var from = createVector(100, 100);
        var to = createVector(1000, 100);
        if (show) {
            fill(colors[2]);
            ellipse(from.x, from.y, 10, 10);
            fill(colors[3]);
            ellipse(to.x, to.y, 10, 10);
        }


        print3D.addToLayer(layer, createCurve(from, to, show));
        print3D.print(layer);



    } else if (layer < maxlayers) {



    } else {
        print3D.stop();
        noLoop();
    }
    layer++;

}





function createCurve(from, to, show) {
    path = [];
    p = [];
    var n = 0;


    var steps = 6;
    for (var i = 0; i <= steps; i++) {
        t = i / steps;
        p[n] = createVector(0, 0);
        p[n].x = curvePoint(550, from.x, to.x, 550, t);
        p[n].y = curvePoint(-7000, from.y, to.y, -7000, t);
        if (show) {
            ellipse(p[n].x, p[n].y, 10, 10);
        }
        append(path, p[n]);

    }
    return path;
}