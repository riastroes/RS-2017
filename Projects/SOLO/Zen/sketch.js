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

var name;
var pos;
var path;
var next;
var m;
var lastpos;
var ready;



function preload() {
    model = loadImage("images/blad03.jpg");
    name = "blad03";
}

function setup() {

    var canvas = createCanvas(1100, 1100);
    model.resize(1000, 1000);
    model.loadPixels();
    offset = createVector(50, 50);

    stroke(0);
    //rect(offset.x - 1, offset.y - 1, 1000 + 2, 1000 + 2);
    image(model, offset.x, offset.y);


    windowscale = 1;
    palette = new Color();
    colors = palette.create();



    layer = 0;
    maxlayers = 1;
    var startlayerheight = 0.5; // 1
    var maxskirt = 2; //0 whithout skirt
    //startlayerheight = 2;  // JellyBox
    //print3D = new Print3D("JellyBox", "MAXXFLEX", "normal", maxlayers, startlayerheight, maxskirt);
    print3D = new Print3D("Anet", "PLA", "fine", maxlayers, startlayerheight, maxskirt);
    printpath=[];
    
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
    if(pos != undefined){
        console.log("lastpos: " + lastpos.x +','+ lastpos.y);
        console.log("pos: " + pos.x +','+ pos.y);
        next = 0;
        path = [];
        path[next] = [];
        
        findPath(next, pos);  //dit is een recursieve functie
        repaintRedLines();
        model.updatePixels();
        image(model, offset.x, offset.y);
        stroke(0);
        ellipse(pos.x +  offset.x, pos.y +  offset.y, 10,10);
        console.log("aantal paden:" + path.length);

        m = getMaxPath();
        
        
        if( path[m].length > 10){
            lastpos = path[m][path[m].length-1].copy();
            printpath = printpath.concat(path[m]);
            console.log("printpath lengte:" + printpath.length);
            showPrintpath(printpath);
        }
        fill(255);
        rect(20,10, 100, 30);
        fill(0);
        text(frameCount,  20,30);
    }

    if(frameCount ==1000 || pos == undefined){  
        path = optimizePath(printpath,10);
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

function findPath(current, p){
   
    append(path[current], p);
    var buren = getBuren(p);
    
    for(var b = 0; b < buren.length; b++){
        if(checkColor(buren[b], "black")){
            next++;
            path[next] = [];
            path[next] = path[next].concat(path[current]);
            if((next) <7000){
                
                var i = (buren[b].y * 1000 * 4) + (buren[b].x * 4);
                //maak rood
                model.pixels[i] = 255;
                model.pixels[i+1] = 0;
                model.pixels[i+2] = 0;
                model.pixels[i+3] = 255;
            
                findPath(next, buren[b]);
            }
        }
        else{
        // var i = (buren[b].y * 1000 * 4) + (buren[b].x * 4);
        // model.pixels[i] = 255;
        // model.pixels[i+1] = 0;
        // model.pixels[i+2] = 0;
        // model.pixels[i+3] = 255;
        }
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
        if(checkColor(pos, "black or red")){
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
    oldpath = [];
    oldpath = newpath;
    return oldpath;
}
function getMaxPath(){
    var foundmax = 0;
    var max = 0;

    for(var i = 0; i < path.length; i++){
        if(max < path[i].length){
            max = path[i].length;
            foundmax = i;
        }
    }

    console.log("langste pad: " + foundmax);
    
    for(var i = 0; i < path[foundmax].length; i++){
        var a = (path[foundmax][i].y * 1000 * 4) + (path[foundmax][i].x * 4);
        path[foundmax][i].x += offset.x;
        path[foundmax][i].y += offset.y;
        model.pixels[a] = 0;
        model.pixels[a+1] = 255;
        model.pixels[a+2] = 0;
        model.pixels[a+3] = 255;
        
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

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
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
            }
            break;
        }
       
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
        }
    }
    print3D.addToLayer(layer, path);
}