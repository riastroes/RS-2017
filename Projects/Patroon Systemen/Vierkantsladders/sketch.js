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
        vierkantsladder3x();
        print3D.print(layer);
    }
    else{
        
        vierkantsladder3x();
        print3D.print(layer);
        print3D.stop();
        noLoop();
    }
    layer++;

}


function vierkantsladder3x(){
    // 3 patroonelementen  in een vierkant worden de hoeken naar binnen gebracht, deze lijnconstructie wordt  in ladders 2x geprint 
    // in de tweede layer worden fluffie geprinte spiralen geprint. 
    // wordt in 2 layers geprint
    var vierhoeksladder;
    for(var aantal = 0; aantal < 3; aantal++){
        start = createVector(200 + (aantal* 300),100); 
       
        print3D.addPointToLayer(layer, start, 0);
        if(layer == 0){
            vierhoeksladder = new VierhoeksLadder(createVector(200 + (aantal* 300),200), 60);
            print3D.addToLayer(layer, vierhoeksladder.create(false), 0.2);
         }
        else{
            // alleen in de tweede layer worden 'bloemen' geprint
            vierhoeksladder = new VierhoeksLadder(createVector(200 + (aantal* 300),200), 60);
            print3D.addToLayer(layer, vierhoeksladder.create(true), 0.2);
        }
        

    }

    
}
function driehoeksladders(size){
    //patroonelement  driehoeksladder met fluffie geprinte spiralen 
    var y = 200;
    var x;
    for(var aantal = 0; aantal < 3; aantal++){
        x = aantal * (width/4);
        var start = createVector((width/4) +x, 300 );
        if(aantal == 1){
            
            print3D.addPointToLayer(layer, start, 0);
            start = createVector((width/4) +x, 700 );
            print3D.addPointToLayer(layer, start, 0);

        }
        else{
            print3D.addPointToLayer(layer, start, 0);
            start = createVector((width/4) +x, 300 );
        }
       
        var a = start.copy().add(0,100 );
        var b = a.copy().add( ( size/2) , size  );
        var c = a.copy().add(-(size), size );
        var steps = 12;
        
        

        var driehoeksladder = new DriehoeksLadder(a,b,c, steps);
        print3D.addToLayer(layer, driehoeksladder.create(size/2), 0.2);
        print3D.addPointToLayer(layer, start, 0);
        if(aantal == 1){
            start = createVector((width/4) +x, 300 );
            print3D.addPointToLayer(layer, start, 0);
        }
    }
}