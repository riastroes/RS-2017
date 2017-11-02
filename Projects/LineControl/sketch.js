/* Ria Stroes */
/* @updated: november 2017  
/* Het begin van kant.*/


var print3D;

var start; //set first point to start
var end; //set last point before you go to start
var maxlayers;
var layer;


var palette;
var colors;

var maxw, maxh;
var marge;
var offset;



var steps;
var rot;
var controls;
var a, b, c, d, e, f ;
var abde, bcef, cafd;

var miny = 70;
var maxy = 1050;
var minx = 50;
var maxx = 1050;

var issaved;


function setup() {

    var canvas = createCanvas(1100, 1100);
    windowscale = 1;

    background(200);
    layer = 0;
    maxlayers = 2;
    palette = new Color();
    
        
    palette.addHuePalette(60, 50, 50);
    colors = palette.colors;
    
    print3D = new Print3D("Anet", "ABS", "normal", maxlayers);

    
    /*ladder*/
   
    a = createVector(550, 300);
    d = createVector(550+10, 300);

    b = createVector(300, 625);
    e = createVector(300, 625+10);

    c = createVector(725-10, 725-10);
    f = createVector(725+10, 725+10);
    controls = [];

    start = a.copy().add(0,0,-1);
    end =  a.copy().add(100,0);

    
    layer = 0;
    steps = 21;
    
    issaved = false;




}

function mousePressed() {
    if (!issaved) {
        print3D.gcode.save("LC");
        issaved = true;
    }

}

function draw() {


    if (layer < 2) {

        //driehoeksladder
        
        var driehoeksladder = new DriehoeksLadder(a,b,c, steps);
        if(layer == 0){
            print3D.addPointToLayer(layer, start, 0);
        }
        print3D.addToLayer(layer, driehoeksladder.create(), 0.2);
        if(layer == maxlayers-1){
           // print3D.addPointToLayer(layer, end, 0.2); 
        }
        

    } else {
        print3D.print(start);
        noLoop();
    }
    layer++;





}