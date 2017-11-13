/* Ria Stroes */
/* @updated: november 2017  */
/* Project 'SOLO', The Opera Dress
/* Co-creation with Jolanta Izabela Pawlak
/* I am doing a research on repeatable patterns.
*/


var grid;
var palette;
var colors;
var marge;

var print3D;
var layer;
var maxlayers;

var issaved;
var Sstructure;
var name;



function preload() {
    Sstructure = loadImage("images/S-structure.png");
    
}

function setup() {

    var canvas = createCanvas(1100, 1100); 
    windowscale = 1;
    Sstructure.resize(1000, 1000);

    palette = new Color();
    colors = palette.create();
    
    
    layer = 0;
    maxlayers = 1;
    var maxskirt = 3;
    print3D = new Print3D("Anet", "PLA", "normal", maxlayers, maxskirt ) ;
    
    //pattern1
     maxw = 100; 
     maxh = 100; 
    //pattern2
    maxw =14;
    maxh = 40;
    marge =50;
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    //grid.maskCircle(createVector(500, 500), 300);
    //image(model, marge, marge);
    grid.showMargin(marge);
    grid.maskImage(marge, Sstructure);
    grid.reorder();
    grid.draw();

    
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

        //variatie: naar centrum trekken
        // grid.changeToCenter();
        //image(model, marge, marge);
        //grid.draw();

        createS("pattern2", false);
        print3D.print(layer);

        

    }
    else if (layer < maxlayers) {
       
       
        
    } else {
        print3D.stop();
        noLoop();
    }
    layer++;

}



function setText(t, x, y, size) {
    fill(255);
    noStroke();
    rect(x - 10, y - size, 150, size * 1.3);
    stroke(0);
    textSize(size);
    fill(0);

    text(t, x, y);
}
function createS(aname, showdesign){
    name = "S-structure" + aname;
    
    switch(aname){
       
        case "pattern1":{
            for(var i = 0; i < grid.p.length; i++){
                if(random(10) < 1){
                    var radius = random(5,50);
                    if(showdesign){
                        stroke(colors[0]);
                        ellipse(grid.p[i].x, grid.p[i].y,radius,radius);
                    }
                    var path;
                    var z = 0;
                    for(var t = 0; t < 5; t++){
                        z += 0.2;
                        path = createPatternRings(grid.p[i], radius-t,radius,z);
                        print3D.addToLayer(layer, path);
                    }
                   
                 }
                
             }
            break;
        } 
        case "pattern2":{
            for(var i = 0; i < grid.p.length; i++){
                if(random(1) < 1){
                    var radius = random(5,50);
                    if(showdesign){
                        stroke(colors[0]);
                        ellipse(grid.p[i].x, grid.p[i].y,radius,radius);
                    }
                    var path;
                    var z = 0;
                    for(var t = 0; t < 1; t++){
                        z += 0.2;
                        path = createPatternDaisies(grid.p[i], radius-t,radius,z);
                        print3D.addToLayer(layer, path);
                    }
                   
                 }
                
             }
            break;
        } 
        
    }
    
}
function createPatternRings(pos, radius, steps, z){
    
    if(z == undefined){
        z = 0;
    }
    this.path = [];
    var i = 0;
    var corner = PI/2;
    for(var angle = 0; angle <= TWO_PI; angle += (TWO_PI/steps)){
            this.path[i] = pos.copy();
            this.path[i].x += radius * cos(angle + corner);
            this.path[i].y += radius * sin(angle + corner);
            this.path[i].z = z;
            i++;
    }
    return this.path;
}
function createPatternDaisies(pos, radius, steps, z){
   
    if(z == undefined){
        z = 0;
    }
    this.path = [];
    var i = 0;
    var d;
    var corner = PI/2;
    for(var angle = 0; angle <= TWO_PI; angle += (TWO_PI/4)){
            d = pos.copy();
            d.x += radius * cos(angle + corner);
            d.y += radius * sin(angle + corner);
            d.z = z;
            for(var dangle = 0; dangle <= TWO_PI; dangle += (TWO_PI/6)){
                this.path[i] = d.copy();
                this.path[i].x += 20 * cos(dangle + corner);
                this.path[i].y += 20 * sin(dangle + corner);
                i++;
            }
    }
    return this.path;
}

