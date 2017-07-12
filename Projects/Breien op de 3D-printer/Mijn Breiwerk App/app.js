
"use strict";
var printer;
var material;
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
var totlayerheight;

function setup() {
    var canvas = createCanvas(1200,1200);
    canvas.parent("divcanvas");
    
    offset = createVector(0,15);
    pos = createVector(6,2);
    changeStitches();
    changeRows();
    changeLayers();
    selectPrinter();
    selectMaterial();
    totlayerheight = 0;
    func ="none";
    
    checkShowGrid = document.getElementById("showgrid");
    checkShowPointDrawing = document.getElementById("showpointdrawing");
    checkShowLineDrawing = document.getElementById("showlinedrawing");
    sliderRadius = document.getElementById("sliderradius");
    sliderForce = document.getElementById("sliderforce");
    //institches =  floor(int(sliderStitches.value));
   // inrows = floor(int(sliderRows.value));
    linepath = [];
    
    
  
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
  
  lapje = new Lapje(printer, material, "normal",  institches, inrows, checkShowGrid.checked  );
    if(checkShowGrid.checked){
      lapje.createGrid(2,2,2);
      lapje.showGrid();
    }
  var ina,inb;
  if(checkShowGrid.checked){
    lapje.createGrid(2,2,2);
    lapje.showGrid();
  }
  if(func.value == "none"){
    ina =0;
    inb =0;
  }
  else if(func.value == "circlesin"){
    ina = document.getElementById("sliderradiusin").value;
    inb = document.getElementById("sliderforcein").value;
  }
  else if(func.value == "circlesout"){
    ina = document.getElementById("sliderradiusout").value;
    inb = document.getElementById("sliderforceout").value;
  }
  else if(func.value == "sin"){
    ina = document.getElementById("slidersinradius").value;
    inb = document.getElementById("slidersinforce").value;
  }
  else if(func.value == "cos"){
    ina = document.getElementById("slidercosradius").value;
    inb = document.getElementById("slidercosforce").value;
  }
  else if(func.value == "vert"){
    ina = document.getElementById("slidervert").value;
  }
  else if(func.value == "hor"){
    ina = document.getElementById("sliderhor").value;
  }
  
  if(inrows  > 0 && institches >0){
   
    
    lapje.create(checkShowGrid.checked, ischanged,institches, inrows,inlayers, linepath, func.value, ina, inb);
   
  }
  if(ischanged){
    
     changePrice();
   

    
  }
   ischanged = false;
}
function changePosx(){
  pos.x = parseInt(document.getElementById("inx").value);
}
function changePosy(){
  pos.y = parseInt(document.getElementById("iny").value);
}
function changePrice(){
  if(institches >0 && inrows > 0 && inlayers >0){
    var price = 0;
    var mat = 0.01;
    if(material == "PLABRO"){
      mat = 0.015;
    }

   
    price = institches * inrows  * mat * inlayers;
    
    
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
  
 }

function downloadKnitting(){

    if(!lapje.isSaved){
      lapje.save();
    }
    //document.location.href ="#email";
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
  changePrice();
 
}
function changeRows(){
  document.getElementById("spinrows").innerHTML = document.getElementById("sliderrows").value;
  inrows = floor(int(document.getElementById("sliderrows").value));
  ischanged = true;
  changePrice();
 }
function changeLayers(){
  document.getElementById("spinlayers").innerHTML = document.getElementById("sliderlayers").value;
  inlayers = floor(int(document.getElementById("sliderlayers").value));
  ischanged = true;
  changePrice();
 }
function selectPrinter(){
   printer = document.getElementById("selectprinter").value
}
function selectMaterial(){
   material = document.getElementById("selectmaterial").value
   changePrice();
}
function selectDisorderFunction(){
  func = document.getElementById("disorderfunctions")
  if(func.value =="none"){
    w3.addClass("#circlesinfunction", "hidden");
    w3.addClass("#circlesoutfunction", "hidden");
    w3.addClass("#sinfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#vertfunction", "hidden");
    w3.addClass("#horfunction", "hidden");
    
    linepath =[];
    create();
    
  }
  else if(func.value =="circlesin"){
    w3.removeClass("#circlesinfunction", "hidden");
    w3.addClass("#circlesoutfunction", "hidden");
    w3.addClass("#sinfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#vertfunction", "hidden");
    w3.addClass("#horfunction", "hidden");
    
    document.getElementById("spinradiusin").innerHTML = document.getElementById("sliderradiusin").value;
    document.getElementById("spinforcein").innerHTML = document.getElementById("sliderforcein").value;
    
  }
  else if(func.value =="circlesout"){
    w3.removeClass("#circlesoutfunction", "hidden");
    w3.addClass("#circlesinfunction", "hidden");
    w3.addClass("#sinfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#vertfunction", "hidden");
    w3.addClass("#horfunction", "hidden");
    
    document.getElementById("spinradiusout").innerHTML = document.getElementById("sliderradiusout").value;
    document.getElementById("spinforceout").innerHTML = document.getElementById("sliderforceout").value;
    
  }
  else if(func.value =="sin"){
    w3.addClass("#circlesinfunction", "hidden");
    w3.addClass("#circlesoutfunction", "hidden");
    w3.removeClass("#sinfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#vertfunction", "hidden");
    w3.addClass("#horfunction", "hidden");
    

    document.getElementById("spinsinradius").innerHTML = document.getElementById("slidersinradius").value;
    document.getElementById("spinsinforce").innerHTML = document.getElementById("slidersinforce").value;
  }
  else if(func.value =="cos"){
    w3.addClass("#circlesinfunction", "hidden");
    w3.addClass("#circlesoutfunction", "hidden");
    w3.addClass("#sinfunction", "hidden");
    w3.removeClass("#cosfunction", "hidden");
    w3.addClass("#vertfunction", "hidden");
    w3.addClass("#horfunction", "hidden");
    
    document.getElementById("spincosradius").innerHTML = document.getElementById("slidercosradius").value;
    document.getElementById("spincosforce").innerHTML = document.getElementById("slidercosforce").value;
  }
  else if(func.value =="vert"){
    w3.addClass("#circlesinfunction", "hidden");
    w3.addClass("#circlesoutfunction", "hidden");
    w3.addClass("#sinfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.removeClass("#vertfunction", "hidden");
    w3.addClass("#horfunction", "hidden");
   
    document.getElementById("spinvert").innerHTML = document.getElementById("slidervert").value;
  }
  else if(func.value =="hor"){
    w3.addClass("#circlesinfunction", "hidden");
    w3.addClass("#circlesoutfunction", "hidden");
    w3.addClass("#sinfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#vertfunction", "hidden");
    w3.removeClass("#horfunction", "hidden");
    
    document.getElementById("spinhor").innerHTML = document.getElementById("sliderhor").value;
  }
  
}
function changeRadiusIn(){
  document.getElementById("spinradiusin").innerHTML = document.getElementById("sliderradiusin").value;

}
function changeForceIn(){
  document.getElementById("spinforcein").innerHTML = document.getElementById("sliderforcein").value;

}
function changeRadiusOut(){
  document.getElementById("spinradiusout").innerHTML = document.getElementById("sliderradiusout").value;

}
function changeForceOut(){
  document.getElementById("spinforceout").innerHTML = document.getElementById("sliderforceout").value;

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
function changeVert(){
  document.getElementById("spinvert").innerHTML = document.getElementById("slidervert").value;

}
function changeHor(){
  document.getElementById("spinhor").innerHTML = document.getElementById("sliderhor").value;

}


