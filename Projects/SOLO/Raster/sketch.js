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
    model = [];
   
    

}

function setup() {

    var canvas = createCanvas(1100, 1100);
    
    windowscale = 1;


    palette = new Color();
    colors = palette.create();
   
    


    layer = 0;
    maxlayers =1;
    var startlayerheight = 0; // 1
    var maxskirt = 2; //0 whithout skirt
    print3D = new Print3D("Anet", "PLAFLEX", "fine", maxlayers, startlayerheight, maxskirt);
    

    maxw =49;
    maxh =160;
    margew = 30;
    margeh = 200;
    pos = createVector(30, 200);

    print3D.start();

    issaved = false;
    name = "Raster";




}

function mousePressed() {
    if (!issaved) {
        print3D.gcode.save(name);
        issaved = true;
    }
}

function draw() {

   if(layer < maxlayers){

    createRaster();
    print3D.addPointToLayer(layer, createVector(20, 450));
    stroke(0);
    text(floor(grid.gridwidth) + " x " + floor(grid.gridheight),50, 50 )
   }
  
    if (layer+1 == maxlayers) {
        print3D.stop();
        noLoop();
    }
    layer++;

}

function createRaster(){
    
    //print3D.print(layer);
    print3D.addPointToLayer(layer, createVector(1080,150));

    

    grid = new Grid(pos);
    grid.init2vertical(1000, 800, maxw, maxh);
    //grid.showMargin2(margew, margeh);
    grid.reordervertical();
    createRasterVertical();
    

    grid = new Grid(pos);
    grid.init2(1000, 800, maxw, maxh);
    grid.reorder();
    createRasterHorizontal();
   

    print3D.print(layer);
}
function createRasterHorizontal(){
    var path =[];
   
    for(var i = 0; i < grid.p.length; i++){
        append(path, grid.p[i]);
    }
    print3D.addToLayer(layer, path);
}
function createRasterVertical(){
    var path =[];
    
    for(var i = 0; i < grid.p.length; i++){
        append(path, grid.p[i]);
    }
    print3D.addToLayer(layer, path);
}

