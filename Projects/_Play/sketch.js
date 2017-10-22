/*
Playground for small sketches.
copy this file and create a sketch.
*/
var sketches;
var palette;
var colors;
var fr;
var w, h;

function setup() {
    createCanvas(windowWidth, windowHeight);

    palette = new Color();

    // palette.addHuePalette(10, 10, 50);
    //palette.addSaturationPalette(10, 210, 35);
    //palette.addSaturationPalette(10, 60, 35);
    palette.addLightnessPalette(5, 210, 95);
    palette.addLightnessPalette(5, 60, 95);
    palette.setTransparency(70);

    colors = palette.colors;
    fr = 60;
    w = 10;
    h = 100;
    background(255);


    strokeWeight(0);
}

function draw() {
    //background(255, 70, 100, 10);
    var i = frameCount % colors.length;
    stroke(255);
    fill(colors[i]);
    var r = random(-5, width + 5);
    var rest = r % w;
    var t = random(-50, height + 50);
    var test = t % 100;
    rect(r - rest, t - test, w, h);




    if (frameCount >= 5000) {

        if (fr > 2) {
            fr--;
            h -= 1;
        }
        frameRate(fr);
    }
}

function growWhite() {
    loadPixels();
    for (var i = 0; i < pixels.length; i += 4) {
        if (i > 4) {
            if (pixels[i] == 255) {
                pixels[i][0] = 0;
                pixels[i][1] = 0;
                pixels[i][2] = 0;
                pixels[i][3] = 255;
            }
        }
    }
    updatePixels();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}