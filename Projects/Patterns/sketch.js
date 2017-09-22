/* Ria Stroes */
/* @updated: september 2017  */
/* op elke layer wordt op een grid een patroontje herhaald.
/* per layer kan het patroon verschillen. Het patroon bestaat elke keer
/* uit een deelverzameling van een 5x5 aantal punten, waarvoor geld dat
/* elke verzameling een deelverzameling is van de vorige verzameling.
/* anders hangen hogere layers los in de lucht.
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
var l;
var issaved;



function setup() {

    var canvas = createCanvas(1100, 1100);     //X22O EN Y220 is het hoogste
    windowscale = 0.75;


    maxw = 10;
    maxh = 10; //height / 35;
    marge = 50;

    pool = new Color();
    pool.add(color(0, 0, 25));
    pool.add(color(0, 200, 200));
    colors = pool.colors;
    offset = createVector(0, 0);

    pattern = new Pattern((width - (2 * marge)) / maxw, (height - (2 * marge)) / maxh);
    list = [];
    rlist = [];
    totlayerheight = a = c = 0;
    background(200);
    //frameRate(10);
    strokeJoin(MITER);
    strokeCap(SQUARE);
    noFill();
    textSize(30);
    settings = new Settings("Ultimaker2+", "PLAz", "normal");
    layers = [];
    layers[0] = new Layer(0, settings);
    layer = 0;
    gcode = new Gcode(settings);

    grid = new Grid();
    grid.init(marge, maxw, maxh);
    

    skirt = [];



    // list[0] = [1, 13, 3, 16, 17, 22, 24];     //pattern2
    // list[1] = [1, 3, 16, 17];                 //pattern2


    //rlist[0] = [24, 22, 17, 16, 3, 13, 1];
    //rlist[1] = [17, 16, 3, 1];

    //      list[0] = [0,1,10,22,14,3,4 ];             //pattern3
    // list[1] = [20,21,2,23,24];                 //pattern3

    // rlist[0] = [4,3,14,22,10,1,0];            //pattern3
    // rlist[1] = [24,23,2,21,20];               //pattern3 */
    /*
    /* NOPPEN */


    skirt[0] = [5, 9];
    skirt[1] = [14, 10];

    list[0] = [5, 1, 2, 8, 9]; //pattern3
    list[1] = [10, 16, 17, 13, 14]; //pattern3 
    list[2] = [1, 5, 10, 16, 21]; //pattern3
    list[3] = [2, 8, 13, 17, 22]; //pattern3 

    rlist[0] = [9, 8, 2, 1, 5]; //pattern3
    rlist[1] = [14, 13, 17, 16, 10]; //pattern3 
    rlist[2] = [21, 16, 10, 5, 1]; //pattern3
    rlist[3] = [22, 17, 13, 8, 2]; //pattern3 


    issaved = false;
    


}



function draw() {
    push();
    translate(0,0);
    scale(windowscale);

    if (layer == 0 && frameCount == 1) {
        grid.changeToCenter();
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

        //end skirt

        for (var y = 1; y < maxh; y++) {
            pattern.create(list[0], colors[2], 2);
            for (var x = 0; x < maxw; x++) {
                layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
            }
            pattern.create(rlist[1], colors[2], 2);
            for (var x = maxw - 1; x >= 0; x--) {
                layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
            }
        }
        for (var x = 0; x < maxw; x++) {
            pattern.create(rlist[2], colors[2], 2);
            for (var y = maxh - 1; y > 0; y--) {
                layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
            }
            pattern.create(list[3], colors[2], 2);
            for (var y = 1; y < maxh; y++) {
                layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
            }
        }

    }
    if (frameCount == 1) {
        
       layers[layer].change(-10,10);
        
        layers[layer].draw( colors[0]);
        layers[layer].generate(layer);
        
        gcode.generateLayers();
        
    }
    pop();




    // for (var l = 0; l < 2; l++) {
    //     //de eerste twee lijnen worden horizontaal getekend.

    //     for (var y = 0; y < maxh; y++) {
    //         if (y % 2 == 1) {

    //             pattern.create(list[l], colors[0], 2);
    //             for (var i = 0; i < maxw; i++) {
    //                 pattern.addToLayer(layers[layer], grid.p[(maxw * y) + i], offset);
    //             }
    //         } else {
    //             if ((y == 0) && layer == 0) {

    //                 pattern.create(skirt[0], colors[2], 2);
    //                 for (var i = 0; i < maxw; i++) {
    //                     pattern.addToLayer(layers[layer], grid.p[(maxw * y) + i], offset);
    //                 }
    //                 pattern.create(skirt[1], colors[2], 2);
    //                 for (var i = maxw - 1; i >= 0; i--) {
    //                     pattern.addToLayer(layers[layer], grid.p[(maxw * y) + i], offset);
    //                 }
    //             } else if (y > 0) {
    //                 pattern.create(rlist[l], colors[0], 2);
    //                 for (var i = maxw - 1; i >= 0; i--) {
    //                     pattern.addToLayer(layers[layer], grid.p[(maxw * y) + i], offset);
    //                 }
    //             }
    //         }
    //     }
    // }

    // for (var l = 2; l < 4; l++) {
    //     //lijn 3 en vier worden verticaal getekend.
    //     for (var x = 0; x < maxw; x++) {
    //         if (x % 2 == 0) {

    //             pattern.create(list[l], colors[0], 2);
    //             for (var i = 1; i < maxh; i++) {
    //                 pattern.addToLayer(layers[layer], grid.p[(maxh * x) + i], offset);
    //             }
    //         } else {

    //             pattern.create(rlist[l], colors[0], 2);
    //             for (var i = maxh - 1; i >= 1; i--) {
    //                 pattern.addToLayer(layers[layer], grid.p[(maxh * x) + i], offset);
    //             }

    //         }
    //     }
    // }


    



    
    
    // if(frameCount % 10 == 0){
    //     layers[layer].draw( frameCount, colors[0]);
    // }
    

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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
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
    grid.init(maxw, maxh);
    background(255);
    c = 0;
    list = [0, 11, 20, 16, 18, 24, 13, 4, 8, 6, 0];
    pattern.create(list, colors[c], weight);
    for (var i = 0; i < grid.p.length; i++) {
        pattern.draw(grid.p[i], angle);
    }
}

function mousePressed() {
    if(!issaved){
        gcode.save("Patroon rond regelmatig " + maxw + "x" + maxh);
        issaved = true;
    }
    
}

