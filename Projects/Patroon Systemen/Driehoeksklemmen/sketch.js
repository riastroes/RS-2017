/* Ria Stroes */
/* @updated: november 2017  
/* patroon systemen
/* Driehoeksklemmen */


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
    maxlayers = 3;
    palette = new Color();
    
        
    //palette.addHuePalette(60, 50, 50);
    palette.add(color(60, 50, 50));
    palette.add(color(90, 50, 50));
    palette.add(color(120, 50, 50));
    palette.add(color(160, 50, 50));
    palette.add(color(190, 50, 50));
    
    colors = palette.colors;
    
    print3D = new Print3D("Anet", "ABS", "normal", maxlayers);

    
   
   
    start = createVector(100,100);;  
    end =  createVector(100,100);

    
    layer = 0;
    steps = 21;
    
    issaved = false;

    
    print3D.start();

}

function mousePressed() {
    if (!issaved) {
        print3D.gcode.save("LC");
        issaved = true;
    }

}

function draw() {


    if (layer == 0) {

        //patroonelement  driehoeksladder met fluffie geprinte spiralen
        //wordt in 1 layer geprint
        
        driehoekincirkel(false);
        print3D.print(layer);
    }
    else if(layer == 1){
        //print3D.addPointToLayer(layer, start, 0);
                
        driehoekincirkel(true);
        print3D.print(layer);
    }
    else if(layer == 2){
        
        //print3D.pause(20);
        //driespiralen(layer);
        //print3D.print(layer);
        print3D.stop();
        noLoop();
    }
    layer++;





}
function driespiralen(layer){
    var spiraal = new Spiraal();
    for(var aantal = 0; aantal < 3; aantal++){
        var pos = createVector(300 + (aantal* 300),210)
        print3D.addToLayer(layer, spiraal.create(pos,100,0,4));
    }
}
function driehoekincirkel(metknoppen){
    var driehoekincirkelladders;
    
    for(var aantal = 0; aantal < 3; aantal++){
        start = createVector(200 + (aantal* 300),150); 
        end = createVector(200 + (aantal* 300),200); 
        var center = createVector(250 + (aantal* 300),300); 
        print3D.addPointToLayer(layer, start, 0);
       
        driehoekincirkelladders = new DriehoekInCirkelLadder(center, 120, -PI/3*2);
        print3D.addToLayer(layer, driehoekincirkelladders.create2(metknoppen), 0.2);
        
        print3D.addPointToLayer(layer, start, 0);
    }
    

}
function vierkantsladder3x(){
    // 3 patroonelementen  in een vierkant worden de hoeken naar binnen gebracht, deze lijnconstructie wordt  in ladders 2x geprint 
    // in de tweede layer worden fluffie geprinte spiralen geprint. 
    // wordt in 2 layers geprint
    var vierhoeksladder;
    for(var aantal = 0; aantal < 3; aantal++){
        start = createVector(200 + (i* 300),100); 
       
        print3D.addPointToLayer(layer, start, 0);
        if(layer == 0){
            vierhoeksladder = new VierhoeksLadder(createVector(200 + (i* 300),200), 60);
            print3D.addToLayer(layer, vierhoeksladder.create(false), 0.2);
         }
        else{
            // alleen in de tweede layer worden 'bloemen' geprint
            vierhoeksladder = new VierhoeksLadder(createVector(200 + (i* 300),200), 60);
            print3D.addToLayer(layer, vierhoeksladder.create(true), 0.2);
        }
        

    }

    function driehoeksladder(){
        //patroonelement  driehoeksladder met fluffie geprinte spiralen 
        var driehoeksladder = new DriehoeksLadder(a,b,c, steps);
        print3D.addToLayer(layer, driehoeksladder.create(), 0.2);
    }
}