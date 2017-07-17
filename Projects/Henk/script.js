var canvas;
var henk;
var birds;
var issaved;
function preload(){
   
    
    zee = loadImage("images/zee.jpg");
    henk = loadImage("images/henk.jpg");
    birds = loadImage("images/birds.jpg");
}


function setup(){
  canvas = createCanvas(windowWidth*2, windowHeight*2);
  canvas.parent(document.getElementById("divcanvas") );
  //fullscreen();
    //zee.resize(width,height);
    //henk.resize(width,height);
    
    
    prepair(birds)
    
    
    issaved = false;
}
function draw(){
    if(frameCount == 1){
        blendMode(BLEND)
        image(zee, 0,0);
        blendMode(DIFFERENCE);
        image(henk, 0,0);
        blendMode(DIFFERENCE);
        image(birds, 0,0);
    }
}

function prepair(foto){
    foto.resize(6000,4000);
    foto.loadPixels();
    for(var i = 0; i < foto.pixels.length; i+=4){
       foto.pixels[i+3] = map((i/foto.pixels.length), 0, foto.pixels.length/4*2, 255,0);
    }
    foto.updatePixels();
}

function prepairBruto(){
    bruto.loadPixels();
    for(var i = 0; i < bruto.pixels.length; i+=4){
        if(bruto.pixels[i]<120){
            bruto.pixels[i+3] = 0;
        }
        if(bruto.pixels[i]<30 && bruto.pixels[i+3] == 0){
            bruto.pixels[i+3] = 255;
        }
        
    }
    bruto.updatePixels();
}
function mousePressed(){
    if(!issaved){
        
        saveCanvas("result","jpg");
        issaved = true;
    }
}






