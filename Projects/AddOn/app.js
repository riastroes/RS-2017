
"use strict";

var ok;
var myApp;


function setup() {
    var canvas = createCanvas(1200,1200);
    canvas.parent("divcanvas");
    myApp = new App();
    ok = true;
   
}
function draw(){
  background(255,230,230);
  stroke(0);
  strokeWeight(5);
  noFill();
   
   if(ok){
    if(myApp.ischanged){
      myApp.init();
    }
    
      myApp.draw();
    
   }
    
   
  
}
function App(){
  this.ischanged = true;

}

App.prototype.init = function(){
  ok = false;
    this.totlayerheight = 0;
    this.settings = [];
    this.layers = [];
    this.pos = createVector(0,0);
    changePosx();
    changePosy();
    changeLayers();
    this.printer = selectPrinter();
    this.material = selectMaterial();
    this.createLayers();
    this.createSpiral(this.pos.x,this.pos.y, 300, 30, 300);
  ok = true;
}
App.prototype.createLayers = function(){
  this.layers = [];
  this.settings =[];
  this.totlayerheight = 0;
  this.printer = selectPrinter();
  this.material = selectMaterial();
  
  for(var i = 0; i < this.maxlayers; i++){
    if(i ==0){
      this.settings[i] =new Settings(this.printer, this.material, "normal");
    }
    else{
      this.settings[i] =new Settings(this.printer, this.material, "double");
    }
    this.layers[i] = new Layer(i, this.settings[i], this.totlayerheight);
    this.totlayerheight += this.layers[i].layerheight;

  }
  this.gcode = new Gcode(this.settings[0]);
  this.ischanged = false;
}

App.prototype.createSpiral = function(x,y, radius, part, steps){
  
  for(var l = 0; l< this.layers.length; l++){
    this.layers[l].p = this.layers[l].p.concat(pointsOnSpiral(x,y, radius, part, steps));
  } 
}

App.prototype.generate = function(){
   for(var l = 0; l < this.layers.length; l++){
    this.layers[l].generate(this.gcode);
  } 
}
App.prototype.draw = function(){
  
  for(var l = 0; l < this.layers.length; l++){
    this.layers[l].draw();
    
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
  myApp.pos.x = parseInt(document.getElementById("inx").value);
  if(myApp.pos.x < 50 || myApp.pos.x > width - 50){
    myApp.pos.x = width/2;
  }
  myApp.ischanged = true;
}
function changePosy(){
  myApp.pos.y = parseInt(document.getElementById("iny").value);
  if(myApp.pos.y < 50 || myApp.pos.y > height - 50){
    myApp.pos.y = height/2;
  }
  myApp.ischanged = true;
}
function changeLayers(){
  myApp.maxlayers = parseInt(document.getElementById("inlayers").value);
  if(myApp.maxlayers>0 && myApp.maxlayers <= 10){
     myApp.ischanged = true;
  }
  else{
    document.getElementById("inlayers").value = 1;
    myApp.maxlayers = 1;
    myApp.ischanged = true;
  }
  
}
function selectPrinter(){
  var selmaterial = document.getElementById("selectmaterial");
  
  
  var printer = document.getElementById("selectprinter").value;
  if(printer == "Anet"){
   
    selmaterial.options.remove("PLAz");
    selmaterial.options.remove("SAT1N");
    selmaterial.options.remove("SAT2N");
    selmaterial.options.remove("SAT3N");

    var option1 = document.createElement("option");
    option1.text ="Satijn Zilver"
    option1.value =  "SAT1N";
    selmaterial.options.add(option1);

    var option2 = document.createElement("option");
    option2.text ="Satijn Goud"
    selmaterial.options.add(option2);
    option2.value =  "SAT2N";
    var option3 = document.createElement("option");
    option3.text ="Satijn Lavendel blauw"
    option3.value =  "SAT3N";
    selmaterial.options.add(option3);
    
  }
  else if(printer == "Ultimaker2+"){
    selmaterial.options.remove("PLAz");
    selmaterial.options.remove("SAT1N");
    selmaterial.options.remove("SAT2N");
    selmaterial.options.remove("SAT3N");
    var option1 = document.createElement("option");
    option1.text ="PLA zwart"
    option1.value =  "PLAz";
    selmaterial.options.add(option1);
   
  }
  return printer; 
   
}
function selectMaterial(){
   var material = document.getElementById("selectmaterial").value
   return material;
   
}

function downloadAddOn(){
  myApp.generate();
 
  myApp.gcode.generate(myApp.layers);
  myApp.gcode.save("AddOn");
}