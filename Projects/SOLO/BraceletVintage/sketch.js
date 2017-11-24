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
    maxlayers = 4;
    var startlayerheight = 1; // 1
    var maxskirt = 3; //0 whithout skirt
    //startlayerheight = 2;  // JellyBox
    //print3D = new Print3D("JellyBox", "MAXXFLEX", "normal", maxlayers, startlayerheight, maxskirt);
    print3D = new Print3D("Anet", "PURECOPER", "normal", maxlayers, startlayerheight, maxskirt);
    

    maxw = 100;
    maxh = 100;
    marge = 50;


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


        show = true;
        grid = new Grid();
        grid.init(marge, maxw, maxh);
        grid.showMargin(marge);
        // grid.maskColorImage(marge, model1, colors[2]);
        // grid.reorder();
        // grid.draw(colors[0]);




        //createBracelet();
        // createSpiralWithHoleButton(200,350);
        // createSpiralWithHoleButton(400,350);
        // createSpiralWithHoleButton(600,350);

        createHanger();
       
        print3D.print(layer);



    } else if (layer < maxlayers) {


        //     show = true;
        //     grid = new Grid();
        //     grid.init(marge, maxw, maxh);
        //    // grid.showMargin(marge);
        //     grid.maskColorImage(marge, model2, colors[0]);
        //     grid.reorder();
        //     grid.draw(colors[2]);




        //     createPattern2();
        //     print3D.print(layer);



    } else {
        print3D.stop();
        noLoop();
    }
    layer++;

}



function createBracelet() {
    name = "VintageBracelet"
    var path = [];
    var g = createVector(100, 500);
    var a = createVector(200, 500);
    var b = createVector(400, 550);
    var c = createVector(550, 550);
    var d = createVector(700, 550);
    var e = createVector(900, 600);
    var f = createVector(1000, 600);

    createEllipse(path, g, 50, 50, 12, PI);
    createEllipse(path, a, 50, 50, 12, PI);
    createEllipse(path, b, 170, 70, 22, PI);
    createEllipse(path, c, 170, 170, 32, PI);
    createEllipse(path, d, 170, 70, 22, PI);
    createEllipse(path, e, 50, 50, 12, PI);
    createEllipse(path, f, 40, 40, 12, PI);




    var last = path[path.length - 1].copy();
    last.y += 100;
    append(path, last.copy());
    last.x = 50;
    append(path, last.copy());
    last.add(0, -300)
    append(path, last.copy());
    print3D.addToLayer(layer, path);
}

function createEllipse(path, pos, w, h, steps, angle,z) {
    var p;


    for (var step = 0; step < steps; step++) {
        var hoek = step * (TWO_PI / (steps - 1))
        p = pos.copy();
        p.z = -1;
        append(path, p.copy());
        p.z = z;
        p.x += w * cos(hoek + angle);
        p.y += h * sin(hoek + angle);
        //createSmallEllipse(path, p, 20, 20, 12, PI);
        createSmallEllipse(path, p, 10, 10, 12, PI);
        append(path, p.copy());
    }



}

function createPiEllipse(path, pos, w, h, steps, angle) {
    var p;


    for (var step = 0; step < steps; step++) {
        var hoek = step * (TWO_PI / ((steps * 3) - 1))
        p = pos.copy();
        p.z = -1;
        append(path, p.copy());
        p.z = 0;
        p.x += w * cos(hoek + angle);
        p.y += h * sin(hoek + angle);
        createSmallEllipse(path, p, 20, 20, 12, PI / 3);
        createSmallEllipse(path, p, 10, 10, 12, PI / 3);
        append(path, p.copy());
    }



}

function createSmallEllipse(path, pos, w, h, steps, angle, z) {
    var p;


    for (var step = 0; step < steps; step++) {
        var hoek = step * (TWO_PI / (steps - 1))
        p = pos.copy();
        p.x += w * cos(hoek + angle);
        p.y += h * sin(hoek + angle);
        p.z = z;
        append(path, p.copy());
    }



}

function createHanger() {
    var a = createVector(550, 350);
    var path = [];
    name = "VintageHanger";

    createEllipse(path, a, 10, 10, 12,0,0.4);
    createEllipse(path, a, 30, 30, 12, -PI/4*3,0.4);
    createEllipse(path, a, 50, 50, 24, -PI/4*3,0.8);
    createEllipse(path, a, 60, 60, 24, -PI/4*3,1.2);
    createEllipse(path, a, 80, 80, 36, -PI/4*3,1.6);
    createEllipse(path, a, 90, 90, 36, -PI/4*3,2);
    createEllipse(path, a, 115, 115,36, -PI/4*3,2.4);



    var last = path[path.length - 1].copy();
    last.y += 300;
    append(path, last.copy());
    last.x = 50;
    append(path, last.copy());
    last.add(0, -300)
    append(path, last.copy());
    print3D.addToLayer(layer, path);
}

// function createHanger() {
//     var a = createVector(550, 350);
//     var path = [];
//     name = "VintageHanger";


//     createPiEllipse(path, a, 50, 50, 12, PI);
//     createPiEllipse(path, a, 60, 60, 12, PI);
//     createPiEllipse(path, a, 70, 70, 12, PI);
//     createPiEllipse(path, a, 80, 80, 12, PI);
//     createPiEllipse(path, a, 90, 90, 12, PI);
//     createPiEllipse(path, a, 110, 110, 12, PI);
//     createPiEllipse(path, a, 120, 120, 12, PI);
//     createPiEllipse(path, a, 140, 140, 12, PI);
//     createPiEllipse(path, a, 160, 160, 12, PI);
//     createPiEllipse(path, a, 180, 180, 12, PI);




//     var last = path[path.length - 1].copy();
//     last.y += 300;
//     append(path, last.copy());
//     last.x = 50;
//     append(path, last.copy());
//     last.add(0, -300)
//     append(path, last.copy());
//     print3D.addToLayer(layer, path);
// }

function createSpiralButton(x, y) {
    var a = createVector(x, y);
    var path = [];
   
    name = "3VintageSpiralButton";
    //gesloten spiralen

    createSpiral(path, a, 60,60, 20, 10, 0);
    createSpiral(path, a, 60,60, 20, 9, 0.6);
    createSpiral(path, a, 60,60, 20, 8, 1.2);
    createSpiral(path, a, 60,60, 20, 7, 1.8);
    createSpiral(path, a, 60,60, 20, 6, 2.4);
    createSpiral(path, a, 60,60, 20, 5, 3.0);
    createSpiral(path, a ,60,60, 20, 4, 3.6);
    createSpiral(path, a, 60,60, 20, 3, 4.2);
    createSpiral(path, a, 60,60, 20, 2, 4.8);

   


    // var last = path[path.length - 1].copy();
    // last.y += 300;
    // append(path, last.copy());
    // last.x = 50;
    // append(path, last.copy());
    // last.add(0, -300)
    // append(path, last.copy());
    print3D.addToLayer(layer, path);
}

function createSpiral(path, pos, w, h, steps, loops,z) {
    var p = createVector(0,0);
    
    var ww, hh

    for (var step = (steps * loops)-1; step >=0; step--) {
        var hoek = step * (TWO_PI / ((steps) - 1));
       
        ww = (step /steps)*0.1 * w;
        hh = (step /steps)*0.1 * h;
       
        p.x = pos.x +( ww * cos(hoek));
        p.y = pos.y +( hh * sin(hoek));
        p.z = z;
        append(path, p.copy());
    }

    
    

}
function createSpiralWithHoleButton(x, y) {
    var a = createVector(x, y);
    var path = [];
   
    name = "3VintageSpiralButton";
    //gesloten spiralen

    createSpiralWithHole(path, a, 60,60, 20, 10, 0);
    createSpiralWithHole(path, a, 60,60, 20, 9, 0.6);
    createSpiralWithHole(path, a, 60,60, 20, 8, 1.2);
    createSpiralWithHole(path, a, 60,60, 20, 7, 1.8);
    createSpiralWithHole(path, a, 60,60, 20, 6, 2.4);
    createSpiralWithHole(path, a, 60,60, 20, 5, 3.0);
    createSpiralWithHole(path, a ,60,60, 20, 4, 3.6);
    createSpiralWithHole(path, a, 60,60, 20, 3, 4.2);
    createSpiralWithHole(path, a, 60,60, 20, 2, 4.8);

   


    // var last = path[path.length - 1].copy();
    // last.y += 300;
    // append(path, last.copy());
    // last.x = 50;
    // append(path, last.copy());
    // last.add(0, -300)
    // append(path, last.copy());
    print3D.addToLayer(layer, path);
}
function createSpiralWithHole(path, pos, w, h, steps, loops,z) {
    var p = createVector(0,0);
    
    var ww, hh

    for (var step = (steps * loops)-1; step >=0; step--) {
        var hoek = step * (TWO_PI / ((steps) - 1));
       
        ww = 20 + (step /steps)*0.1 * w;
        hh = 20 + (step /steps)*0.1 * h;
       
        p.x =  pos.x +( ww * cos(hoek));
        p.y =  pos.y +( hh * sin(hoek));
        p.z = z;
        append(path, p.copy());
    }

    
    

}