/* Ria Stroes */
/* @updated: september 2017  */


var grid;
var pool;
var colors;
var a, b, c, d;
var maxw, maxh;
var pattern;
var list;
var c;
var a;
var windowscale;

function setup() {

    var canvas = createCanvas(1150, 1150);
    windowscale = ((windowWidth - 100) / 2) / 1150;


    maxw = 10;
    maxh = 10; //height / 35;

    pool = new Color();
    pool.random(10);
    colors = pool.colors;

    pattern = new Pattern((width / maxw), height / maxh);
    list = [];
    a = c = 0;
    frameRate(10);
    strokeJoin(MITER);
    strokeCap(SQUARE);
    textSize(30);

}

function draw() {
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
    noLoop();
}

function keyPressed() {
    loop();
}