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
    maxlayers = 4;
    var startlayerheight = 1; // 1
    var maxskirt = 3; //0 whithout skirt
    //startlayerheight = 2;  // JellyBox
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
        createVertexPattern(show, 0.05);
        print3D.print(layer);



    } else if (layer == 1) {
        createVertexPattern1(show, 0.05);
        print3D.print(layer);



    } else if (layer == 2) {
        createVertexPattern2(show, 0.05);
        print3D.print(layer);




    } else if (layer == 3) {
        createVertexPattern3(show, 0.05);
        print3D.print(layer);



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



function createVertexPattern(show, scalefactor) {
    this.path = [];
    var pos = createVector(350, 100);
    append(this.path, pos.copy());

    pos.add(0, 300);
    var sc = 0;

    for (var s = 20; s > 0; s--) {
        sc = s * scalefactor;
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
            vertex(-200, -150);
            vertex(-70, -290);
            vertex(-50, -290);
            vertex(0, -160);
            endShape();
        }

        append(path, createVector(0, -160).mult(sc).add(pos.x, pos.y));
        append(path, createVector(70, -300).mult(sc).add(pos.x, pos.y));
        append(path, createVector(100, -310).mult(sc).add(pos.x, pos.y));
        append(path, createVector(120, -170).mult(sc).add(pos.x, pos.y));
        append(path, createVector(160, 0).mult(sc).add(pos.x, pos.y));
        append(path, createVector(140, 250).mult(sc).add(pos.x, pos.y));
        append(path, createVector(100, 270).mult(sc).add(pos.x, pos.y));
        append(path, createVector(0, 100).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-120, 280).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-160, 300).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-220, 200).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-200, -150).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-70, -290).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-50, -290).mult(sc).add(pos.x, pos.y));

        append(path, createVector(0, -160).mult(sc).add(pos.x, pos.y));
        //append(path, createVector(0, 0).mult(sc).add(pos.x, pos.y));
        pop();


    }
    print3D.addToLayer(layer, path);
}

function createVertexPattern1(show, scalefactor) {
    this.path = [];
    var pos = createVector(350, 100);
    append(this.path, pos.copy());

    pos.add(0, 300);
    var sc = 0;

    for (var s = 20; s > 0; s--) {
        sc = s * scalefactor;
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
            vertex(-200, -150);
            vertex(-70, -290);
            vertex(-50, -290);
            vertex(0, -160);
            endShape();
        }
        //right clam
        append(path, createVector(0, 0).mult(sc).add(pos.x, pos.y));
        append(path, createVector(20, -150).mult(sc).add(pos.x, pos.y));
        append(path, createVector(70, -250).mult(sc).add(pos.x, pos.y));
        append(path, createVector(90, -250).mult(sc).add(pos.x, pos.y));
        append(path, createVector(110, -260).mult(sc).add(pos.x, pos.y));
        append(path, createVector(150, 0).mult(sc).add(pos.x, pos.y));
        append(path, createVector(130, 240).mult(sc).add(pos.x, pos.y));
        append(path, createVector(90, 260).mult(sc).add(pos.x, pos.y));
        append(path, createVector(10, 90).mult(sc).add(pos.x, pos.y));
        //left clam
        append(path, createVector(-20, 90).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-110, 280).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-150, 300).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-210, 200).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-190, -150).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-80, -260).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-60, -260).mult(sc).add(pos.x, pos.y));

        append(path, createVector(-20, -150).mult(sc).add(pos.x, pos.y));
        append(path, createVector(0, -150).mult(sc).add(pos.x, pos.y));
        pop();


    }
    print3D.addToLayer(layer, path);
}

function createVertexPattern2(show, scalefactor) {
    this.path = [];
    var pos = createVector(350, 100);
    append(this.path, pos.copy());

    pos.add(0, 300);
    var sc = 0;

    for (var s = 20; s > 0; s--) {
        sc = s * scalefactor;
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
            vertex(-200, -150);
            vertex(-70, -290);
            vertex(-50, -290);
            vertex(0, -160);
            endShape();
        }
        //right clam
        append(path, createVector(0, -130).mult(sc).add(pos.x, pos.y));
        append(path, createVector(60, -130).mult(sc).add(pos.x, pos.y));
        //append(path, createVector(100, -270).mult(sc).add(pos.x, pos.y));
        //append(path, createVector(90, -270).mult(sc).add(pos.x, pos.y));
        append(path, createVector(90, -220).mult(sc).add(pos.x, pos.y));
        append(path, createVector(130, 0).mult(sc).add(pos.x, pos.y));
        append(path, createVector(130, 200).mult(sc).add(pos.x, pos.y));
        append(path, createVector(110, 240).mult(sc).add(pos.x, pos.y));
        append(path, createVector(30, 60).mult(sc).add(pos.x, pos.y));
        //left clam
        append(path, createVector(-80, 90).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-100, 240).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-130, 260).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-190, 200).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-170, -130).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-60, -220).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-40, -220).mult(sc).add(pos.x, pos.y));

        append(path, createVector(-20, -130).mult(sc).add(pos.x, pos.y));
        append(path, createVector(0, -120).mult(sc).add(pos.x, pos.y));
        pop();

    }
    print3D.addToLayer(layer, path);
}

function createVertexPattern3(show, scalefactor) {
    this.path = [];
    var pos = createVector(350, 100);
    append(this.path, pos.copy());

    pos.add(0, 300);
    var sc = 0;

    for (var s = 20; s > 0; s--) {
        sc = s * scalefactor;
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
            vertex(-200, -150);
            vertex(-70, -290);
            vertex(-50, -290);
            vertex(0, -160);
            endShape();
        }
        //right clam
        append(path, createVector(0, -100).mult(sc).add(pos.x, pos.y));
        append(path, createVector(80, -110).mult(sc).add(pos.x, pos.y));
        //append(path, createVector(100, -270).mult(sc).add(pos.x, pos.y));
        //append(path, createVector(90, -270).mult(sc).add(pos.x, pos.y));
        // append(path, createVector(70, -180).mult(sc).add(pos.x, pos.y));
        append(path, createVector(110, 100).mult(sc).add(pos.x, pos.y));
        // append(path, createVector(110, 160).mult(sc).add(pos.x, pos.y));
        //append(path, createVector(130, 180).mult(sc).add(pos.x, pos.y));
        append(path, createVector(30, 110).mult(sc).add(pos.x, pos.y));
        //left clam
        //append(path, createVector(-40, 70).mult(sc).add(pos.x, pos.y));
        // append(path, createVector(-70, 210).mult(sc).add(pos.x, pos.y));
        // append(path, createVector(-100, 200).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-130, 160).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-110, -110).mult(sc).add(pos.x, pos.y));
        append(path, createVector(-80, -180).mult(sc).add(pos.x, pos.y));
        append(path, createVector(0, -180).mult(sc).add(pos.x, pos.y));
        // append(path, createVector(-20, -180).mult(sc).add(pos.x, pos.y));

        // append(path, createVector(-20, -130).mult(sc).add(pos.x, pos.y));
        // append(path, createVector(0, -100).mult(sc).add(pos.x, pos.y));

        pop();


    }
    print3D.addToLayer(layer, path);
}