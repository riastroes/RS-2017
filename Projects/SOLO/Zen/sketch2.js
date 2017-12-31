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
var printpath;

var issaved;
var model;
var offset;
var buren;
var name;
var pos;
var path;
var next;
var m;
var lastpos;
var ready;
var log;


function preload() {
    model = loadImage("images/onlinetree.jpg");
    name = "onlinetree";
}

function setup() {

    var canvas = createCanvas(1400, 1100);
    model.resize(1000, 1000);
    model.loadPixels();
    prepaire(model);
    model.updatePixels();
    offset = createVector(50, 50);

    image(model, offset.x, offset.y);

    log = new Log(createVector(1120, 80), 250, 1000);
    log.write("Logbook");

    palette = new Color();
    colors = palette.create();

    layer = 0;
    maxlayers = 1;
    var startlayerheight = 0.5; // 1
    var maxskirt = 2; //0 whithout skirt
    //startlayerheight = 2;  // JellyBox
    //print3D = new Print3D("JellyBox", "MAXXFLEX", "normal", maxlayers, startlayerheight, maxskirt);
    print3D = new Print3D("Anet", "PLA", "fine", maxlayers, startlayerheight, maxskirt);
    printpath = [];

    print3D.start();
    lastpos = print3D.last.copy();

    ready = false;
    issaved = false;

}

function mousePressed() {
    if (!issaved && ready) {
        print3D.gcode.save(name);
        issaved = true;
    }
}

function draw() {

    pos = findStart(lastpos);
    if (pos != undefined) {
        //log.write("lastpos: " + lastpos.x +','+ lastpos.y);
        log.write("pos: " + pos.x + ',' + pos.y);
        next = 0;
        path = [];
        path[next] = [];

        findPath(next, pos, 10000); //dit is een recursieve functie
        repaintRedLines();
        //model.updatePixels();
        //image(model, offset.x, offset.y);
        //stroke(0);
        //ellipse(pos.x +  offset.x, pos.y +  offset.y, 10,10);
        log.write("aantal paden:" + path.length);

        m = getMaxPath(10);


        if (path[m].length > 10) {
            lastpos = path[m][path[m].length - 1].copy();
            printpath = printpath.concat(path[m]);
            log.write("printpath lengte:" + printpath.length);
            //showPrintpath(printpath);
        }
        log.write(frameCount);
    }

    if (frameCount == 1000 && pos != undefined) {
        path = [];
        path = optimizePath3(printpath, 2);
        ready = true;
        if (layer < maxlayers) {

            print3D.addToLayer(layer, path);
            print3D.print(layer);

        }
        if (layer + 1 == maxlayers) {
            print3D.stop();
            noLoop();
        }

        layer++
    }



}

function prepaire(img) {
    //make black and white;
    for (var i = 0; i < img.pixels.length - 1; i += 4) {
        if (img.pixels[i] < 200) {
            if (img.pixels[i] == img.pixels[i + 1]) {
                img.pixels[i] = 0;
                img.pixels[i + 1] = 0;
                img.pixels[i + 2] = 0;
                img.pixels[i + 3] = 255;
            } else {
                img.pixels[i] = 255;
                img.pixels[i + 1] = 255;
                img.pixels[i + 2] = 255;
                img.pixels[i + 3] = 255;
            }

        }
    }

}

function findPath(current, p, buffersize) {

    append(path[current], p);
    var i = (p.y * 1000 * 4) + (p.x * 4);
    model.pixels[i] = 255;
    model.pixels[i + 1] = 0;
    model.pixels[i + 2] = 0;
    model.pixels[i + 3] = 255;
    getBuren(p);

    for (var b = 0; b < buren.length; b++) {
        if (checkColor(buren[b], "black")) {
            next++;
            path[next] = [];
            path[next] = path[next].concat(path[current]);
            if ((next) < buffersize) {

                var i = (buren[b].y * 1000 * 4) + (buren[b].x * 4);
                //maak rood
                // model.pixels[i] = 255;
                // model.pixels[i+1] = 0;
                // model.pixels[i+2] = 0;
                // model.pixels[i+3] = 255;

                findPath(next, buren[b], buffersize);
            }
        }

    }
}

function getBuren(pos) {
    buren = [];

    buren[0] = pos.copy().add(1, 0);
    buren[1] = pos.copy().add(1, -1);
    buren[2] = pos.copy().add(0, -1);
    buren[3] = pos.copy().add(-1, -1);
    buren[4] = pos.copy().add(-1, 0);
    buren[5] = pos.copy().add(-1, 1);
    buren[6] = pos.copy().add(0, 1);
    buren[7] = pos.copy().add(1, 1);

}

function repaintRedLines() {
    for (var i = 0; i < model.pixels.length; i += 4) {
        if (model.pixels[i] == 255 &&
            model.pixels[i + 1] == 0 &&
            model.pixels[i + 2] == 0 &&
            model.pixels[i + 3] == 255) {

            model.pixels[i] = 0;
            model.pixels[i + 1] = 0;
            model.pixels[i + 2] = 0;
            model.pixels[i + 3] = 255;
        }
    }
}

function findStart(last) {
    //zoek de dichtsbijzijnde zwarte punt.
    var max = 1000;
    var foundpos;
    var foundi;
    var colormarge = 50;
    var found = false;
    var pos = createVector(0, 0);

    //first black pixel
    for (var i = 0; i < model.pixels.length; i += 4) {
        pos.x = floor((i / 4) % 1000);
        pos.y = floor((i / 4) / 1000);
        if (checkColor(pos, "black")) {
            if (dist(pos.x, pos.y, last.x, last.y) < max) {
                found = true;
                max = dist(pos.x, pos.y, last.x, last.y);
                foundpos = pos.copy();
                foundi = i;
            }
        }
    }
    if (found) {
        //green
        model.pixels[foundi] = 0;
        model.pixels[foundi + 1] = 255;
        model.pixels[foundi + 2] = 0;
        model.pixels[foundi + 3] = 255;
    }

    return foundpos;
}

function showPrintpath(printpath) {
    stroke(0, 255, 0);
    strokeWeight(1);
    for (var i = 0; i < printpath.length; i++) {
        point(printpath[i].x, printpath[i].y);
    }
}

function optimizePath(oldpath, steps) {

    var newpath = [];
    var index = 0;
    //alle oneven nummers verwijderen
    for (var i = 0; i < oldpath.length; i += 2) {
        newpath[index] = oldpath[i].copy();
        index++;
    }
    index = 0;
    oldpath = [];
    oldpath = newpath;
    newpath = [];
    for (var i = 0; i < oldpath.length; i += steps) {
        newpath[index] = oldpath[i].copy();
        index++;
    }
    return newpath;
}

function optimizePath(oldpath, steps) {
    //eke 10e punt wordt meegenomen
    var newpath = [];
    var index = 0;

    for (var i = 0; i < oldpath.length; i += steps) {
        newpath[index] = oldpath[i].copy();
        index++;
    }
    return newpath;
}

function optimizePath2(oldpath, steps) {
    //elke punt dat steps verder ligt dan vorige punt, wordt meegenomen
    //en niet met een even y positie
    var newpath = [];
    var index = 1;
    append(newpath, oldpath[0].copy());
    for (var i = 1; i < oldpath.length; i += 1) {
        if (oldpath[i].y % 2 == 0) {
            if (dist(newpath[index - 1].x, newpath[index - 1].y, oldpath[i].x, oldpath[i].y) > steps) {

                newpath[index] = oldpath[i].copy();

                index++;
            }
        }
    }

    oldpath = [];
    oldpath = newpath;
    return oldpath;
}

function optimizePath3(oldpath, steps) {
    //alleen even x posities
    //alleen even y posities
    var newpath = [];
    var index = 1;
    append(newpath, oldpath[0].copy());
    for (var i = 1; i < oldpath.length; i += 1) {
        if (oldpath[i].x % steps == 0) {
            if (oldpath[i].y % steps == 0) {
                //if(dist(newpath[index-1].x, newpath[index-1].y, oldpath[i].x, oldpath[i].y)>steps){

                newpath[index] = oldpath[i].copy();

                index++;
                // }
            }
        }
    }

    oldpath = [];
    oldpath = newpath;
    return oldpath;
}

function getMaxPath(min) {
    var foundmax = 0;
    var max = min;

    for (var i = 0; i < path.length; i++) {
        if (max < path[i].length) {
            max = path[i].length;
            foundmax = i;
        }
    }

    log.write("langste pad: " + foundmax);

    for (var i = 0; i < path[foundmax].length; i++) {
        var a = (path[foundmax][i].y * 1000 * 4) + (path[foundmax][i].x * 4);
        path[foundmax][i].x += offset.x;
        path[foundmax][i].y += offset.y;
        //maak groen
        model.pixels[a] = 0;
        model.pixels[a + 1] = 255;
        model.pixels[a + 2] = 0;
        model.pixels[a + 3] = 255;

    }
    model.updatePixels();
    image(model, offset.x, offset.y);
    return foundmax;
}




function checkColor(next, colorname) {
    var found = false;
    var i = (next.y * 1000 * 4) + (next.x * 4);
    switch (colorname) {
        case "white":
            {
                if (model.pixels[i] == 255 &&
                    model.pixels[i + 1] == 255 &&
                    model.pixels[i + 2] == 255 &&
                    model.pixels[i + 3] == 255) {
                    found = true;
                }
                break;
            }
        case "red":
            {
                if (model.pixels[i] == 255 &&
                    model.pixels[i + 1] == 0 &&
                    model.pixels[i + 2] == 0 &&
                    model.pixels[i + 3] == 255) {
                    found = true;
                }
                break;
            }
        case "black":
            { //gray
                if (model.pixels[i] < 200 &&
                    model.pixels[i] == model.pixels[i + 1] &&
                    model.pixels[i + 1] == model.pixels[i + 2] &&
                    model.pixels[i + 3] == 255) {
                    found = true;
                }
                break;
            }
        case "black or red":
            {
                if (model.pixels[i] == 255 &&
                    model.pixels[i + 1] == 0 &&
                    model.pixels[i + 2] == 0 &&
                    model.pixels[i + 3] == 255) {
                    found = true;
                } else if (model.pixels[i] < 200 &&
                    model.pixels[i] == model.pixels[i + 1] &&
                    model.pixels[i + 1] == model.pixels[i + 2] &&
                    model.pixels[i + 3] == 255) {
                    found = true;
                }
                break;
            }

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