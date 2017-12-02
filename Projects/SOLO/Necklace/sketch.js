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
var model1, model2, model3, model4;
var name;



function preload() {
    model1 = loadImage("images/necklace1.png");
    model2 = loadImage("images/necklace2.png");
    model3 = loadImage("images/necklace3.png");
    model4 = loadImage("images/necklace4.png");
}

function setup() {

    var canvas = createCanvas(1100, 1100); 
    windowscale = 1;
    model1.resize(1000, 1000);

    palette = new Color();
    colors = palette.create();
    
    
    layer = 0;
    maxlayers = 1;
    var maxskirt = 3;
    print3D = new Print3D("Anet", "PLA", "normal", maxlayers, maxskirt ) ;
    

    maxw = 100;
    maxh = 20; 
    marge =50;
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    //grid.maskCircle(createVector(500, 500), 300);
    //image(model, marge, marge);
    grid.showMargin(marge);
    grid.maskImage(marge, model1);
    grid.reorder();
    //grid.draw();

    
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

        createCoral("Irregular20Random3Thick5", false);
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
function createCoral(aname, showdesign){
    name = "necklace" + aname;
    
    switch(aname){
       
        case "Irregular10Random2Thick5":{
            for(var i = 0; i < grid.p.length; i++){
                if(random(2) < 1){
                    var radius = random(5,10);
                    if(showdesign){
                        stroke(colors[0]);
                        ellipse(grid.p[i].x, grid.p[i].y,radius,radius);
                    }
                    var path;
                    var z = 0;
                    for(var t = 0; t < 5; t++){
                        z += 0.2;
                        path = createPattern(grid.p[i], radius-t,radius,z);
                        print3D.addToLayer(layer, path);
                    }
                   
                 }
                
             }
            break;
        } case "Irregular10Random3Thick5":{
            for(var i = 0; i < grid.p.length; i++){
                if(random(3) < 1){
                    var radius = random(5,10);
                    if(showdesign){
                        stroke(colors[0]);
                        ellipse(grid.p[i].x, grid.p[i].y,radius,radius);
                    }
                    var path;
                    var z = 0;
                    for(var t = 0; t < 5; t++){
                        z += 0.2;
                        path = createPattern(grid.p[i], radius-t,radius,z);
                        print3D.addToLayer(layer, path);
                    }
                   
                 }
                
             }
            break;
        }
        case "Irregular20Random3Thick5":{
            for(var i = 0; i < grid.p.length; i++){
                if(random(3) < 1){
                    var radius = random(5,20);
                    if(showdesign){
                        stroke(colors[0]);
                        ellipse(grid.p[i].x, grid.p[i].y,radius,radius);
                    }
                    var path;
                    var z = 0;
                    for(var t = 0; t < 5; t++){
                        z += 0.2;
                        path = createPattern(grid.p[i], radius-t,radius,z);
                        print3D.addToLayer(layer, path);
                    }
                   
                 }
                
             }
            break;
        }
        
        
    }
    
}
function createPattern(pos, radius, steps, z){
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

