/* Ria Stroes */
/* @updated: november 2017  */
/* Project 'SOLO', The Opera Dress
/* Co-creation with Jolanta Izabela Pawlak
*/


var print3D;
var layer;
var maxlayers;
var show;

var issaved;
var model;
var name;
var pos;
var palette;
var colors;



function preload() {
    model = [];



}

function setup() {

    var canvas = createCanvas(1100, 1100);
    windowscale = 1;

    palette = new Color();
    colors = palette.create();

    layer = 0;
    maxlayers = 5;
    var startlayerheight = 0; // 1
    var maxskirt = 0; //0 whithout skirt
    print3D = new Print3D("Anet", "PLAFLEX", "dik", maxlayers, startlayerheight, maxskirt);

    pos = [];
    for (var i = 0; i < 6; i++) {
        pos[i] = createVector(200, 50).add(i * 150, 0);
    }

    print3D.start();

    issaved = false;
    name = "Kerstketting";




}

function mousePressed() {
    if (!issaved) {
        print3D.gcode.save(name);
        issaved = true;
    }
}

function draw() {

    if (layer < maxlayers) {
        createKetting2();

        print3D.print(layer);

    }

    if (layer + 1 == maxlayers) {
        print3D.stop();
        noLoop();
    }
    layer++;

}

function createKetting2() {
    var path = [];
    var center = createVector(550, 550);
    var x, y;
    var radius;
    var hup = 0;

    var radius1 = 460;
    var radius2 = 480;
    var radius3 = 500;
    for (var i = 0; i < 650; i++) {
        radius = 510;
        if (i % 3 > 1 && i < 130) {
            radius = radius1;
        } else if (i % 3 <= 1 && i < 260) {
            radius = radius2;
        } else if (i % 3 <= 1 && i < 390) {
            radius = radius2 + 40;
        } else if (i % 3 > 1 && i < 520) {
            radius = radius3;
        } else if (i % 3 > 1 && i >= 520) {
            radius = radius1 - 30;
        }
        if (i % 132 == 0) {
            hup = PI + PI / 7;
        }
        // if (i % 2 == 0) { radius = 550 }
        x = center.x + (radius * sin((i * (TWO_PI / 130)) + hup));
        y = center.y + (radius * cos((i * (TWO_PI / 130)) + hup));
        append(path, createVector(x, y));
        // if (i == 48) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 100, 300);

        // }
        // if (i == 54) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 200, 300);

        // }
        // if (i == 60) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 50, 300);
        // }
        // if (i == 66) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 100, 200);
        // }
        // if (i == 72) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 150, 300);
        // }
        // if (i == 78) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 250, 250);
        // }
        // if (i == 84) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 100, 300);
        // }
    }

    print3D.addToLayer(layer, path);
}

function createKetting() {
    var path = [];
    var center = createVector(550, 550);
    var x, y;
    var radius;
    var hup = 0;

    var radius1 = 460;
    var radius2 = 480;
    var radius3 = 500;
    for (var i = 0; i < 537; i++) {
        radius = 510;
        if (i % 3 > 1 && i < 132) {
            radius = radius1;
        } else if (i % 3 <= 1 && i < 264) {
            radius = radius2;
        } else if (i % 3 <= 1 && i < 396) {
            radius = radius2;
        } else if (i % 3 > 1 && i >= 396) {
            radius = radius3;
        }
        if (i % 132 == 0) {
            hup = PI + PI / 7;
        }
        // if (i % 2 == 0) { radius = 550 }
        x = center.x + (radius * sin((i * (TWO_PI / 132)) + hup));
        y = center.y + (radius * cos((i * (TWO_PI / 132)) + hup));
        append(path, createVector(x, y));
        // if (i == 48) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 100, 300);

        // }
        // if (i == 54) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 200, 300);

        // }
        // if (i == 60) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 50, 300);
        // }
        // if (i == 66) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 100, 200);
        // }
        // if (i == 72) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 150, 300);
        // }
        // if (i == 78) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 250, 250);
        // }
        // if (i == 84) {
        //     ellipse(x, y, 10, 10);
        //     createLeaf(path, createVector(x, y), 100, 300);
        // }
    }

    print3D.addToLayer(layer, path);
}


function createLeaf(path, pos, w, h) {

    var a = pos.copy();
    var b = pos.copy().add(0, 40);
    var c = pos.copy().add(0, w);
    var d = b.copy().add(w / 2, 0);
    var e = b.copy().add(w / 2, h / 2);
    var l = b.copy().add(-w / 2, 0);
    var k = b.copy().add(-w / 2, h / 2);
    var x, y;
    var u, v;
    var r, s;
    var p, w;

    append(path, a);
    ellipse(a.x, a.y, 10, 10);
    append(path, b);
    ellipse(b.x, b.y, 10, 10);
    append(path, c);
    ellipse(c.x, c.y, 10, 10);
    var steps = 8;

    for (i = 0; i <= steps; i++) {
        var t = i / steps;
        x = bezierPoint(b.x, d.x, e.x, c.x, t);
        y = bezierPoint(b.y, d.y, e.y, c.y, t);
        append(path, createVector(x, y));
        u = curvePoint(b.x, b.x, c.x, c.x, t);
        v = curvePoint(b.y, b.y, c.y, c.y, t);
        append(path, createVector(u, v));
    }
    for (i = 0; i <= steps; i++) {
        var t = i / steps;
        p = curvePoint(c.x, c.x, b.x, b.x, t);
        w = curvePoint(c.y, c.y, b.y, b.y, t);
        append(path, createVector(p, w));
        r = bezierPoint(c.x, k.x, l.x, b.x, t);
        s = bezierPoint(c.y, k.y, l.y, b.y, t);
        append(path, createVector(r, s));

    }
    append(path, a);





}