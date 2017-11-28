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
   
    model[1] = loadImage("images/Ribbon01.jpg");
    model[2] = loadImage("images/ribbon02.jpg");
   


}

function setup() {

    var canvas = createCanvas(1100, 1100);
    for(var i = 1; i <2; i++){
        model[i].resize(1040,100);
    }
   
    windowscale = 1;


    palette = new Color();
    colors = palette.create();
    strokeWeight(2);
    


    layer = 0;
    maxlayers =2;
    var startlayerheight = 0; // 1
    var maxskirt = 2; //0 whithout skirt
    //startlayerheight = 2;  // JellyBox
    //print3D = new Print3D("JellyBox", "MAXXFLEX", "normal", maxlayers, startlayerheight, maxskirt);
    print3D = new Print3D("Anet", "SAT1N", "fine", maxlayers, startlayerheight, maxskirt);
    

    maxw =49;
    maxh =6;
    margew = 30;
    margeh = 200;
    pos = createVector(30, 200);

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

   if(layer == 0){

    createRaster();
    print3D.addPointToLayer(layer, createVector(20, 450));
    stroke(0);
    text(floor(grid.gridwidth) + " x " + floor(grid.gridheight),50, 50 )
   }
   else if (layer == 1) {
            
    
            createRibbon3();
            //print3D.addPointToLayer(layer, createVector(1080, 450));
    
            name = "Ribbon03"
            print3D.print(layer);
                 
    } else if (layer < maxlayers) {

       createRibbon3();
       //print3D.addPointToLayer(layer, createVector(1080, 450));
       print3D.print(layer);


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

    

    grid = new Grid(createVector(margew, 200));
    grid.init2vertical(1040, 100, maxw, maxh);
    grid.showMargin2(margew, margeh);
    grid.reordervertical();
    createRasterVertical();
    

    grid = new Grid(pos);
    grid.init2(1040, 100, maxw, maxh);
    //grid.showMargin2(margew, margeh);
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

function createRibbon(){
    var path =[];
   
    for(var i = 0; i < grid.p.length-1; i++){
        if(grid.p[i].x <= grid.p[i+1].x && grid.p[i].y == grid.p[i+1].y){    //van links naar rechts
            createPattern01(path, grid.p[i], grid.gridwidth/(layer+1), grid.gridheight/(layer+1));
        }
        else{
            createPattern02(path, grid.p[i], grid.gridwidth/(layer+1), grid.gridheight/(layer+1));
        }
    } 
    createPattern04(path, grid.p[grid.p.length-1], grid.gridwidth/(layer+1), grid.gridheight/(layer+1));
    print3D.addToLayer(layer, path);
}

function createPattern01(path, p, w, h){
    //van links naar rechts
    append(path, p.copy().add(-w,h));
    append(path, p.copy().add(-w/2,0));
    append(path, p.copy().add(0,-h));
    append(path, p.copy().add(w/2,0));
    append(path, p.copy().add(w,h));
   
}
function createPattern02(path, p, w, h){
    //van rechts naar links
   append(path, p.copy().add(w,h));
   append(path, p.copy().add(w/2,0));
   append(path, p.copy().add(0,-h));
   append(path, p.copy().add(-w/2,0));
   append(path, p.copy().add(-w,h));
}

function createRibbon2(){
    //circles on horizontallines
    var path =[];
    for(var i = 0; i < grid.p.length-1; i++){
        if(grid.p[i].x > grid.p[i+1].x && grid.p[i].y == grid.p[i+1].y){    //van links naar rechts
            createPattern03(path, grid.p[i], grid.gridwidth/(layer+1), grid.gridheight/(layer+1));
        }
        else{
            createPattern04(path, grid.p[i], grid.gridwidth/(layer+1), grid.gridheight/(layer+1));
        }
    } 
    //createPattern04(path, grid.p[grid.p.length-1], grid.gridwidth/(layer+1), grid.gridheight/(layer+1));
    print3D.addToLayer(layer, path);
}


function createPattern03(path, p, w, h){
    //van links naar rechts
    var r = p.copy();
    append(path, r.copy());
    for(var angle = PI; angle <= (TWO_PI) + PI; angle +=  (TWO_PI / 8)){
        r.x += w * cos(angle);
        r.y += h * sin(angle);
        append(path, r.copy());
    }
    
    
   
}
function createPattern04(path, p, w, h){
    //van rechts naar links
    var r = p.copy();
    append(path, r.copy());
    for(var angle =0; angle <= TWO_PI ; angle += (TWO_PI / 8)){
        r.x += w * cos(angle);
        r.y += h * sin(angle);
        append(path, r.copy());
    }
}


function createRibbon3(){
    //with image pattern
    show = true;
    grid = new Grid(createVector(margew, 200));
    grid.init2(1040, 100, maxw, maxh);
    grid.showMargin2(margew, margeh);
    //grid.maskImage2(margew, margeh, model1, colors[0]);
    grid.collectColors(30, 200, model[1], colors[0]);
    grid.reorder();
    grid.reorderc();
    //grid.showErrors();
    grid.colormarge = 30;
    
   var acolor = colors[0];
   var bcolor = color(255,255,0);

    var path = [];
    for(var i = 0; i < grid.c.length - 1;i++){
        if(grid.c[i].p.x <= grid.c[i+1].p.x && grid.c[i].p.y == grid.c[i].p.y){    //van links naar rechts
            if(this.palette.compare(grid.c[i].color,acolor,grid.colormarge)){
                createPattern05(path, grid.c[i].p,10,10);
            }
            else if(this.palette.compare(grid.c[i].color,bcolor,grid.colormarge)){
                //createPattern01(path, grid.c[i].p);
            }
            else{
                append(path, grid.c[i].p.copy());
            }
        }else{
            if(this.palette.compare(grid.c[i].color,acolor,grid.colormarge)){
              createPattern06(path, grid.c[i].p,10,10);
             }
             else if(this.palette.compare(grid.c[i].color,bcolor,grid.colormarge)){
                 //createPattern01(path, grid.c[i].p);
             }
             else{
                append(path, grid.c[i].p.copy());
             }
        }
    }
    print3D.addToLayer(layer, path);
   
}

function createPattern05(path, p, w, h){
    //van links naar rechts
    var r = p.copy();
    stroke(255,0,0);
    ellipse(r.x, r.y, 10,10);
    append(path, r.copy());
    for(var angle = PI; angle <= (TWO_PI) + PI; angle +=  (TWO_PI / 8)){  ???*** ANGLE VERANDEREN IN 0 T/M 8 ETC.
        r.x += (w * cos(angle));
        r.y +=( h * sin(angle));
        
        append(path, r.copy());
    }
    
    
   
}
function createPattern06(path, p, w, h){
    //van rechts naar links
    var r = p.copy();
    stroke(0, 0, 255);
    ellipse(p.x, p.y, w,h);
    append(path, r.copy());
    for(var angle =0; angle <= TWO_PI ; angle += (TWO_PI / 8)){
        r.x += w * cos(angle);
        r.y += h * sin(angle);
        append(path, r.copy());
    }
}

