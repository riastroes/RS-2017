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
var model1, model2, model3, model4;
var name;



function preload() {
    model1 = loadImage("images/mossel.jpg");

}

function setup() {

    var canvas = createCanvas(850, 850);
    windowscale = 1;
    model1.resize(850, 850);

    palette = new Color();
    colors = palette.create();


    layer = 0;
    maxlayers = 1;
    var startlayerheight = 2; // 1
    var maxskirt = 3; //0 whithout skirt
    //print3D = new Print3D("JellyBox", "MAXXFLEX", "normal", maxlayers, startlayerheight, maxskirt);
    print3D = new Print3D("Anet", "PETGCARBON", "normal", maxlayers, startlayerheight, maxskirt);
    name = "clams"

    maxw = 100;
    maxh = 100;
    marge = 50;
    grid = new Grid();
    grid.init(marge, maxw, maxh);
    //grid.maskCircle(createVector(500, 500), 300);
    //image(model, marge, marge);
    grid.showMargin(marge);
    grid.maskImage(marge, model1);
    grid.reorder();
    //grid.draw();


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

        //variatie: naar centrum trekken
        // grid.changeToCenter();
        //image(model, marge, marge);
        //grid.draw();

        //createClams("Irregular10Random3Thick5", false);
        show = true;
        createVertexPattern(show);
        print3D.print(layer);



    } else if (layer < maxlayers) {



    } else {
        print3D.stop();
        noLoop();
    }
    layer++;

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

function createClams(aname, showdesign) {
    name = "necklace" + aname;

    switch (aname) {

        case "Irregular10Random2Thick5":
            {
                for (var i = 0; i < grid.p.length; i++) {
                    if (random(2) < 1) {
                        var radius = random(5, 10);
                        if (showdesign) {
                            stroke(colors[0]);
                            ellipse(grid.p[i].x, grid.p[i].y, radius, radius);
                        }
                        var path;
                        var z = 0;
                        for (var t = 0; t < 5; t++) {
                            z += 0.2;
                            path = createPattern(grid.p[i], radius - t, radius, z);
                            print3D.addToLayer(layer, path);
                        }

                    }

                }
                break;
            }
        case "Irregular10Random3Thick5":
            {
                for (var i = 0; i < grid.p.length; i++) {
                    if (random(3) < 1) {
                        var radius = random(5, 10);
                        if (showdesign) {
                            stroke(colors[0]);
                            ellipse(grid.p[i].x, grid.p[i].y, radius, radius);
                        }
                        var path;
                        var z = 0;
                        for (var t = 0; t < 5; t++) {
                            z += 0.2;
                            path = createPattern(grid.p[i], radius - t, radius, z);
                            print3D.addToLayer(layer, path);
                        }

                    }

                }
                break;
            }
        case "Irregular20Random3Thick5":
            {
                for (var i = 0; i < grid.p.length; i++) {
                    if (random(3) < 1) {
                        var radius = random(5, 20);
                        if (showdesign) {
                            stroke(colors[0]);
                            ellipse(grid.p[i].x, grid.p[i].y, radius, radius);
                        }
                        var path;
                        var z = 0;
                        for (var t = 0; t < 5; t++) {
                            z += 0.2;
                            path = createPattern(grid.p[i], radius - t, radius, z);
                            print3D.addToLayer(layer, path);
                        }

                    }

                }
                break;
            }


    }

}

function createPattern(pos, radius, steps, z) {
    if (z == undefined) {
        z = 0;
    }
    this.path = [];
    var i = 0;
    var corner = PI / 2;
    for (var angle = 0; angle <= TWO_PI; angle += (TWO_PI / steps)) {
        this.path[i] = pos.copy();
        this.path[i].x += radius * cos(angle + corner);
        this.path[i].y += radius * sin(angle + corner);
        this.path[i].z = z;
        i++;
    }
    return this.path;
}

function createCurvedVertexPattern() {
    var pos = createVector(350, 400);
    this.path = [];
    for (var s = 0; s < 10; s++) {
        stroke(0);
        noFill();
        push();
        translate(pos.x, pos.y);
        scale(s * 0.1);

        ellipse(0, -200, 10, 10);
        beginShape();
        curveVertex(0, -160);
        curveVertex(0, -160);
        curveVertex(80, -300);
        curveVertex(160, 0);
        curveVertex(100, 150);
        curveVertex(0, 100);
        curveVertex(-160, 300);
        curveVertex(-80, -300);
        endShape(CLOSE);



        pop();
    }

}

function createVertexPattern(show) {
    this.path = [];
    var pos = createVector(350, 100);
    append(this.path, pos.copy());

    pos.add(0, 300);
    var sc = 0;

    for (var s = 20; s > 0; s--) {
        sc = s * 0.05;
        stroke(colors[2]);
        noFill();
        push();
        translate(pos.x, pos.y);
        scale(sc);
        if (show) {

            beginShape();
            vertex(0, -160);
            vertex(70, -300);
            vertex(100, -310);
            vertex(120, -270);
            vertex(160, 0);
            vertex(140, 250);
            vertex(100, 270);
            vertex(0, 100);
            vertex(-120, 280);
            vertex(-160, 300);
            vertex(-220, 200);
            vertex(-120, -200);
            vertex(-70, -290);
            vertex(-50, -290);
            vertex(0, -160);
            endShape();
        }
        append(path, createVector(0, -160).mult(sc).add(pos.x, pos.y));
        append(path, createVector(70, -300).mult(sc).add(pos.x, pos.y));
        append(path, createVector(100, -310).mult(sc).add(pos.x, pos.y));
        append(path, createVector(120, -270).mult(sc).add(pos.x, pos.y));
        append(path, createVector(160, 0).mult(sc).add(pos.x, pos.y));
        append(path, createVector(140, 250).mult(sc).add(pos.x, pos.y));
        append(path, createVector(100, 270).mult(sc).add(pos.x, pos.y));
        append(path, createVector(0, 100).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-120, 280).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-160, 300).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-220, 200).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-120, -200).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-70, -290).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-50, -290).mult(sc).add(pos.x, pos.y));

        append(path, createVector(0, -160).mult(sc).add(pos.x, pos.y));

        pop();

        print3D.addToLayer(layer, path);
    }

}