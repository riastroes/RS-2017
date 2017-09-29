var canvas;
var app;
var loop;
var pop;
var ria;
var mode;
var p;
var drop;
var d;

function preload() {
    pop = [];
    ria = [];

    pop[0] = loadImage("images/pop1.png");
    pop[1] = loadImage("images/pop2.png");
    pop[2] = loadImage("images/pop3.png");
    pop[3] = loadImage("images/pop4.png");

    ria[0] = loadImage("images/ria.png");
    ria[1] = loadImage("images/ria2.jpg");

}



function setup() {
    canvas = createCanvas(windowHeight, windowHeight / 4);
    canvas.parent(document.getElementById("divcanvas"));
    fullscreen();
    for (var i = 0; i < 4; i++) {
        pop[i].resize(height, height);
    }
    for (var i = 0; i < 2; i++) {
        ria[i].resize(height, height);
    }
    drop = [];
    p = 1;
    background(255);
    frameRate(10);
    blendMode(BLEND);
    image(ria[1], 0, 0);
    image(ria[1], width / 4, 0);
    image(ria[1], width / 2, 0);
    image(ria[1], (width / 4) * 3, 0);
    blendMode(DARKEST);
    image(pop[0], 0, 0);
    image(pop[1], width / 4, 0);
    image(pop[2], width / 2, 0);
    image(pop[3], (width / 4) * 3, 0);

    d = 4;

}

function draw() {
    var f = frameCount % 100;
    loadPixels();
    var max = round(pixels.length / (4 * d));
    var a = round(random(0, max));
    a = a - (a % 4);
    var nr = round(pixels.length / (height * 4));

    append(drop, a);
    if (frameCount < max) {
        for (var i = 0; i < drop.length; i += 4) {
            if (pixels[drop[i] + nr] > 200) {
                pixels[drop[i]] = 255; //pixels[drop[i] + nr];
                pixels[drop[i] + 1] = 0; //pixels[drop[i] + nr + 1];
                pixels[drop[i] + 2] = 0; //pixels[drop[i] + nr + 2];
                pixels[drop[i] + 3] = 255; //pixels[drop[i] + nr + 3];
            }
        }
    }
    updatePixels();




}