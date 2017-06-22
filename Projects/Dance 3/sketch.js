"use strict";

//het idee is, een circle beweegt random door de ruimte, maar als hij op een punt komt 
// waar de choreography een beweging heeft gedefinieerd, dan voert hij deze uit.

var time;
var circles;
var movements;

var a,b,w,h;


var bgColor;

var osc;
var playing;
var angle;
var speed;
var hue, saturation, brightness, alpha;
var bg;
var acolor;
var hi;



function setup(){
    var canvas = createCanvas(windowWidth-31, windowHeight-3)
    canvas.parent(document.getElementById("divcanvas"));
    time = 0;

    hue = 0;
    saturation = 50;
    brightness = 50;
    alpha = 0;
    background(hue, saturation, brightness, alpha);
    strokeWeight(1);
    colorMode(HSB, 360, 100, 100, 100);
    rectMode(CENTER);
    
    speed = 5;
    angle = 0;
    playing = false;
     bg = color(0,50, 100);
    acolor = bg;

    a = width/2;
    b= height/2;
    w= width;
    h = height/2;
    hi = height /2;

osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(0);
  osc.start();

    frameRate(1);
    bg = color(0,50, 100);
   
   
    
}
function draw(){
   
    background(bg);
    acolor = color( hue, saturation, brightness, 100);
        
        
        push();
        translate(a,b);
        rotate(angle);
        stroke(acolor);
        line(-w,hi, w,hi);
        pop();
    var r = random(0,100);
    var s = random(0,10);
    speed = map((s % 4), 0, 10, 0.8, 5);

    if(r >= 0 && r <= 10){
        strokeWeight(map(r, 0,10, 0, 300));
        
        stroke(acolor);
        play(1, 196);
    }
    else if(r > 30 && r < 40){
       play(0.5, 246,49);
       saturation = map( r, 30, 40, 0, 100);
    }
    else if(r > 50 && r < 60){
        play(0.5, 261.63);
        hi = map(r, 50,60, 0, height);
        console.log(hi);
    }
     else if(r > 60 && r < 70){
       play(0.5, 329.63);
       brightness = map( r, 60, 80, 0, 100);
    }
    else if(r > 70 && r < 100){
       
       play(0, 0);

    }
    
    // if(frameCount % parseInt(random(20)) == 0){
    //     //for(i = 0 ; i < 10; i++){
    //      play(0.5, 523.25);
    //     //}
       
    // }
    // else if(frameCount %  parseInt(random(20)) == 0){
    //     play(0.5, 659.25);
        
    // }
    // else if(frameCount  %  parseInt(random(20)) == 0){
    //     play(0.5, 1369.91);
        
    // }
    // else if(frameCount %  parseInt(random(20)) == 0){
    //     play(0.5, 196);
        
    // }
    if(frameCount % 25 == 0){
        play(0.5, 349.23);
       
    }
   
    

    if(frameCount % 1 == 0){
         time++;
         playing = false;

    }

}
function randomColor(alpha){
    var c = color(random(255,0,0),random(0,255,0),random(0,0,255),alpha);
    return c;
}
function randomPos(w,h){
    var p = createVector(random(w),random(h));
    return p;
}
function mousePressed(){
    if (mouseX > 0 && mouseX < width && mouseY < height && mouseY > 0) {
        if (!playing) {
        // ramp amplitude to 0.5 over 0.1 seconds
        play(0.1);
        } else {
        // ramp amplitude to 0 over 0.5 seconds
        osc.amp(0, 0.5);
        playing = false;
        
        }
    }
}
function play(amp, freq){
    var a = 0.5;
    
    osc.freq(freq);
    osc.amp(a, 0.05);
    playing = true;
    
   
}
function startAnimation(){
    time = 1;

}
function keyPressed(){
    if(key == '1' ){
     
     
       startAnimation();
       time = 0;
    
}
if(key == '2' ){

    
    var f = map(mouseX, 0, width, 60,600);
     
     play(0.5, f);
     playing = false;
    
}

if(key == '3' ){

     speed += 10
     angle += 0.1;

     saturation = map(speed, 0,60,0,100 );

     frameRate(speed);
     playing = false;
    
}
if(key == '4' ){

    saturation = map(speed, 0,60,0,100 );

     speed -= 10;
     angle -= 0.1;
     frameRate(speed);
    
}
}

