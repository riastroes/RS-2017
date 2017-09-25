var canvas;
var app;
var loop;
var pop;
var ria;
var mode;
var p ;
var drop;

function preload(){
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
    canvas = createCanvas(windowHeight, windowHeight);
    canvas.parent(document.getElementById("divcanvas"));
    fullscreen();
    for(var i = 0; i < 4; i++){
        pop[i].resize(height/4,height/4);
    }
    for(var i = 0; i < 2; i++){
        ria[i].resize(height/4,height/4);
    }
    drop = [];
    p = 1;
    background(255);
    frameRate(10);
    blendMode(BLEND);
    image(ria[1],0,0);
    image(ria[1],width/4,0);
    image(ria[1],width/2,0);
    image(ria[1],(width/4)*3,0);
    blendMode(DARKEST);
    image(pop[0],0,0);
    image(pop[1],width/4,0);
    image(pop[2],width/2,0);
    image(pop[3],(width/4)*3,0);

}

function draw() {
    var f = frameCount % 100;
    loadPixels();
    var max = pixels.length/4;
    var a = random(0,max);

    append(drop, a);
    for(var i = 0 ; i < frameCount; i++){
        pixels[drop[i]+ (pixels.length / height) ] = pixels[drop[i]];
    }
    updatePixels();

   

    
}

