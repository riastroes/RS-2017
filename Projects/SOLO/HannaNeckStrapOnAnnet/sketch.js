/* Ria Stroes */
/* @updated: november 2017  */
/* Project 'SOLO', The Opera Dress
/* Co-creation with Jolanta Izabela Pawlak
*/


var grid;
var palette;
var colors;
var margew, margeh;

var print3D;
var layer;
var maxlayers;
var show;

var issaved;
var model;
var name;
var pos;



function preload() {
    model = loadImage("images/Hanna9.jpg");
}

function setup() {

    var canvas = createCanvas(1100, 1100);
    for (var i = 1; i < 4; i++) {
        model.resize(1040, 120);
    }

    windowscale = 1;
    palette = new Color();
    colors = palette.create();
    strokeWeight(2);

    layer = 0;
    maxlayers = 2;
    var startlayerheight = 0.5; // 1
    var maxskirt = 2; //0 whithout skirt
    //startlayerheight = 2;  // JellyBox
    //print3D = new Print3D("JellyBox", "MAXXFLEX", "normal", maxlayers, startlayerheight, maxskirt);
    //print3D = new Print3D("Anet", "PLA", "fine", maxlayers, startlayerheight, maxskirt);

    print3D = new Print3D("Anet", "NYLON", "fine", maxlayers, startlayerheight, maxskirt);
    maxw = 180; //200
    maxh = 25; //35
    margew = 30;
    margeh = 150;
    pos = createVector(30, 200);

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

    if (layer < maxlayers) {

        // createRaster();
        //print3D.addPointToLayer(layer, createVector(20, 450));
        createPatternHanna();
        //print3D.addPointToLayer(layer, createVector(1080, 450));
        stroke(0);
        text(floor(grid.gridwidth) + " x " + floor(grid.gridheight), 50, 50)

        name = "HannaNeckStrap";
        print3D.print(layer);

    }
    if (layer + 1 == maxlayers) {
        print3D.stop();
        noLoop();
    }
    layer++;

}




function createPattern05(path, p, w, h) {
    //van links naar rechts
    var r = p.copy();
    var angle = TWO_PI / 4;
    append(path, r.copy());
    for (var i = 0; i < 4; i++) { //{ ? ? ? ** * ANGLE VERANDEREN IN 0 T / M 8 ETC.
        r.x += (w * cos(-i * angle));
        r.y += (h * sin(-i * angle));

        append(path, r.copy());
    }
}

function createPattern06(path, p, w, h) {
    //van rechts naar links
    var r = p.copy();
    var angle = TWO_PI / 4;
    append(path, r.copy());

    for (var i = 0; i < 4; i++) {
        r.x += w * cos(PI + (i * angle));
        r.y += h * sin(PI + (i * angle));

        append(path, r.copy());
    }

}



function createPatternHanna(path, p, w, h) {
    //with image pattern
    show = true;
    grid = new Grid(createVector(margew, 150));
    grid.init2(1040, 120, maxw, maxh);
    grid.showMargin2(margew, margeh);
    //grid.maskImage2(margew, margeh, model1, colors[0]);
    grid.collectColors(30, 150, model, colors[0]);
    grid.reorder();
    grid.reorderc();
    //grid.showErrors();
    grid.colormarge = 30;

    var acolor = colors[0];
    var bcolor = color(255, 255, 0);

    var path = [];
    for (var i = 0; i < grid.c.length - 1; i++) {
        if (grid.c[i].p.x <= grid.c[i + 1].p.x && grid.c[i].p.y == grid.c[i].p.y) { //van links naar rechts
            if (this.palette.compare(grid.c[i].color, acolor, grid.colormarge)) {
                createPattern05(path, grid.c[i].p.copy(), 3, 5);
            } else {
                grid.c[i].p.z = 0;
                append(path, grid.c[i].p.copy());
            }
        } else {
            if (this.palette.compare(grid.c[i].color, acolor, grid.colormarge)) {
                createPattern06(path, grid.c[i].p.copy(), 3, 5);
            } else {
                grid.c[i].p.z = 0;
                append(path, grid.c[i].p.copy());
            }
        }
    }
    print3D.addPointToLayer(layer, createVector(30, 500));
    print3D.addToLayer(layer, path);
}