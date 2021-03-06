/* Ria Stroes */
/* @updated: november 2017  */
/* Project 'Borduren'
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
    model = loadImage("images/mossel.jpg");
}

function setup() {

    var canvas = createCanvas(1100, 1100);


    windowscale = 1;
    palette = new Color();
    colors = palette.create();
    strokeWeight(2);

    layer = 0;
    maxlayers = 3;
    var startlayerheight = 0.2; // 1
    var maxskirt = 2; //0 whithout skirt

    print3D = new Print3D("Anet", "NYLON", "fine", maxlayers, startlayerheight, maxskirt);


    maxw = 180; //200
    maxh = 25; //35
    margew = 50;
    margeh = 50;
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


        //print3D.addPointToLayer(layer, createVector(20, 450));
        createGrid(createVector(50, 50));
        text(floor(grid.gridwidth) + " x " + floor(grid.gridheight), 50, 50)
        borduren();
        name = "Borduren";
        print3D.print(layer);

    }
    if (layer + 1 == maxlayers) {
        print3D.stop();
        noLoop();
    }
    layer++;

}




function createGrid(pos) {
    //with image pattern
    show = true;
    grid = new Grid(pos);
    grid.init2(1000, 1000, 30, 30);
    grid.colormarge = 30;
    grid.showMargin2(50, 50);
    //grid.maskImage2(50, 50, model, colors[0]);
    grid.collectColors(50, 50, model, colors[0]);
    grid.reorder();
    grid.reorderc();
}

function borduren() {
    var path = [];
    var acolor = colors[0];
    var apos, bpos;
    var last;
    var w = grid.gridwidth / 2;
    var h = grid.gridheight / 2;
    for (var i = 0; i < grid.c.length - 1; i++) {

        if (this.palette.compare(grid.c[i].color, acolor, grid.colormarge)) {

            if (apos) {
                bpos = apos.copy();
            } else {
                bpos = grid.c[i].p.copy();
            }
            apos = grid.c[i].p.copy();
            if (apos.y != bpos.y && apos.x < bpos.x) {
                append(path, bpos.copy().add(-w, h));
                append(path, apos.copy().add(-w, -h));
            } else if (apos.y != bpos.y && apos.x > bpos.x) {
                stroke(255, 0, 0);
                ellipse(apos.x, apos.y, 10, 10);
                append(path, bpos.copy().add(w, h));
                append(path, apos.copy().add(w, -h));
            }

            if (grid.c[i].p.x < grid.c[i + 1].p.x) { //van links naar rechts
                createKruissteekLR(path, grid.c[i].p.copy(), w, h);
            } else if (grid.c[i].p.x > grid.c[i + 1].p.x) {
                createKruissteekRL(path, grid.c[i].p.copy(), w, h);
            }


        }
    }
    print3D.addToLayer(layer, path);
}

function createKruissteekLR(path, pos, w, h) {
    var s1 = pos.copy().add(-w, -h);
    stroke(0);
    //ellipse(s1.x, s1.y, 10, 10);
    append(path, s1);
    var s2 = pos.copy().add(w, h);
    append(path, s2);
    stroke(255, 0, 0);
    // ellipse(s2.x, s2.y, 10, 10);
    var s3 = pos.copy().add(-w, h);
    append(path, s3);
    var s4 = pos.copy().add(w, -h);
    append(path, s4);

}

function createKruissteekRL(path, pos, w, h) {
    var s1 = pos.copy().add(w, -h);
    append(path, s1);
    var s2 = pos.copy().add(-w, h);
    append(path, s2);
    var s3 = pos.copy().add(w, h);
    append(path, s3);
    var s4 = pos.copy().add(-w, -h);
    append(path, s4);

}