/* Ria Stroes */
/* @updated: november 2017  */
/* Project 'SOLO', The Opera Dress
/* Co-creation with Jolanta Izabela Pawlak
*/



var palette;
var colors;


var print3D;
var layer;
var maxlayers;
var show;

var issaved;
var model;
var offset;

var name;
var pos;
var path;
var next;
var printpath;


var buren;

var m;
var lastpos;
var ready;
var log;

function preload() {
    model = loadImage("images/onlinetree.png");
    name = "onlinetree.png";
}


function setup() {
    createCanvas(1100, 1100);
    model.resize(1000, 1000);

    offset = createVector(50, 50);

    image(model, offset.x, offset.y);
    model.loadPixels();
    prepaireImage();

    log = new Log(createVector(1120, 80), 250, 1000);
    log.write("Logbook");

    palette = new Color();
    colors = palette.create();


    maxskirt = 3; //0 whithout skirt
    startlayerheight = 0;
    layer = 0;
    maxlayers = 1

    print3D = new Print3D("Ultimaker2+", "PLA", "fine", maxlayers, startlayerheight, maxskirt);
    printpath = [];
    path = [];
    path[0] = [];




    lastpos = print3D.skirt.p[maxskirt - 1].copy();
    next = 0;



    print3D.start();
    lastpos = print3D.last.copy();
}

function mousePressed() {
    if (!issaved) {
        print3D.gcode.save(name);
        issaved = true;
    }
}

function draw() {

    pos = findStart(lastpos);
    if (frameCount < 1000) {

        repaintRedLines();
        findPath(next, pos);
        log.write("aantal paden:" + path.length);

        var m = getMaxPath(10);
        if (m >= 0) {
            printpath = printpath.concat(path[m]);
        }
        model.updatePixels();
        image(model, offset.x, offset.y);
    } else {
        optimizePath2(printpath);
        if (layer < maxlayers) {
            ready = true;
            print3D.addToLayer(layer, printpath);
            print3D.print(layer);

        }
        if (layer + 1 == maxlayers) {
            print3D.stop();
            noLoop();
        }

        layer++
    }
}



function findPath(current, p) {

    append(path[current], p);
    var buren = getBuren(p);

    for (var b = 0; b < buren.length; b++) {
        if (checkColor(buren[b])) {
            next++;
            path[next] = [];
            path[next] = path[next].concat(path[current]);
            if ((next) < 7000) {

                var i = (buren[b].y * 1000 * 4) + (buren[b].x * 4);
                model.pixels[i] = 255;
                model.pixels[i + 1] = 0;
                model.pixels[i + 2] = 0;
                model.pixels[i + 3] = 255;

                findPath(next, buren[b]);
            }
        }
        var i = (buren[b].y * 1000 * 4) + (buren[b].x * 4);
        model.pixels[i] = 255;
        model.pixels[i + 1] = 0;
        model.pixels[i + 2] = 0;
        model.pixels[i + 3] = 255;
    }
}

function getBuren(pos) {
    var buren = [];

    buren[0] = pos.copy().add(1, 0);
    buren[1] = pos.copy().add(1, -1);
    buren[2] = pos.copy().add(0, -1);
    buren[3] = pos.copy().add(-1, -1);
    buren[4] = pos.copy().add(-1, 0);
    buren[5] = pos.copy().add(-1, 1);
    buren[6] = pos.copy().add(0, 1);
    buren[7] = pos.copy().add(1, 1);


    return buren;
}

function prepaireImage() {
    //make black and white;
    for (var i = 0; i < model.pixels.length; i += 4) {
        if (model.pixels[i] != 0) {
            model.pixels[i] == 255;
            model.pixels[i + 1] == 255;
            model.pixels[i + 2] == 255;
            model.pixels[i + 3] == 255;
        }
    }
}

function repaintRedLines() {
    //if pixel is red make black again
    for (var i = 0; i < model.pixels.length; i += 4) {
        if (model.pixels[i] == 255 &&
            model.pixels[i + 1] == 0 &&
            model.pixels[i + 2] == 0 &&
            model.pixels[i + 3] == 255) {

            model.pixels[i] == 0;
            model.pixels[i + 1] == 0;
            model.pixels[i + 2] == 0;
            model.pixels[i + 3] == 255;
        }
    }
}

function getMaxPath(min) {
    var foundmax = -1;
    var max = min;
    for (var i = 0; i < path.length; i++) {
        if (path[i].length > max) {
            max = path[i].length;
            foundmax = i;
        }
    }
    return foundmax;
}

function findStart() {

    var found = false;
    var pos = createVector(0, 0);
    //first black pixel
    for (var i = 0; i < model.pixels.length; i += 4) {
        if (model.pixels[i] == 0) {
            //black
            found = true;

            pos.x = floor((i / 4) % 1000);
            pos.y = floor((i / 4) / 1000);

            console.log(pos.x + ", " + pos.y);
            stroke(0);
            ellipse(pos.x + offset.x, pos.y + offset.y, 10, 10);
            break;

        }
    }
    return pos;
}

function optimizePath(thresshold) {

    var newpath = [];
    var index = 0;
    for (var i = 0; i < path.length; i++) {
        if (path[i].length > thresshold) {
            newpath[index] = path[i];
            index++;
        }
    }
    path = [];
    path = newpath;
}

function optimizePath2(apath, thresshold) {
    var p = createVector(0, 0);
    var newpath = [];
    var index = 0;
    for (var i = 0; i < apath.length; i++) {
        p.x = floor((i / 4) % 1000);
        p.y = floor((i / 4) / 1000);
        if (p.x % thresshold == 0 && p.y % trhesshold == 0) {
            append(newpath, p);
        }
    }

    path = [];
    path = newpath;
}





function checkColor(next, colorname) {
    var found = false;
    var i = (next.y * 1000 * 4) + (next.x * 4);
    //var acolor = color(255,255,255,255);
    var colormarge = 10;


    // if (abs(model.pixels[i] - red(acolor)) < colormarge &&
    // abs(model.pixels[i + 1] - green(acolor)) < colormarge &&
    //abs(model.pixels[i + 2] - blue(acolor)) < colormarge &&
    //model.pixels[i + 3] == alpha(acolor)) {
    //background
    // }
    //else 
    if (model.pixels[i] == 255 &&
        model.pixels[i + 1] == 255 &&
        model.pixels[i + 2] == 255 &&
        model.pixels[i + 3] == 255) {
        //white pixel
    } else if (model.pixels[i] == 255 &&
        model.pixels[i + 1] == 0 &&
        model.pixels[i + 2] == 0 &&
        model.pixels[i + 3] == 255) {
        // red pixel
    } else {
        found = true
            // console.log(next.x + ", " + next.y);
            // stroke(0);
            // ellipse(next.x + offset.x, next.y + offset.y, 10, 10);
    }
    return found;
}

function inPos(next) {
    var found = false;
    for (var i = 0; i < pos.length; i++) {
        if (pos[i].x == next.x && pos[i].y == next.y) {
            found = true;
            break;
        }
    }
    return found;
}