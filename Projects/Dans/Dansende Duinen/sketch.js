"use strict";
var bg;
var mic;
var fft;
var time;


function preload() {

  bg = loadImage("Images/dancewiththenight.jpg");

}


function setup(){
    var canvas = createCanvas(windowWidth-31, windowHeight-3)
    canvas.parent(document.getElementById("divcanvas"));
    fullscreen();
    mic = new p5.AudioIn();
    fft = new p5.FFT();
    rectMode(CENTER);
    imageMode(CENTER);

    

    time = 0;
    image(bg,width/2,height/2, width, height);
    bg.loadPixels();
    
    for(var i = 0 ; i < bg.pixels.length; i++){
        if(i % 4 == 3){
            bg.pixels[i] = 20;
        }
    }
    bg.updatePixels();

   

    fill(255,0,0);
    noStroke(0);
    mic.start();
    fft.setInput(mic);

}
function draw(){
    blendMode(BLEND);
    if(frameCount%100 == 0){
        image(bg,width/2,height/2, width, height);
    }
    
    if(time > 0){
        var spectrum = fft.analyze();
        
        var d = pixelDensity;
        var w = 0;
        if(frameCount % 4000 < 250){                 
            blendMode(HARD_LIGHT);
        }
        else if(frameCount % 4000 < 500){       
            blendMode(BURN);
        }
        else if(frameCount % 4000 < 750){  
            blendMode(MULTIPLY);
        }
        else if(frameCount % 4000 < 1000){
            blendMode(LIGHTEST);
        }
        else if(frameCount % 4000 < 1250){
            blendMode(DARKEST);
        }
        else if(frameCount % 4000 < 1500){
            blendMode(DIFFERENCE);
        }
        else if(frameCount % 4000 < 1750){
            blendMode(DARKEST);
        }
        else if(frameCount % 4000 < 2000){
            blendMode(EXCLUSION);
           
        }
        else if(frameCount % 4000 < 2250){
            blendMode(BURN);
        }
        else if(frameCount % 4000 < 2500){
            blendMode(MULTIPLY);
        }
        else if(frameCount % 4000 < 2750){
            blendMode(SCREEN);
        }
        else if(frameCount % 4000 < 3000){
            blendMode(BURN);
        }
        else if(frameCount % 4000 < 3250){
            blendMode(OVERLAY);
        }
        else if(frameCount % 4000 < 3500){
            blendMode(SOFT_LIGHT);
        }
        else if(frameCount % 4000 < 3750){
            blendMode(BURN);
        }
        else{
            blendMode(ADD);
        }
        fill(200, 100,0,20);
        beginShape();
            vertex(width,height);
            vertex(0, height);
            
            for(var i = 0; i < spectrum.length; i += 5){
                var x = floor(map(i, 0, spectrum.length,0, width*50 ));
                var y = height - floor(map(spectrum[i],0, 255, 0,height/3*2));
                curveVertex(x,y);
            }
        endShape(CLOSE);


        fill(255, 100,0,20);
        beginShape();
            vertex(width,height);
            vertex(0, height);
            blendMode(BURN);
            for(var i = 0; i < spectrum.length; i += 5){
                var x = floor(map(i, 0, spectrum.length,0, width*20 ));
                var y = (height+50) - floor(map(spectrum[i],0, 255, 0,height/3*2));
                curveVertex(x,y);
            }
        endShape(CLOSE);
        
    }

   


}

function startAnimation(){
    time = 1;

}



function changeSpeed(){
    speed = parseInt(document.getElementById("inspeed").value);
    speed = 60 - speed;
    return speed;
}


