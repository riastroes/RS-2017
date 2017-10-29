/* Ria Stroes */
/* @updated: september 2017  */
/* op elke layer wordt op een grid een patroontje herhaald.
/* een patroontje bestaat uit een deelverzameling van een 5x5 aantal punten
*/


var grid;
var pool;
var colors;
var a, b, c, d;
var maxw, maxh;
var marge;
var offset;
var skirt;
var pattern;
var list;
var rlist;

var windowscale;

var settings;
var totlayerheight;
var layers;
var layer;
var maxlayers;
var l;
var issaved;
var model;
var ladder;
var steps;
var rot;
var controls;
var a, b, c, d;
var end, begin;

function setup() {

    var canvas = createCanvas(1100, 1100); 
    windowscale = 1;

    background(200);
    //frameRate(10);
    settings = new Settings("Anet", "PLAFLEX", "normal");
    layers = [];

    totlayerheight = 0;

    gcode = new Gcode(settings);


    skirt = [];
    skirt[0] = createVector(150, 50);
    skirt[1] = createVector(950, 50);
    skirt[2] = createVector(150, 70);
    skirt[3] = createVector(950, 70);


    begin = createVector(50, 200);
    


    /*brug*/
    // controls = [];
    // a = createVector(50, 300);
    // b = createVector(1050, 300);

    // controls[0] = createVector(595, -500);
    // controls[1] = createVector(595, -500);

    // c = createVector(50, 600); //150
    // d = createVector(1050, 600); //950

    // controls[2] = createVector(595, 1500);
    // controls[3] = createVector(595, 1500);

    
    /*ladder*/
    // controls = [];
    // a = createVector(50, 300);
    // b = createVector(1050, 300);

    // controls[0] = createVector(50, 300);
    // controls[1] = createVector(1050, 300);

    // c = createVector(50, 500); //150
    // d = createVector(1050, 500); //950

    // controls[2] = createVector(50, 500);
    // controls[3] = createVector(1050, 500);

     /*driehoek*/
     controls = [];
     a = createVector(50, 300);
     b = createVector(1050, 500);

     c = createVector(50, 700); //150
     d = createVector(1050, 500); //950
 
 
     controls[0] = createVector(50, 300);
     controls[1] = createVector(1050, 500);
 
     
     controls[2] = createVector(50, 300);
     controls[3] = createVector(1050, 500);
 


    end = createVector(1000, 200);
    
    layer = 0;
    maxlayers = 3;

    steps = 10
    rot = 0;
    issaved = false;




}

function mousePressed() {
    if (!issaved) {
        gcode.save("ladder");
        issaved = true;
    }

}

function draw() {



    //end skirt
    //patroon ZIGZAG
    if (layer < maxlayers) {


        ladder = new Ladder(a, b, c, d, controls);
        ladder.create(steps);
        //ladder.rotate(-rot);
        //ladder.shift(100, 500);
        layers[layer] = new Layer(layer, settings);
        if (layer == 0) {
            layers[layer].add(skirt);
        }
        layers[layer].add(ladder.path);
        layers[layer].generate(layer);
        layers[layer].draw(0);


        rot += 0.3


    } else {


        gcode.generateLayers();
        noLoop();
    }
    layer++;





}

function draw3() {
    push();
    translate(0, 0);
    scale(windowscale);

    if (layer == 0 && frameCount == 1) {

        //variatie: naar centrum trekken
        //grid.changeToCenter();
        grid.draw();

        //create skirt
        var y = 0;
        pattern.create(skirt[0], colors[2], 2);
        for (var x = 0; x < maxw; x++) {
            layers[layer].addPattern(offset, grid.p[x], pattern.path);
        }
        pattern.create(skirt[1], colors[2], 2);
        for (var x = maxw - 1; x >= 0; x--) {
            layers[layer].addPattern(offset, grid.p[x], pattern.path);
        }

    }

    //end skirt
    //patroon Rond

    for (var y = 1; y < maxh; y++) {
        pattern.create(list[0], colors[2], 2);
        for (var x = 0; x < maxw; x++) {
            layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
        }
        pattern.create(rlist[0], colors[2], 2);
        for (var x = maxw - 1; x >= 0; x--) {
            layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
        }
    }
    for (var x = 0; x < maxw; x++) {
        pattern.create(rlist[0], colors[2], 2);
        for (var y = maxh - 1; y > 0; y--) {
            layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
        }
        pattern.create(list[0], colors[2], 2);
        for (var y = 1; y < maxh; y++) {
            layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
        }
    }


    if (frameCount <= maxlayers) {

        //variatie: regelmatig of onregelmatig patroon rond
        layers[layer].change(-10, 10);
    }
    layers[layer].draw(colors[0]);
    layers[layer].generate(layer);

    if (frameCount == maxlayers) {
        gcode.generateLayers();
    }

    pop();
    layer++



}
//pattern functions

function draw2() {
    push();
    translate(50, 50);
    scale(windowscale);

    var set = 16;
    var max = set * 20;
    if (frameCount % max == max / set * 1) {

        pattern1(2, a);
        setText("pattern1", 10, 30, 20);
    } else if (frameCount % max == max / set * 2) {
        pattern2(2, 0);
        setText("pattern2-1", 10, 30, 20);
    } else if (frameCount % max == max / set * 3) {
        pattern2(2, 0.3);
        setText("pattern2-2", 10, 30, 20);
    } else if (frameCount % max == max / set * 4) {
        pattern2(2, PI / 2);
        setText("pattern2-3", 10, 30, 20);
    } else if (frameCount % max == max / set * 5) {
        pattern3(2, 0);
        setText("pattern3", 10, 30, 20);
    } else if (frameCount % max == max / set * 6) {
        pattern4(2, 0);
        setText("pattern4", 10, 30, 20);
    } else if (frameCount % max == max / set * 7) {
        pattern5(2, 0);
        setText("pattern5", 10, 30, 20);
    } else if (frameCount % max == max / set * 8) {
        pattern6(2, 0);
        setText("pattern6", 10, 30, 20);
    } else if (frameCount % max == max / set * 9) {
        pattern7(2, 0);
        setText("pattern7", 10, 30, 20);
    } else if (frameCount % max == max / set * 10) {
        pattern8(2, 0);
        setText("pattern8", 10, 30, 20);
    } else if (frameCount % max == max / set * 11) {
        pattern9(2, 0);
        setText("pattern9", 10, 30, 20);
    } else if (frameCount % max == max / set * 12) {
        pattern10(2, 0);
        setText("pattern10", 10, 30, 20);
    } else if (frameCount % max == max / set * 13) {
        pattern11(2, 0);
        setText("pattern11", 10, 30, 20);
    } else if (frameCount % max == max / set * 14) {
        pattern12(2, 0);
        setText("pattern12", 10, 30, 20);
    } else if (frameCount % max == max / set * 15) {
        pattern13(2, 0);
        setText("pattern13", 10, 30, 20);
    }
    pop();

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

function pattern1(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    background(255);
    c = 0;
    list = [15, 16];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }

    list = [18, 19];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }

    list = [0, 1, 12, 3, 4];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }

    list = [5, 6, 17, 8, 9];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }

    //c = 3;
    list = [10, 11, 22, 13, 14];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }

}

function pattern2(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    background(255);
    list = [0, 1, 16, 15];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
    list = [4, 3, 18, 19];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
    //c = 3
    list = [2, 22];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }

}

function pattern3(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    background(255);
    c = 0;

    list = [0, 20, 21, 16, 17, 22, 23, 13, 11, 1, 2, 7, 8, 3, 4];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {

        if (i % (maxw * 2) < maxw) {
            pattern.draw(grid.p[i], angle);
        } else {
            pattern.draw(grid.p[i], angle + (PI / 2));
        }

    }
}

function pattern4(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    background(255);
    c = 0;
    list = [0, 1, 6, 5, 15, 16, 21, 22, 17, 18, 13, 12, 7, 8, 3, 4];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
}

function pattern5(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    var pos = createVector(width / 2, height / 2);
    grid.maskCircle(pos, 300);
    background(255);
    c = 0;
    list = [0, 1, 6, 8, 3, 4];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
    list = [15, 16, 11, 13, 18, 19];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
}

function pattern6(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    var basegrid = new Grid();
    basegrid.init(2, 2);


    grid.maskCircles(basegrid.p, 100);
    background(255);
    c = 0;
    list = [0, 1, 16, 18, 3, 4];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }

}

function pattern7(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    var basegrid = new Grid();
    basegrid.init(2, 2);
    grid.maskCircles(basegrid.p, 300);
    background(255);

    c = 0;
    list = [0, 22, 4];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }

}

function pattern8(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    background(255);
    c = 0;
    list = [0, 22, 4];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle + PI);
    }

}

function pattern9(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    background(255);
    c = 0;
    list = [0, 1, 7, 12, 16, 15];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
    list = [4, 8, 13, 19];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }

}

function pattern10(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    background(255);
    c = 0;
    list = [1, 2, 8, 13, 17, 16, 10, 5, 1];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }


}

function pattern11(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    background(255);
    c = 0;
    list = [0, 6, 10, 16, 20];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
    list = [4, 8, 14, 18, 24];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }


}

function pattern12(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    background(255);
    c = 0;
    list = [0, 6, 10, 16, 20];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
    list = [4, 8, 14, 18, 24];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
    list = [1, 7, 11, 17, 21];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
    list = [3, 7, 13, 17, 23];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
}

function pattern13(weight, angle) {
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    background(255);
    c = 0;
    list = [0, 11, 20, 16, 18, 24, 13, 4, 8, 6, 0];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
}