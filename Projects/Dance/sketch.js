"use strict";
var pal;
var dancers;
var start;
var patronen;
var ritmes;
var errors;
var speed;
var cdancers;
var dancersIsChanged;
var ds_animation;
var danseres_st;
var danser;
var danser_m;
var movements;
var choreo;
var bg;
var paal;
var time;
var pg;

var mic;
var fft;
var totspectrum;
var gemspectrum;
var a;


function preload() {
  // specify width and height of each frame and number of frames
  //var sprite_danseres_staand = loadSpriteSheet('images/dansers staand.png',(1273/7), 270, 7);
  //ds_animation = loadAnimation(sprite_danseres_staand);
  bg = loadImage("Images/bgfoto.jpg");
  a = 0;
  paal = loadImage("Images/paal1.png");
  danseres_st =[];
  for(var i = 0; i < 17; i++){
      danseres_st.push(loadImage("Images/danseres" + i + ".png"));
  }
  danser =[];
  for(var i = 0; i < 8; i++){
      danser.push(loadImage("Images/danser0" + i + ".png"));
  }
  danser_m=[];
  for(var i = 0; i < 19; i++){
      danser_m.push(loadImage("Images/ydanser0" + i + ".png"));
  }
  

}


function setup(){
    var canvas = createCanvas(windowWidth-31, windowHeight-3)
    canvas.parent(document.getElementById("divcanvas"));
    mic = new p5.AudioIn();
    fft = new p5.FFT();
    
    mic.start();
    fft.setInput(mic);

    pg = createGraphics(width,210);
    pg.background(0,0);
 
    colorMode(HSB, 360, 100, 100, 100)
    errors = [];
    rectMode(CENTER);
    //imageMode(CENTER);

    pal = new Palette();
    pal.createRandom(10);
    pal.add(color(0));
    pal.add(color(255));
    for(var i = 0; i < 5; i++){
        pal.add(color(0,100 -(i*20), 80,50));
    }
    
    
//   var d = pixelDensity();
//   var tot = 4 * (paal.width * d) *
//       (paal.height * d);
//     paal.loadPixels();
//     for (var i = 0; i < tot; i+=4) {
//         if(paal.pixels[i+3] == 0){
//             paal.pixels[i] = 255;
//             paal.pixels[i+1] = 0;
//             paal.pixels[i+2] = 0;
//         }
//     }
//     paal.updatePixels();
   
    // ritmes =[];
    // ritmes[0] = new Ritme(8, [5,1,2]);
    // movements =[];
    // movements[0] = new Movement(8, [4,5,6] );
    // movements[1] = new Movement(8, [0,2,6] );

    // ritmes[1] = new Ritme(8, [1,1,1,1,1,1,1,1]);
    // movements[2] = new Movement(8, [0,1,2,3,4,4,5,6] );
    // movements[3] = new Movement(8, [7,8,9,10,11,12,12,11] );


    // ritmes[2] = new Ritme(8, [2,1,1,2,1,1]);
    // movements[4] = new Movement(8, [13,14,16,15,14,13]);

    // ritmes[3] = new Ritme(8, [3,1,3,1]);
    // movements[5] = new Movement(8,[0,1,0,1]);

    // start = 0;
    // patronen = [];
   // dancers = [];
    
   // cdancers = changeDancers();
    speed = changeSpeed();
    time = -1;
    
    

    //background
    // noStroke();
    // fill(pal.colors[0]);
    // rect(width/2,height/2,width,height);

    choreo = new Choreo();
    choreo.createAct(0);
    

  
    

}
function draw(){
    
    //background; wist het verleden maar er is nog wel een trace van het verleden, een herinner aan de voorgaande beweging
    // noStroke();
    // fill(pal.get(1));
    // rect(width/2,height/2,width,height);
    blendMode(BLEND)
    var top = map(sin(a),-1,1,0,20);
    image(bg,0,-top , width, height+top);
    a += 0.01;
    
    
    if(time >= 0){
        var spectrum = fft.analyze();
        totspectrum = 0;
        for (var i = 0; i<spectrum.length; i++) {
            totspectrum += spectrum[i];
        }
        gemspectrum = totspectrum / spectrum.length;
        
        pg.background(100,0,0,1);
        pg.noStroke();
        pg.fill(200,200,0,90);
        var m = constrain(gemspectrum, 0, pg.height);
        var h = map(m, 0, pg.height - top, 0,1);
        
        pg.ellipse(width/4, 100, 50 +m,50 + m);
        image(pg,0,-top, width, pg.height);
        noStroke();
        var acolor = lerpColor(color(0,100,100,30), color(40,100,100,30), h);
        fill(acolor);
        rect(width/2, height/2,width,height);

        

        if(choreo.maat >= 0 && choreo.maat < 2){
        
            choreo.showAct(0);
        }
        if(choreo.maat >=2 && choreo.maat < 4){
            choreo.createAct(1);
            choreo.showAct(1);
        }
        if(choreo.maat >=4 && choreo.maat < 8){
            choreo.createAct(2);
            choreo.showAct(2);
        }
        if(choreo.maat >=8 && choreo.maat < 9){
            choreo.createAct(3);
            choreo.showAct(3);
        }
        if(choreo.maat >=9 && choreo.maat < 11){
            choreo.createAct(4);
            choreo.showAct(4);
        }
        if(choreo.maat >=10 && choreo.maat < 12){
            choreo.createAct(5);
            choreo.showAct(5);
        }
        if(choreo.maat >=12 && choreo.maat < 14){
            choreo.createAct(6);
            choreo.showAct(6);
        }
        if(choreo.maat >=14 && choreo.maat < 16){
            choreo.createAct(7);
            choreo.showAct(7);
        }
        
        
    
        
        
        time++;
        choreo.maat = (parseInt(time/speed/choreo.maatsoort * 10))/10
        console.log(gemspectrum + "*");
        if(choreo.maat == 16){
            time = 0;
        }
        
    }
    blendMode(BLEND);
    image(paal, 0,0,width,height);
    showInfo();
    showErrors();
    
}

function startAnimation(){
    time = 0;

}



function changeSpeed(){
    speed = parseInt(document.getElementById("inspeed").value);
    speed = 60 - speed;
    return speed;
}


function showInfo(){
    
    if(errors.length == 0){
        fill(pal.colors[1]);
        stroke(0);
        strokeWeight(1);
        //text("dansers: " + cdancers,10, height - 60 );
        text("snelheid: " + frameRate().toFixed(0),10, height - 40 );
        text("speed: " + speed.toFixed(0),10, height - 20 );
        text("maat: " + choreo.maat, 10, 20);
    }
}
function showErrors(){
    for(var e =0; e < errors.length; e++){
        stroke(0);
        strokeWeight(1);
        text(errors[e], 10, height - (20+ (20 * e)));

    }
}
