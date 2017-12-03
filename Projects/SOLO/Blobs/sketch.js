/* Ria Stroes */
/* @updated: november 2017  
/* Het begin van kant.*/


var print3D;
var maxlayers;
var layer;


var palette;
var colors;

var maxw, maxh;
var marge;
var offset;

var issaved;


function setup() {

    var canvas = createCanvas(1100, 1100);
    windowscale = 1;

    background(200);
    layer = 0;
    maxlayers = 1;
    palette = new Color();


    //palette.addHuePalette(60, 50, 50);
    palette.add(color(60, 50, 50));
    palette.add(color(90, 50, 50));
    palette.add(color(120, 50, 50));
    palette.add(color(160, 50, 50));
    palette.add(color(190, 50, 50));

    colors = palette.colors;
    var startlayerheight = 1;
    var maxskirt = 3;

    print3D = new Print3D("Anet", "PLA", "normal", maxlayers, startlayerheight, maxskirt);

    issaved = false;


    print3D.start();

}

function mousePressed() {
    if (!issaved) {
        print3D.gcode.save("Blobs");
        issaved = true;
    }

}

function draw() {


    if (layer < maxlayers) {
        if (layer == 0) {
            //print3D.addPointToLayer(layer, createVector(1050,50));
        }

        //var blob = new Blob(createVector(550, 550), 100, 10, 6);
        //blob.create(20);

        //var blob = new Blob(createVector(550, 550), 100, 10, 6);
        //blob.create2(20);

        //var blob = new Blob(createVector(550, 550), 50, 7, 6);
        //blob.create3(20);


        //var blob = new Blob(createVector(550, 550), 80, 7, 6);
        // blob.create4(20);

        var blob = new Blob(createVector(550, 550), 80, 7, 6);
        blob.create5(20);


        // blob.create();
        //blob.create();
        //blob.create();
        // blob.create();
        print3D.addToLayer(layer, blob.path)
        print3D.print(layer);


    } else {

        print3D.stop();
        noLoop();

    }
    layer++;

}

function blob(pos) {

}