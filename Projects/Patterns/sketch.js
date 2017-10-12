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


function preload() {
    model = loadImage("images/drawing.png");
}

function setup() {

    var canvas = createCanvas(1100, 1100); //X22O EN Y220 is het hoogste
    windowscale = 1;
    model.resize(1000, 1000);



    maxw = 20;
    maxh = 20; //height / 35;
    marge = 50;

    pool = new Color();
    pool.add(color(255, 0, 0));
    pool.add(color(0, 0, 255));
    pool.add(color(0, 200, 200));
    colors = pool.colors;
    offset = createVector(0, 0);

    pattern = new Pattern((width - (2 * marge)) / maxw, (height - (2 * marge)) / maxh);
    //oversized pattern
    //pattern = new Pattern((width + 100) / maxw, (height + 100) / maxh);

    totlayerheight = a = c = 0;
    background(200);
    //frameRate(10);
    strokeJoin(MITER);
    strokeCap(SQUARE);
    noFill();
    textSize(30);
    settings = new Settings("Ultimaker2+", "PLAz", "fine");
    layers = [];
    maxlayers = 1;
    for (var f = 0; f < maxlayers; f++) {
        layers[f] = new Layer(f, settings);
    }

    layer = 0;
    gcode = new Gcode(settings);

    grid = new Grid();
    grid.init(marge, maxw, maxh);

    //grid.maskImage(marge, model);
    // grid.draw();
    // grid.reorder();


    skirt = [];
    skirt[0] = [5];
    skirt[1] = [9];

    list = [];
    rlist = [];

    list[0] = [15, 16, 1, 2, 17, 18, 13, 14];
    rlist[0] = [14, 13, 18, 17, 2, 1, 16, 15];
    list[1] = [20, 10, 7, 13, 17, 16, 21, 24];
    rlist[1] = [24, 21, 16, 17, 13, 7, 10, 20];
    list[1] = [10, 1, 3, 14, 23, 21, 10, 14];
    rlist[1] = [14, 10, 21, 23, 14, 3, 1, 10];

    issaved = false;


}

function mousePressed() {
    if (!issaved) {
        gcode.save("PRO" + maxw + "x" + maxh);
        issaved = true;
    }

}

function draw() {
    push();
    translate(0, 0);
    scale(windowscale);

    if (layer == 0) {

        //variatie: naar centrum trekken
        // grid.changeToCenter();
        image(model, marge, marge);
        grid.draw();

        //create skirt
        pattern.create(skirt[0], colors[2], 2);
        layers[layer].addPattern(offset, createVector(150, 30), pattern.path);
        pattern.create(skirt[1], colors[2], 2);
        layers[layer].addPattern(offset, createVector(900, 30), pattern.path);
        pattern.create(skirt[0], colors[2], 2);
        layers[layer].addPattern(offset, createVector(150, 50), pattern.path);
        pattern.create(skirt[1], colors[2], 2);
        layers[layer].addPattern(offset, createVector(900, 50), pattern.path);
        pattern.create(skirt[0], colors[2], 2);
        layers[layer].addPattern(offset, createVector(150, 60), pattern.path);

    }

    //end skirt
    //patroon ZIGZAG
    if (layer < maxlayers) {
        /*
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
        */
        for (var y = 1; y < maxh; y++) {
            pattern.create(list[1], colors[2], 2);
            for (var x = 0; x < maxw; x++) {
                layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
            }
            pattern.create(rlist[1], colors[2], 2);
            for (var x = maxw - 1; x >= 0; x--) {
                layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
            }
        }

        // for (var y = 1; y < maxh; y++) {
        //     pattern.create(list[4], colors[2], 2);
        //     for (var x = 0; x < maxw; x++) {
        //         layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
        //     }
        //     pattern.create(list[5], colors[2], 2);
        //     for (var x = maxw - 1; x >= 0; x--) {
        //         layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
        //     }
        // }

        //Ria

        // for (var i = 0; i < grid.p.length; i++) {
        //     //eerste
        //     if (i == 0 && grid.p[i].x < grid.p[i + 1].x) {
        //         pattern.create(list[10], colors[2], 2);
        //         layers[layer].addPattern(offset, grid.p[i], pattern.path);

        //     } else if (i == 0 && grid.p[i].x >= grid.p[i + 1].x) {
        //         pattern.create(list[7], colors[2], 2);
        //         layers[layer].addPattern(offset, grid.p[i], pattern.path);

        //     } else if (i == grid.p.length - 1 && grid.p[i].x > grid.p[i - 1].x) {
        //         //laatste naar rechts
        //         if (i % 3 == 0) {
        //             pattern.create(list[10], colors[2], 2);
        //         } else if (i % 3 == 1) {
        //             pattern.create(list[8], colors[2], 2);
        //         } else if (i % 3 == 2) {
        //             pattern.create(list[6], colors[2], 2);
        //         }
        //         layers[layer].addPattern(offset, grid.p[i], pattern.path);

        //     } else if (i == grid.p.length - 1 && grid.p[i].x <= grid.p[i - 1].x) {
        //         //laatste naar links
        //         if (i % 3 == 0) {
        //             pattern.create(list[7], colors[2], 2);
        //         } else if (i % 3 == 1) {
        //             pattern.create(list[9], colors[2], 2);
        //         } else if (i % 3 == 2) {
        //             pattern.create(list[11], colors[2], 2);
        //         }
        //         layers[layer].addPattern(offset, grid.p[i], pattern.path);

        //     } else if (grid.p[i].y == grid.p[i + 1].y && grid.p[i].x <= grid.p[i + 1].x) {
        //         //naar rechts
        //         if (i % 3 == 0) {
        //             pattern.create(list[10], colors[2], 2);
        //         } else if (i % 3 == 1) {
        //             pattern.create(list[8], colors[2], 2);
        //         } else if (i % 3 == 2) {
        //             pattern.create(list[6], colors[2], 2);
        //         }
        //         layers[layer].addPattern(offset, grid.p[i], pattern.path);

        //     } else if (grid.p[i].y == grid.p[i + 1].y && grid.p[i].x > grid.p[i + 1].x) {
        //         //naar links
        //         if (i % 3 == 0) {
        //             pattern.create(list[7], colors[2], 2);
        //         } else if (i % 3 == 1) {
        //             pattern.create(list[9], colors[2], 2);
        //         } else if (i % 3 == 2) {
        //             pattern.create(list[11], colors[2], 2);
        //         }
        //         layers[layer].addPattern(offset, grid.p[i], pattern.path);

        //     } else if (grid.p[i].y < grid.p[i + 1].y && grid.p[i].x > grid.p[i - 1].x) {
        //         //naaar rechts zijkant
        //         if (i % 3 == 0) {
        //             pattern.create(list[6], colors[2], 2);
        //         } else if (i % 3 == 1) {
        //             pattern.create(list[8], colors[2], 2);
        //         } else if (i % 3 == 2) {
        //             pattern.create(list[10], colors[2], 2);
        //         }
        //         layers[layer].addPattern(offset, grid.p[i], pattern.path);

        //     } else if (grid.p[i].y < grid.p[i + 1].y && grid.p[i].x <= grid.p[i - 1].x) {
        //         //naar links zijkant
        //         if (i % 3 == 0) {
        //             pattern.create(list[7], colors[2], 2);
        //         } else if (i % 3 == 1) {
        //             pattern.create(list[9], colors[2], 2);
        //         } else if (i % 3 == 2) {
        //             pattern.create(list[11], colors[2], 2);
        //         }
        //         layers[layer].addPattern(offset, grid.p[i], pattern.path);

        //     } else {
        //         console.log("vergeten");
        //     }


        // }

        //maartje

        // for (var i = 0; i < grid.p.length; i++) {
        //     //eerste
        //     if (i == 0 && grid.p[i].x < grid.p[i + 1].x) {
        //         pattern.create(list[22], colors[2], 2);
        //         layers[layer].addPattern(offset, grid.p[i], pattern.path);

        //     } else if (i == 0 && grid.p[i].x >= grid.p[i + 1].x) {
        //         pattern.create(list[23], colors[2], 2);
        //         layers[layer].addPattern(offset, grid.p[i], pattern.path);

        //     } else if (i == grid.p.length - 1 && grid.p[i].x > grid.p[i - 1].x) {
        //         //laatste naar rechts
        //         var max = verhaal.length;

        //         for (var m = 0; m < max; m++) {
        //             pattern.create(verhaal[m], colors[2], 2);
        //             layers[layer].addPattern(offset, grid.p[i], pattern.path);
        //         }


        //     } else if (i == grid.p.length - 1 && grid.p[i].x <= grid.p[i - 1].x) {
        //         var max = _verhaal.length;

        //         for (var m = 0; m < max; m++) {
        //             pattern.create(_verhaal[m], colors[2], 2);
        //             layers[layer].addPattern(offset, grid.p[i], pattern.path);
        //         }

        //     } else if (grid.p[i].y == grid.p[i + 1].y && grid.p[i].x <= grid.p[i + 1].x) {
        //         //naar rechts
        //         for (var m = 0; m < max; m++) {
        //             pattern.create(verhaal[m], colors[2], 2);
        //             layers[layer].addPattern(offset, grid.p[i], pattern.path);
        //         }

        //     } else if (grid.p[i].y == grid.p[i + 1].y && grid.p[i].x > grid.p[i + 1].x) {
        //         //naar links
        //         var max = _verhaal.length;

        //         for (var m = 0; m < max; m++) {
        //             pattern.create(_verhaal[m], colors[2], 2);
        //             layers[layer].addPattern(offset, grid.p[i], pattern.path);
        //         }

        //     } else if (grid.p[i].y < grid.p[i + 1].y && grid.p[i].x > grid.p[i - 1].x) {
        //         //naaar rechts zijkant
        //         for (var m = 0; m < max; m++) {
        //             pattern.create(verhaal[m], colors[2], 2);
        //             layers[layer].addPattern(offset, grid.p[i], pattern.path);
        //         }

        //     } else if (grid.p[i].y < grid.p[i + 1].y && grid.p[i].x <= grid.p[i - 1].x) {
        //         //naar links zijkant
        //         var max = _verhaal.length;

        //         for (var m = 0; m < max; m++) {
        //             pattern.create(_verhaal[m], colors[2], 2);
        //             layers[layer].addPattern(offset, grid.p[i], pattern.path);
        //         }


        //     else {
        //         console.log("vergeten");
        //     }


        // }



        /* zonder mask
                for (var y = 1; y < maxh; y++) {
                    pattern.create(list[4], colors[2], 2);
                    for (var x = 0; x < maxw; x++) {
                        layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
                    }
                    pattern.create(list[5], colors[2], 2);
                    for (var x = maxw - 1; x >= 0; x--) {
                        layers[layer].addPattern(offset, grid.p[(maxw * y) + x], pattern.path);
                    }
                }
        */


        //variatie: regelmatig of onregelmatig patroon rond
        //layers[layer].change(-10, 10);

        layers[layer].draw(colors[2]);
        layers[layer].generate(layer);


        layer++;
    } else {
        gcode.generateLayers();
        noLoop();
    }
    pop();





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