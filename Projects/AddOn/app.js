
"use strict";
var printer;
var material;
var settings;
var gcode;
var pos;
var path;
var printer;
var printer3d;
var layers;
var maxlayers;
var ok;
var totlayerheight

function setup() {
    var canvas = createCanvas(1200,1200);
    canvas.parent("divcanvas");
    
    printer = document.getElementById("selectprinter").value;
    material = document.getElementById("selectmaterial").value;
    maxlayers = 5;
    totlayerheight = 0;
    initSettings(maxlayers);
    ok = true;
   
}
function draw(){
  background(255,230,230);
  stroke(0);
  strokeWeight(5);
  noFill();
   
   if(ok){
    for(var l = 0; l < layers.length; l++){
      printer3d.draw(layers[l]);
    }
   }
    
   
  
}


function initSettings(maxlayers){
    ok = false;
    
    pos = createVector(width/2, height/2, 0);
    createLayers(maxlayers);
    createSpiral(pos.x,pos.y, 100, 10, 50);
    printer3d = new Printer();
    ok = true;
}
function createLayers(maxlayers){
  layers = [];
  settings =[];
  totlayerheight = 0;
  for(var i = 0; i < maxlayers; i++){
    if(i ==0){
      settings[i] =new Settings(printer, material, "normal");
    }
    else{
      settings[i] =new Settings(printer, material, "double");
    }
    layers[i] = new Layer(i, settings[i], totlayerheight);
    totlayerheight += layers[i].layerheight;

  }
  gcode = new Gcode(settings[0]);
}



function createSpiral(x,y, radius, part, steps){
  var p =[];
  for(var l = 0; l< layers.length; l++){
    
    
       layers[l].p = p.concat(pointsOnSpiral(x,y, radius, part, steps));
       
   
    // for (var i = 0; i < layers[l].p.length; i++){
    //     point(layers[l].p[i].x, layers[l].p[i].y);
    // } 
  } 
}

function pointsOnSpiral(x,y, radius, stepsize, steps){
  var p = [];
  var r = radius;
  var s = TWO_PI / stepsize;
  var c = createVector(x,y,1);
  
  for( var i = 0; i < steps; i++){
    c.x = x + (r * cos(i * s));
    c.y = y + (r * sin(i * s));
    r -= radius/ steps;
    append(p, c.copy());
  }
  for( var i = steps; i >= 0; i--){
    c.x = x + (r * cos(i * s));
    c.y = y + (r * sin(i * s));
    r += radius/ steps;
    append(p, c.copy());
  }
  
 
  return p;
}
/***** INTERFACE *****/
function changePosx(){
  pos.x = parseInt(document.getElementById("inx").value);
  if(pos.x < 50 || pos.x > width - 50){
    pos.x = width/2;
  }
  initSettings(maxlayers);
}
function changePosy(){
  pos.y = parseInt(document.getElementById("iny").value);
  if(pos.y < 50 || pos.y > height - 50){
    pos.y = height/2;
  }
  initSettings(maxlayers);
}
function changeLayers(){
  maxlayers = parseInt(document.getElementById("inlayers").value);
  if(maxlayers>0 && maxlayers <= 10){
    initSettings(maxlayers);
  }
  else{
    document.getElementById("inlayers").value = 1;
    maxlayers = 1;
    initSettings(maxlayers);
  }
  
}
function selectPrinter(){
   printer = document.getElementById("selectprinter").value
   initSettings(maxlayers);
   
}
function selectMaterial(){
   material = document.getElementById("selectmaterial").value
   initSettings(maxlayers);
   
}

function downloadAddOn(){
  gcode.generate(layers ,printer3d);
  gcode.save("AddOn");
}