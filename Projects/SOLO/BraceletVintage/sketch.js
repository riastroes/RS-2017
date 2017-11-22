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
var model1, model2;
var name;



function preload() {
    model1 = loadImage("images/VintageBracelet5.png");
    model2 = loadImage("images/VintageBraceletbw5.png");
    

}

function setup() {

    var canvas = createCanvas(1100, 1100);
    windowscale = 1;
    

    palette = new Color();
    colors = palette.create();
    strokeWeight(2);


    layer = 0;
    maxlayers =4;
    var startlayerheight = 1; // 1
    var maxskirt = 4; //0 whithout skirt
    //startlayerheight = 2;  // JellyBox
    //print3D = new Print3D("JellyBox", "MAXXFLEX", "normal", maxlayers, startlayerheight, maxskirt);
    print3D = new Print3D("Anet", "PURECOPER", "normal", maxlayers, startlayerheight, maxskirt);
    name = "VintageBracelet"

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

    if (layer<3) {
        
                
                show = true;
                grid = new Grid();
                grid.init(marge, maxw, maxh);
                grid.showMargin(marge);
               // grid.maskColorImage(marge, model1, colors[2]);
               // grid.reorder();
               // grid.draw(colors[0]);
               
        
        
                
               createPattern4();
               print3D.print(layer);
        
        
        
            } 
    else if (layer<maxlayers) {

        
    //     show = true;
    //     grid = new Grid();
    //     grid.init(marge, maxw, maxh);
    //    // grid.showMargin(marge);
    //     grid.maskColorImage(marge, model2, colors[0]);
    //     grid.reorder();
    //     grid.draw(colors[2]);
        


        
    //     createPattern2();
    //     print3D.print(layer);



    } 
    else {
        print3D.stop();
        noLoop();
    }
    layer++;

}

function createPattern1(){
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
            append(path, p.copy().add(-6,-9));
            append(path, p.copy().add(0,2));
            append(path,  p.copy().add(6,4));
            append(path,  p.copy().add(3,9));
            append(path,  p.copy().add(1,9));
        }
        else{  // van rechts naar links
            p = grid.p[i].copy();
            if(abs(grid.p[i].x - grid.p[i-1].x) >grid.gridsize){
                p.z = -1;
            }
            append(path, p.copy());
            p.z = 0;
            append(path, p.copy().add(0,-9));
            append(path, p.copy().add(6,-9));
            append(path, p.copy().add(0,2));
            append(path, p.copy().add(-6,4));
            append(path,  p.copy().add(-3,9));
            append(path,  p.copy().add(-1,9));
        }
    }
    var last = path[path.length-1].copy();
    last.y = 100;
     append(path, last.copy());
    last.x = 50;
    append(path, last.copy());
    last.add(0, -300)
    append(path, last.copy());
    print3D.addToLayer(layer, path);

}

function createPattern2(){
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
            append(path, p.copy().add(-5,-5));
            append(path, p.copy().add(-9,0));
            append(path,  p.copy().add(-5,5));
            append(path,  p.copy().add(0,9));
            append(path,  p.copy().add(5,5));
            append(path,  p.copy().add(9,0));
            append(path,  p.copy().add(5,-5));
            append(path,  p.copy().add(0,-9));
        }
        else{  // van rechts naar links
            p = grid.p[i].copy();
            if(abs(grid.p[i].x - grid.p[i-1].x) >grid.gridsize){
                p.z = -1;
            }
            append(path, p.copy());
            p.z = 0;
            append(path, p.copy().add(0,-9));
            append(path, p.copy().add(5,-5));
            append(path, p.copy().add(9,0));
            append(path, p.copy().add(5,5));
            append(path, p.copy().add(0,9));
            append(path, p.copy().add(-5,5));
            append(path, p.copy().add(-9,0));
            append(path, p.copy().add(-5,-5));
            append(path, p.copy().add(0,-9));
        }
    }
    var last = path[path.length-1].copy();
    last.y += 100;
     append(path, last.copy());
    last.x = 50;
    append(path, last.copy());
    last.add(0, -300)
    append(path, last.copy());
    print3D.addToLayer(layer, path);

}
function createPattern3(){
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
            append(path, p.copy().add(3,-9));
            append(path, p.copy().add(-3,9));
            
           
        }
        else{  // van rechts naar links
            p = grid.p[i].copy();
            if(abs(grid.p[i].x - grid.p[i-1].x) >grid.gridsize){
                p.z = -1;
            }
            append(path, p.copy());
            p.z = 0;
            append(path, p.copy().add(-3,9));
            append(path, p.copy().add(3,-9));
            
            
        }
    }
    var last = path[path.length-1].copy();
    last.y += 100;
     append(path, last.copy());
    last.x = 50;
    append(path, last.copy());
    last.add(0, -300)
    append(path, last.copy());
    print3D.addToLayer(layer, path);

}
function createPattern4(){
    var path = [];
    var g = createVector(100,500);
    var a = createVector(200,500);
    var b = createVector(400,550);
    var c = createVector(550,550);
    var d = createVector(700,550);
    var e = createVector(900,600);
    var f = createVector(1000,600);
    
    createEllipse(path, g, 50,50, 12, PI);
    createEllipse(path, a, 50,50, 12, PI);
    createEllipse(path, b, 170,70, 22, PI);
    createEllipse(path, c, 170,170, 32, PI);
    createEllipse(path, d, 170,70, 22, PI);
    createEllipse(path, e, 50,50, 12, PI);
    createEllipse(path, f, 40,40, 12, PI);
    



    var last = path[path.length-1].copy();
    last.y += 100;
    append(path, last.copy());
    last.x = 50;
    append(path, last.copy());
    last.add(0, -300)
    append(path, last.copy());
    print3D.addToLayer(layer, path);
}
function createEllipse(path, pos, w, h, steps, angle){
    var p; 
   
    
    for(var step = 0; step <steps; step++ ){
        var hoek = step * (TWO_PI/ (steps-1))
        p =  pos.copy();
        p.z = -1;
        append(path, p.copy());
        p.z = 0;
        p.x += w * cos(hoek + angle);
        p.y += h * sin(hoek + angle);
        createSmallEllipse(path, p, 20, 20, 12, PI);
        createSmallEllipse(path, p, 10, 10, 12, PI);
        append(path, p.copy());
    }
    
   
    
}
function createSmallEllipse(path, pos, w, h, steps, angle){
    var p; 
   
    
    for(var step = 0; step <steps; step++ ){
        var hoek = step * (TWO_PI/ (steps-1))
        p =  pos.copy();
        p.x += w * cos(hoek + angle);
        p.y += h * sin(hoek + angle);
        append(path, p.copy());
    }
    
   
    
}

