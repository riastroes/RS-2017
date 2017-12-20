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
var mpixels;
var offset;
var buren;
var name;
var pos;
var path;
var next;
var m;
<<<<<<< Updated upstream
var lastpos;
var ready;
var log;


function preload() {
    model = loadImage("images/onlinetree.png");
    name = "onlinetree.png";
=======



function preload() {
    model = loadImage("images/line05.jpg");
>>>>>>> Stashed changes
}

function setup() {

    var canvas = createCanvas(1400, 1100);
    model.resize(1000, 1000);
    model.loadPixels();
    prepaire(model);
    model.updatePixels();
    offset = createVector(50, 50);

    image(model, offset.x, offset.y);
<<<<<<< Updated upstream
   
    log = new Log(createVector(1120,80), 250,1000);
    log.write("Logbook");

=======
    model.loadPixels();
    mpixels = model.pixels;

    windowscale = 1;
>>>>>>> Stashed changes
    palette = new Color();
    colors = palette.create();

    layer = 0;
    maxlayers = 1;
    var startlayerheight = 0.5; // 1
    var maxskirt = 2; //0 whithout skirt
    //startlayerheight = 2;  // JellyBox
    //print3D = new Print3D("JellyBox", "MAXXFLEX", "normal", maxlayers, startlayerheight, maxskirt);
<<<<<<< Updated upstream
    print3D = new Print3D("Anet", "PLA", "fine", maxlayers, startlayerheight, maxskirt);
    printpath=[];
    
=======
    print3D = new Print3D("Annet", "PLA", "fine", maxlayers, startlayerheight, maxskirt);


    maxw = 120; //200
    maxh = 120; //35
    margew = 30;
    margeh = 150;
    
    
    pos = findStart();
<<<<<<< HEAD
    pos = findNext(pos);


=======
    next = 0;
    path = [];
    path[next] = [];
    
    findPath(next, pos);  //dit is een recursieve functie
    model.updatePixels();
    image(model, offset.x, offset.y);

    console.log("aantal paden:" + path.length);
    //optimizePath(1500);
    //console.log("path.length" + path.length);
    m = showMaxPath();
    
    
    
>>>>>>> origin/master

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

    pos = findStart(lastpos);
    if(pos != undefined){
        //log.write("lastpos: " + lastpos.x +','+ lastpos.y);
        log.write("pos: " + pos.x +','+ pos.y);
        next = 0;
        path = [];
        path[next] = [];
        
        findPath(next, pos, 100);  //dit is een recursieve functie
        repaintRedLines();
        //model.updatePixels();
        //image(model, offset.x, offset.y);
=======
    var max = addDifferencePath(m, colors[0]);
    if( max < 10){
        
        if (layer < maxlayers) {

        // createRaster();
        //print3D.addPointToLayer(layer, createVector(20, 450));
        //createPatternHanna();
        //print3D.addPointToLayer(layer, createVector(1080, 450));
>>>>>>> Stashed changes
        //stroke(0);
        //ellipse(pos.x +  offset.x, pos.y +  offset.y, 10,10);
        log.write("aantal paden:" + path.length);

        m = getMaxPath(10);
        
        
        if( path[m].length > 10){
            lastpos = path[m][path[m].length-1].copy();
            printpath = printpath.concat(path[m]);
            log.write("printpath lengte:" + printpath.length);
            //showPrintpath(printpath);
        }
        log.write(frameCount);
    }

    if(frameCount ==1000 && pos != undefined){  
        path = [];
        path = optimizePath3(printpath,3);
        ready = true;
        if (layer < maxlayers) {

<<<<<<< Updated upstream
            print3D.addToLayer(layer, path);
            print3D.print(layer);

=======
>>>>>>> Stashed changes
        }
        if (layer + 1 == maxlayers) {
            print3D.stop();
            noLoop();
        }
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
        layer++
    }
    
   
<<<<<<< Updated upstream
=======

}
>>>>>>> Stashed changes

function findPath(current, p){
   
    append(path[current], p);
    var buren = getBuren(p);
    
    for(var b = 0; b < buren.length; b++){
        if(checkColor(buren[b])){
            next++;
            path[next] = [];
            path[next] = path[next].concat(path[current]);
            if((next) <8000){
                
                var i = (buren[b].y * 1000 * 4) + (buren[b].x * 4);
                model.pixels[i] = 255;
                model.pixels[i+1] = 0;
                model.pixels[i+2] = 0;
                model.pixels[i+3] = 255;
            
                findPath(next, buren[b]);
            }
        }
        var i = (buren[b].y * 1000 * 4) + (buren[b].x * 4);
        model.pixels[i] = 255;
        model.pixels[i+1] = 0;
        model.pixels[i+2] = 0;
        model.pixels[i+3] = 255;
    }
}
function getBuren(pos){
    var buren = [];
    
    buren[0] = pos.copy().add(1,0);
    buren[1] = pos.copy().add(1,-1);
    buren[2] = pos.copy().add(0,-1);
    buren[3] = pos.copy().add(-1,-1);
    buren[4] = pos.copy().add(-1,0);
    buren[5] = pos.copy().add(-1,1);
    buren[6] = pos.copy().add(0,1);
    buren[7] = pos.copy().add(1,1);

    
    return buren;
}
function prepaire(img){
    //make black and white;
    for( var i= 0; i < img.pixels.length; i+=4){
        if(img.pixels[i] != 255){
            img.pixels[i] = 0;
            img.pixels[i+1] = 0;
            img.pixels[i+2] = 0;
            img.pixels[i+3] = 255;
        }
    }
}
function findPath(current, p, buffersize){
   
    append(path[current], p);
    var i = (p.y * 1000 * 4) + (p.x * 4);
    model.pixels[i] = 255;
    model.pixels[i+1] = 0;
    model.pixels[i+2] = 0;
    model.pixels[i+3] = 255;
    getBuren(p);
    
    for(var b = 0; b < buren.length; b++){
        if(checkColor(buren[b], "black")){
            next++;
            path[next] = [];
            path[next] = path[next].concat(path[current]);
            if((next) <buffersize){
                
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
function getBuren(pos){
    buren = [];
    
    buren[0] = pos.copy().add(1,0);
    buren[1] = pos.copy().add(1,-1);
    buren[2] = pos.copy().add(0,-1);
    buren[3] = pos.copy().add(-1,-1);
    buren[4] = pos.copy().add(-1,0);
    buren[5] = pos.copy().add(-1,1);
    buren[6] = pos.copy().add(0,1);
    buren[7] = pos.copy().add(1,1);

<<<<<<< Updated upstream
}
function repaintRedLines(){
    for (var i = 0; i < model.pixels.length; i += 4) {
        if( model.pixels[i] == 255 &&
            model.pixels[i+1] == 0 &&
            model.pixels[i+2] == 0 &&
            model.pixels[i+3] == 255 ){
            
            model.pixels[i] = 0;
            model.pixels[i+1] = 0;
            model.pixels[i+2] = 0;
            model.pixels[i+3] = 255;
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
        if(checkColor(pos, "black")){
            if(dist(pos.x, pos.y, last.x, last.y) < max){
                found = true;
                max = dist(pos.x, pos.y, last.x, last.y);
                foundpos = pos.copy();
                foundi = i;
            }
        }                               
   }
    if(found){
        //green
        model.pixels[foundi] = 0;
        model.pixels[foundi+1] = 255;
        model.pixels[foundi+2] = 0;
        model.pixels[foundi+3] = 255;
    }
         
    return foundpos;
}
function showPrintpath(printpath){
    stroke(0,255,0);
    strokeWeight(1);
    for(var i = 0; i < printpath.length; i++){
       point( printpath[i].x, printpath[i].y);
    }
}
function optimizePath(oldpath, steps){
    
    var newpath = [];
    var index = 0;
    //alle oneven nummers verwijderen
    for(var i = 0; i < oldpath.length; i += 2){
        newpath[index] = oldpath[i].copy();
        index++;
    }
    index = 0;
    oldpath = [];
    oldpath = newpath;
    newpath = [];
    for(var i = 0; i < oldpath.length; i += steps){
        newpath[index] = oldpath[i].copy();
        index++;
    }
    return newpath;
}
function optimizePath(oldpath, steps){
    //eke 10e punt wordt meegenomen
    var newpath = [];
    var index = 0;
    
    for(var i = 0; i < oldpath.length; i += steps){
        newpath[index] = oldpath[i].copy();
        index++;
    }
    return newpath;
}
function optimizePath2(oldpath, steps){
    //elke punt dat steps verder ligt dan vorige punt, wordt meegenomen
    //en niet met een even y positie
    var newpath = [];
    var index = 1;
    append(newpath, oldpath[0].copy());
    for(var i = 1; i < oldpath.length; i += 1){
        if(oldpath[i].y % 2 == 0){
            if(dist(newpath[index-1].x, newpath[index-1].y, oldpath[i].x, oldpath[i].y)>steps){
                
                newpath[index] = oldpath[i].copy();

                index++;
            }
        }
     }
    
    oldpath = [];
    oldpath = newpath;
    return oldpath;
}

function optimizePath3(oldpath,steps){
    //alleen even x posities
    //alleen even y posities
    var newpath = [];
    var index = 1;
    append(newpath, oldpath[0].copy());
    for(var i = 1; i < oldpath.length; i += 1){
        if(oldpath[i].x % steps == 0){
            if(oldpath[i].y % steps == 0){
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
function getMaxPath(min){
    var foundmax = 0;
    var max = min;

    for(var i = 0; i < path.length; i++){
        if(max < path[i].length){
            max = path[i].length;
            foundmax = i;
        }
=======

function findStart() {
<<<<<<< HEAD

    var colormarge = 10;
=======
    model.loadPixels();
    var colormarge = 50;
    
>>>>>>> origin/master
    var found = false;
    var pos = createVector(0, 0);
    var acolor = color(mpixels[0], mpixels[1], mpixels[2], mpixels[3]);
    //first black pixel
    for (var i = 0; i < mpixels.length; i += 4) {
        if (abs(mpixels[i] - red(acolor)) < colormarge &&
            abs(mpixels[i + 1] - green(acolor)) < colormarge &&
            abs(mpixels[i + 2] - blue(acolor)) < colormarge &&
            mpixels[i + 3] == alpha(acolor)) {

            //background image

        } else if(model.pixels[i] == 255 &&
            model.pixels[i+1] == 0 &&
            model.pixels[i+2] == 0 &&
            model.pixels[i+3] == 255){
            // red pixel
        } else {
            found = true;
            pos.x = floor((i / 4) % 1000);
            pos.y = floor((i / 4) / 1000);

<<<<<<< HEAD
            console.log(pos.x + ", " + pos.y);
            stroke(0);
            ellipse(pos.x + offset.x, pos.y + offset.y, 10, 10);
=======
            model.pixels[i] = 255;
            model.pixels[i+1] = 0;
            model.pixels[i+2] = 0;
            model.pixels[i+3] = 255;
>>>>>>> origin/master
            break;

        }
    }
<<<<<<< HEAD

=======
         
>>>>>>> origin/master
    return pos;
}
function optimizePath(thresshold){
    
    var newpath = [];
    var index = 0;
    for(var i = 0; i < path.length; i++){
        if(path[i].length > thresshold){
            newpath[index] = path[i];
            index++;
        }
    }
    path = [];
    path = newpath;
}
function showMaxPath(){
    var foundmax = 0;
    var max = 0;

    for(var i = 0; i < path.length; i++){
        if(max < path[i].length){
            max = path[i].length;
            foundmax = i;
        }
    }

<<<<<<< HEAD
function findNext(pos) {
    var i = ((pos.y) * (4 * 1000) + (pos.x * 4);

    }

    function createPattern05(path, p, w, h) {
        //van links naar rechts
        var r = p.copy();
        var angle = TWO_PI / 4;
=======
    console.log("langste pad: " + foundmax);
    
    for(var i = 0; i < path[foundmax].length; i++){
        stroke(0);
        ellipse( path[foundmax][i].x, path[foundmax][i].y, 10,10);
    }
    return foundmax;
}

function addDifferencePath(m, acolor){
    var diffpath= [];
    //verzamel alle verschil-paden t.o.v. het langste pad
    for(i = 0; i < path.length; i++){
        diffpath[i] = [];
        for(var j = 0; j < path[i].length; j++){
            if(!contains(path[m], path[i][j])){
                append(diffpath[i], path[i][j]);
            }
        }
    }
    //bepaal wat de langste is (het grootste verschil)
    var max = 0;
    var maxd = 0;
    for(var d =0; d < diffpath.length; d++){
        if(diffpath[d].length > max){
            max = diffpath[d].length;
            maxd = d;
        }
    }
    console.log("langste diffpad: " + maxd +   " lengte: " + max);
    
    for(var i = 0; i < diffpath[maxd].length; i++){
        stroke(acolor);
        ellipse( diffpath[maxd][i].x, diffpath[maxd][i].y, 10,10);
    }

    //voeg dit grootste verschil-pad toe aan het langste pad.
    path[m] = path[m].concat(diffpath[maxd]);
    return max;
}
function findNextOnEllipse(pos, radius, steps){
    var next = [];
    var p;
    var n = 0;
    var angle;
    
    for(var i = 0; i < steps; i++){
        angle = (TWO_PI /steps) * i;
        next[n] = createVector(0,0);
        next[n].x = floor( pos.x + (radius * cos(angle)));
        next[n].y = floor( pos.y + (radius * sin(angle)));
        if(checkColor(next[n])){
            n += 1;
        }
    }
    for(var i = 0; i < next.length; i++){
        if(!inPos(next[i])){
            p = next[i].copy();
        }
    }
   
    return p;
}
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
function checkColor(next){
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
    if(model.pixels[i] == 255 &&
        model.pixels[i+1] == 255 &&
        model.pixels[i+2] == 255 &&
        model.pixels[i+3] == 255){
            //white pixel
    }
    else if(model.pixels[i] == 255 &&
        model.pixels[i+1] == 0 &&
        model.pixels[i+2] == 0 &&
        model.pixels[i+3] == 255){
        // red pixel
    }
    else{
        found = true
       // console.log(next.x + ", " + next.y);
       // stroke(0);
       // ellipse(next.x + offset.x, next.y + offset.y, 10, 10);
    }
    return found;
}
function inPos(next){
    var found = false;
    for(var i =0; i < pos.length; i++){
        if(pos[i].x == next.x && pos[i].y == next.y){
            found = true;
            break;
        }
    }
    return found;
}
function createPattern05(path, p, w, h) {
    //van links naar rechts
    var r = p.copy();
    var angle = TWO_PI / 4;
    append(path, r.copy());
    for (var i = 0; i < 4; i++) { //{ ? ? ? ** * ANGLE VERANDEREN IN 0 T / M 8 ETC.
        r.x += (w * cos(-i * angle));
        r.y += (h * sin(-i * angle));

>>>>>>> origin/master
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

>>>>>>> Stashed changes
    }

    log.write("langste pad: " + foundmax);
    
    for(var i = 0; i < path[foundmax].length; i++){
        var a = (path[foundmax][i].y * 1000 * 4) + (path[foundmax][i].x * 4);
        path[foundmax][i].x += offset.x;
        path[foundmax][i].y += offset.y;
        //maak groen
        model.pixels[a] = 0;
        model.pixels[a+1] = 255;
        model.pixels[a+2] = 0;
        model.pixels[a+3] = 255;
        
    }
    model.updatePixels();
    image(model, offset.x, offset.y);
    return foundmax;
}


<<<<<<< Updated upstream


function checkColor(next, colorname){
    var found = false;
    var i = (next.y * 1000 * 4) + (next.x * 4);
    switch(colorname){
        case "white":{
            if(model.pixels[i] == 255 &&
                model.pixels[i+1] == 255 &&
                model.pixels[i+2] == 255 &&
                model.pixels[i+3] == 255){
                found = true;
            }
            break;
        }
        case "red":{
            if(model.pixels[i] == 255 &&
                model.pixels[i+1] == 0 &&
                model.pixels[i+2] == 0 &&
                model.pixels[i+3] == 255){
                found = true;
            }
            break;
        }
        case "black":{  //gray
            if( model.pixels[i] < 200 && 
                model.pixels[i] == model.pixels[i+1] && 
                model.pixels[i+1] == model.pixels[i+2]  && 
                model.pixels[i+3] == 255){
                found = true;
            }
            break;
        }
        case "black or red":{
            if(model.pixels[i] == 255 &&
                model.pixels[i+1] == 0 &&
                model.pixels[i+2] == 0 &&
                model.pixels[i+3] == 255){
                found = true;
            }
            else if( model.pixels[i]  < 200 && 
                model.pixels[i] == model.pixels[i+1] && 
                model.pixels[i+1] == model.pixels[i+2]  && 
                model.pixels[i+3] == 255){
                found = true;
=======
    function createPatternHanna(path, p, w, h) {
        //with image pattern
        show = true;
        grid = new Grid(createVector(margew, 150));
        grid.init2(600, 600, maxw, maxh);
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
>>>>>>> Stashed changes
            }
            break;
        }
<<<<<<< Updated upstream
       
    }
    
    return found;
}
function inPos(next){
    var found = false;
    for(var i =0; i < pos.length; i++){
        if(pos[i].x == next.x && pos[i].y == next.y){
            found = true;
            break;
        }
    }
    return found;
}
function log(atext){

}
=======
        print3D.addToLayer(layer, path);
    }
>>>>>>> Stashed changes
