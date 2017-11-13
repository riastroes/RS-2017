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
var model;
var name;



function preload() {
    model = loadImage("images/Coral of the brain.jpg");
}

function setup() {

    var canvas = createCanvas(1100, 1100); 
    windowscale = 1;
    model.resize(1000, 1000);

    palette = new Color();
    colors = palette.create();
    
    
    layer = 0;
    maxlayers = 1;
    var maxskirt = 3;
    print3D = new Print3D("Anet", "PLA", "normal", maxlayers, maxskirt ) ;
    

    maxw = 40;
    maxh = 40; 
    marge =300;
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    //grid.maskCircle(createVector(500, 500), 300);
    //image(model, marge, marge);
    grid.showMargin(marge);
    grid.maskImage(marge, model);
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

        createCoral("flat", false);
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
    name = "coral" + aname;
    var path;
    
    switch(aname){
        case "flat":{
            for(var i = 0; i < grid.p.length-1; i++){
                if(showdesign){
                    stroke(colors[0]);
                    if(grid.p[i].y == grid.p[i + 1].y){
                        line(grid.p[i].x, grid.p[i].y,grid.p[i+1].x, grid.p[i+1].y);
                       
                        
                    }
                    
                 }
                 path = createFlatPattern(grid.p[i],25,2,0);
                 print3D.addToLayer(layer, path);
                 i+=1;
                
            }
            break;
        }
        
        
    }
    
}
function createFlatPattern(pos, len, levels, z){
    if(z == undefined){
        z = 0;
    }
    this.path = [];
    var i = 0;
    var corner = PI/2;
    for(var level = 0; level < levels; level++){
            
            this.path[i] = pos.copy().add(0, level);
            this.path[i].z = level * z;
            this.path[i+1] = pos.copy().add(0, level);
            this.path[i+1].x += len;
            this.path[i+1].z = z;
            i += 2;
    }
    return this.path;
}

