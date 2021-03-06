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
var show;

var issaved;
var model1, model2, model3, model4, model5, model6, model7;
var name;



function preload() {
    model1 = loadImage("images/coralleaf1.jpg");
    model2 = loadImage("images/coralleaf2.jpg");
    model3 = loadImage("images/coralleafNecklace1.png")
    model4 = loadImage("images/coralleafNecklace3.png")
    model5 = loadImage("images/coralleafNecklace4.png")
    model6 = loadImage("images/coralleaf3.jpg");
    model7 = loadImage("images/coralleaf4.jpg");
    model7 = loadImage("images/BraceletVintage.png");
    
    

}

function setup() {

    var canvas = createCanvas(1100, 1100);
    windowscale = 1;
    model3.resize(1000, 1000);
    model4.resize(1000, 1000);
    model5.resize(1000, 1000);
    model6.resize(1000, 1000);
    model7.resize(1000, 1000);

    palette = new Color();
    colors = palette.create();


    layer = 0;
    maxlayers =1;
    var startlayerheight = 1; // 1
    var maxskirt = 3; //0 whithout skirt
    //startlayerheight = 2;  // JellyBox
    //print3D = new Print3D("JellyBox", "MAXXFLEX", "normal", maxlayers, startlayerheight, maxskirt);
    print3D = new Print3D("Anet", "PETG", "fine", maxlayers, startlayerheight, maxskirt);
    name = "CoralLeaf"

    maxw = 100;
    maxh = 100;
    marge =50;
   

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


    if (layer<maxlayers) {

        //variatie: naar centrum trekken
        // grid.changeToCenter();
        //image(model, marge, marge);
        //grid.draw();

        //createClams("Irregular10Random3Thick5", false);
        show = true;
        grid = new Grid();
        grid.init(marge, maxw, maxh);
        //grid.maskCircle(createVector(500, 500), 300);
        //image(model, marge, marge);
        grid.showMargin(marge);
        grid.maskImage(marge, model7);
        grid.reorder();
        //grid.draw();

        console.log(grid.gridwidth);
        createCoralLeaf2();
        print3D.print(layer);



    } 
//    else if(layer <7) {
        
//                 //variatie: naar centrum trekken
//                 // grid.changeToCenter();
//                 //image(model, marge, marge);
//                 //grid.draw();
        
//                 //createClams("Irregular10Random3Thick5", false);
//                 show = true;
//                 grid = new Grid();
//                 grid.init(marge, maxw, maxh);
//                 //grid.maskCircle(createVector(500, 500), 300);
//                 //image(model, marge, marge);
//                 grid.showMargin(marge);
//                 grid.maskImage(marge, model4);
//                 grid.reorder();
//                 //grid.draw();
        
                
//                 createCoralLeaf();
//                 print3D.print(layer);
        
        
        
//             } 
    else {
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

function createCoralLeaf(){
    var path = [];
    var p;
    for(var i = 1; i < grid.p.length; i++){
       
        if(grid.p[i].x > grid.p[i-1].x){  // van links naar rechts
            p = grid.p[i].copy();
            if(abs(grid.p[i].x - grid.p[i-1].x) >grid.gridsize){
                p.z = -1;
            }
            append(path, p.copy());
            p.z = 0;
            append(path, p.copy().add(0,-6));
            append(path, p.copy().add(-6,-6));
            append(path, p.copy().add(0,2));
            append(path,  p.copy().add(6,4));
        }
        else{  // van rechts naar links
            p = grid.p[i].copy();
            if(abs(grid.p[i].x - grid.p[i-1].x) >grid.gridsize){
                p.z = -1;
            }
            append(path, p.copy());
            p.z = 0;
            append(path, p.copy().add(0,-6));
            append(path, p.copy().add(6,-6));
            append(path, p.copy().add(0,2));
            append(path, p.copy().add(-6,4));
        }
    }
    var last = path[path.length-1].copy();
    last.x = 0;
    append(path, last);
    print3D.addToLayer(layer, path);

}

function createCoralLeaf2(){
    var path = [];
    var p;
    for(var i = 1; i < grid.p.length; i++){
       
        if(grid.p[i].x > grid.p[i-1].x){  // van links naar rechts
            p = grid.p[i].copy();
            if(abs(grid.p[i].x - grid.p[i-1].x) >grid.gridsize){
                p.z = -1;
            }
            append(path, p.copy());
            p.z = 0;
            append(path, p.copy().add(0,-9));
            append(path, p.copy().add(-9,-7));
            append(path, p.copy().add(-9,9));
            append(path,  p.copy().add(3,4));
        }
        else{  // van rechts naar links
            p = grid.p[i].copy();
            if(abs(grid.p[i].x - grid.p[i-1].x) >grid.gridsize){
                p.z = -1;
            }
            append(path, p.copy());
            p.z = 0;
            append(path, p.copy().add(0,-9));
            append(path, p.copy().add(9,-7));
            append(path, p.copy().add(9,9));
            append(path, p.copy().add(-3,4));
        }
    }
    var last = path[path.length-1].copy();
    last.x = 0;
    append(path, last);
    print3D.addToLayer(layer, path);

}