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
var a, b, c, d, e, f;
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

    print3D = new Print3D("Ultimaker2+", "PLA", "normal", maxlayers);




    start = createVector(100, 100);;
    end = createVector(100, 100);


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
        spiraal();
        print3D.print(layer);

    } else {
        spiraal();
        print3D.print(layer);
        print3D.stop();
        noLoop();

    }
    else{
       
    }
    layer++;

}

<<<<<<< Updated upstream
function cirkelpattern(size){
    var center = createVector( 550, 400);
    var size = 300;
    var bloem = new Bloem();
    print3D.addToLayer(layer, bloem.createPatroon(center, size, 81, 0, 0.2));
}

=======
function spiraal() {
    var start = createVector(550, 550);
    var path = [];
    var steps = 20;
    var g = 0;
    var size = 200;
    var corner = 0;
    var hoek = TWO_PI / ((steps * 2) + 1);
    var radius1 = size / 3;
    var radius2 = size;





    for (var i = 0; i <= (16 * 8) + 1; i++) {
        var p = start.copy();

        radius2 = size - (i * 1);
        radius1 = radius2 / 3;

        if (i % 4 == 0) {
            p.x += radius2 * cos((hoek * (i - 1)));
            p.y += radius2 * sin((hoek * (i - 1)));
        } else if (i % 4 == 1) {
            p.x += radius2 * cos((hoek * (i)));
            p.y += radius2 * sin((hoek * (i)));
        } else if (i % 4 == 2) {
            p.x += radius1 * cos((hoek * (i - 1)));
            p.y += radius1 * sin((hoek * (i - 1)));
        } else if (i % 4 == 3) {
            p.x += radius1 * cos((hoek * (i)));
            p.y += radius1 * sin((hoek * (i)));
        }


        append(path, p);



    }


    var max = path.length - 1;

    for (var i = 0; i < max; i++) {
        append(path, path[max - i]);
    }

    print3D.addToLayer(layer, path);
}
>>>>>>> Stashed changes

function flowersOnLangeLadder(layer, metbloemen) {
    var start = createVector(350, 250);
    var ll = new FlowersOnLangeLadder(start, 100);
    print3D.addToLayer(layer, ll.create2(metbloemen));
    print3D.addPointToLayer(layer, start.add(-40, 400));
    start = createVector(720, 650);

    var ll = new FlowersOnLangeLadder(start, 100);
    print3D.addToLayer(layer, ll.create2(metbloemen));


}

function driespiralen(layer) {
    var spiraal = new Spiraal();
    for (var aantal = 0; aantal < 3; aantal++) {
        var pos = createVector(300 + (aantal * 300), 210)
        print3D.addToLayer(layer, spiraal.create(pos, 100, 0, 4));
    }
}

function driehoekincirkel(metknoppen) {
    var driehoekincirkelladders;

    for (var aantal = 0; aantal < 3; aantal++) {
        start = createVector(200 + (aantal * 300), 150);
        end = createVector(200 + (aantal * 300), 200);
        var center = createVector(250 + (aantal * 300), 300);
        print3D.addPointToLayer(layer, start, 0);

        driehoekincirkelladders = new DriehoekInCirkelLadder(center, 120, -PI / 3 * 2);
        print3D.addToLayer(layer, driehoekincirkelladders.create2(metknoppen), 0.2);

        print3D.addPointToLayer(layer, start, 0);
    }


}

function driehoekmetpijlpunten(metknoppen){
    var driehoekincirkelladders;
    
    for(var aantal = 0; aantal < 3; aantal++){
        start = createVector(200 + (aantal* 300),150); 
        end = createVector(200 + (aantal* 300),200); 
        var center = createVector(250 + (aantal* 300),300); 
        print3D.addPointToLayer(layer, start, 0);
       
        driehoekincirkelladders = new DriehoekInCirkelLadder(center, 120, -PI/3*2);
        if(metknoppen){
            print3D.addToLayer(layer, driehoekincirkelladders.create2(true,true), 0.2);
        }else{
            print3D.addToLayer(layer, driehoekincirkelladders.create2(false, false), 0.2);
        }
        
        
        print3D.addPointToLayer(layer, start, 0);
    }
    

}
function tweehoekmetpijlpunten(metknoppen){
    var tweehoek;
    
    for(var aantal = 0; aantal < 3; aantal++){
        start = createVector(200 + (aantal* 300),150); 
        end = createVector(200 + (aantal* 300),200); 
        var center = createVector(250 + (aantal* 300),300); 
        print3D.addPointToLayer(layer, start, 0);
       
        tweehoek = new TweeHoeksLadder(center, 110, 0);
        if(metknoppen){
            print3D.addToLayer(layer, tweehoek.create2(true,true), 0.2);
        }else{
            print3D.addToLayer(layer, tweehoek.create2(false, false), 0.2);
        }
        
        
        print3D.addPointToLayer(layer, start, 0);
    }
    

}

function vierkantsladder3x() {
   // 3 patroonelementen  in een vierkant worden de hoeken naar binnen gebracht, deze lijnconstructie wordt  in ladders 2x geprint 
    // in de tweede layer worden fluffie geprinte spiralen geprint. 
    // wordt in 2 layers geprint
    var vierhoeksladder;
    for (var aantal = 0; aantal < 3; aantal++) {
        start = createVector(200 + (i * 300), 100);

        print3D.addPointToLayer(layer, start, 0);
        if (layer == 0) {
            vierhoeksladder = new VierhoeksLadder(createVector(200 + (i * 300), 200), 60);
            print3D.addToLayer(layer, vierhoeksladder.create(false), 0.2);
        } else {
            // alleen in de tweede layer worden 'bloemen' geprint
            vierhoeksladder = new VierhoeksLadder(createVector(200 + (i * 300), 200), 60);
            print3D.addToLayer(layer, vierhoeksladder.create(true), 0.2);
        }


    }


}

function driehoeksladders(size) {
    //patroonelement  driehoeksladder met fluffie geprinte spiralen 
    var y = 200;
    var x;
    for (var aantal = 0; aantal < 3; aantal++) {
        x = aantal * (width / 4);
        var start = createVector((width / 4) + x, 300);
        if (aantal == 1) {

            print3D.addPointToLayer(layer, start, 0);
            start = createVector((width / 4) + x, 700);
            print3D.addPointToLayer(layer, start, 0);

        } else {
            print3D.addPointToLayer(layer, start, 0);
            start = createVector((width / 4) + x, 300);
        }

        var a = start.copy().add(0, 100);
        var b = a.copy().add((size / 2), size);
        var c = a.copy().add(-(size), size);
        var steps = 12;



        var driehoeksladder = new DriehoeksLadder(a, b, c, steps);
        print3D.addToLayer(layer, driehoeksladder.create(size / 2), 0.2);
        print3D.addPointToLayer(layer, start, 0);
        if (aantal == 1) {
            start = createVector((width / 4) + x, 300);
            print3D.addPointToLayer(layer, start, 0);
        }
    }
}