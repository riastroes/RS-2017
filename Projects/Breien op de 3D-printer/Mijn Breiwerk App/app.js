
"use strict";
var printer;
var lapje;
var stitches;
var rows;

var pos;
var inrows;
var institches;
var inlayers;

var sliderStitches;
var sliderRows;
var sliderRadius;
var sliderForce;
var btnGenerate;
var btnSave;
var offset;  // wordt alleen gebruikt in de tekenfuncties
var checkShowGrid;
var checkShowPointDrawing;
var checkShowLineDrawing;
var linepath;
var ischanged;
var func;

function setup() {
    var canvas = createCanvas(1000,1000);
    canvas.parent("divcanvas");
    pos = createVector(0,0);
    offset = createVector(0,15);
    //background(255,0,0);
    
    pos = createVector(6,3);
    changeStitches();
    changeRows();
    changeLayers();
    selectPrinter();
    
    func ="none";
    
    checkShowGrid = document.getElementById("showgrid");
    checkShowPointDrawing = document.getElementById("showpointdrawing");
    checkShowLineDrawing = document.getElementById("showlinedrawing");
    sliderRadius = document.getElementById("sliderradius");
    sliderForce = document.getElementById("sliderforce");
    //institches =  floor(int(sliderStitches.value));
   // inrows = floor(int(sliderRows.value));
    linepath = [];
    
    
  
    lapje = new Lapje(printer, "PLA", "normal", pos, institches, inrows, checkShowGrid.checked  );
    if(checkShowGrid.checked){
      lapje.createGrid(3,3,3);
      lapje.showGrid();
    }
    //lapje.createGrid(3,3,3);
    //create();
   
}
function draw(){
  
  // fill(255);
  // noStroke();
  // rect(290,60, 60,40);
  // fill(0);
  
  
  showPath(checkShowPointDrawing.checked);
  
}
function showPath(showPoints){
   if(showPoints){
    stroke(255, 0, 0);
    noFill();
    for(var i =0; i < linepath.length; i++){
     
        strokeWeight(5);
        point(linepath[i].x + offset.x , linepath[i].y + offset.y);
      }
     
    }
  
}
function create(){
  background(255);
  var ina,inb;
  if(checkShowGrid.checked){
    lapje.createGrid(3,3,3);
    lapje.showGrid();
  }
  if(func.value == "none"){
    ina = document.getElementById("sliderradius").value;
    inb = document.getElementById("sliderforce").value;
  }
  else if(func.value == "circles"){
    ina = document.getElementById("sliderradius").value;
    inb = document.getElementById("sliderforce").value;
  }
  else if(func.value == "sin"){
    ina = document.getElementById("slidersinradius").value;
    inb = document.getElementById("slidersinforce").value;
  }
  else if(func.value == "cos"){
    ina = document.getElementById("slidercosradius").value;
    inb = document.getElementById("slidercosforce").value;
  }
  else if(func.value == "delete"){
    ina = document.getElementById("sliderdelete").value;
  }
  
  pos = createVector(6,3);
  if(inrows  > 0 && institches >0){
   
    
    lapje.create(checkShowGrid.checked, ischanged,institches, inrows,inlayers, linepath, func.value, ina, inb);
   
  }
  if(ischanged){
    
     changePrice();
   

    
  }
   ischanged = false;
}
function changePrice(){
    var price = 0;
    for(var l = 1; l <=inlayers; l++){
        price += institches * inrows  * (0.01 / l);
    }
    document.getElementById("price").innerHTML = price.toFixed(2) + " euro."
    if(document.getElementById("checkOphalen").checked){
      document.getElementById("postadres").required = false;
       w3.addClass("#divpostadres", "hidden");
      document.getElementById("emailprice").value = price.toFixed(2) + " euro."
    }
    else{
      w3.removeClass("#divpostadres", "hidden");
      document.getElementById("postadres").required = true;
      document.getElementById("emailprice").value = (price + 3.95).toFixed(2) + " euro."
    }
 }
function downloadKnitting(){

    if(!lapje.isSaved){
      lapje.save();
    }
}
function mousePressed(){
  if(mouseX > offset.x && mouseY > offset.y){
    var v = createVector(0,0);
    
    v.x = mouseX - offset.x;
    v.y = mouseY - offset.y;
    append(linepath, v);
    ischanged = true;
    
    create();
  } 
    
}
function keyPressed(){
  if(key == 'g' || key =='G'){
    create();
  }
  if(key == 'a' || key =='A'){
    this.printer = "Anet"; //default setting
  }
  if(key == 'u' || key =='U'){
    this.printer = "Ultimaker2+";
  }
}

function changeStitches(){
  document.getElementById("spinstitches").innerHTML = document.getElementById("sliderstitches").value;
  institches = floor(int(document.getElementById("sliderstitches").value));
  ischanged = true;
  
 
}
function changeRows(){
  document.getElementById("spinrows").innerHTML = document.getElementById("sliderrows").value;
  inrows = floor(int(document.getElementById("sliderrows").value));
  ischanged = true;
 }
function changeLayers(){
  document.getElementById("spinlayers").innerHTML = document.getElementById("sliderlayers").value;
  inlayers = floor(int(document.getElementById("sliderlayers").value));
  ischanged = true;
 }
function selectPrinter(){
   printer = document.getElementById("selectprinter")
}
function selectDisorderFunction(){
  func = document.getElementById("disorderfunctions")
  if(func.value =="none"){
    w3.addClass("#circlefunction", "hidden");
    w3.addClass("#sinfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#deletefunction", "hidden");
    linepath =[];
    create();
    
  }
  else if(func.value =="circles"){
    w3.removeClass("#circlefunction", "hidden");
    w3.addClass("#sinfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#deletefunction", "hidden");
    document.getElementById("spinradius").innerHTML = document.getElementById("sliderradius").value;
    document.getElementById("spinforce").innerHTML = document.getElementById("sliderforce").value;
    
  }
  else if(func.value =="sin"){
    w3.addClass("#circlefunction", "hidden");
    w3.removeClass("#sinfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#deletefunction", "hidden");

    document.getElementById("spinsinradius").innerHTML = document.getElementById("slidersinradius").value;
    document.getElementById("spinsinforce").innerHTML = document.getElementById("slidersinforce").value;
  }
  else if(func.value =="cos"){
    w3.addClass("#circlefunction", "hidden");
    w3.addClass("#sinfunction", "hidden");
    w3.removeClass("#cosfunction", "hidden");
    w3.addClass("#deletefunction", "hidden");
    document.getElementById("spincosradius").innerHTML = document.getElementById("slidercosradius").value;
    document.getElementById("spincosforce").innerHTML = document.getElementById("slidercosforce").value;
  }
  else if(func.value =="delete"){
    w3.addClass("#circlefunction", "hidden");
    w3.addClass("#sinfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.removeClass("#deletefunction", "hidden");
    document.getElementById("spindelete").innerHTML = document.getElementById("sliderdelete").value;
  }
}
function changeRadius(){
  document.getElementById("spinradius").innerHTML = document.getElementById("sliderradius").value;

}
function changeForce(){
  document.getElementById("spinforce").innerHTML = document.getElementById("sliderforce").value;

}
function changeSinus(){
  document.getElementById("spinsinradius").innerHTML = document.getElementById("slidersinradius").value;

}
function changeSinForce(){
  document.getElementById("spinsinforce").innerHTML = document.getElementById("slidersinforce").value;

}
function changeCosinus(){
  document.getElementById("spincosradius").innerHTML = document.getElementById("slidercosradius").value;

}
function changeCosForce(){
  document.getElementById("spincosforce").innerHTML = document.getElementById("slidercosforce").value;

}
function changeDelete(){
  document.getElementById("spindelete").innerHTML = document.getElementById("sliderdelete").value;

}
