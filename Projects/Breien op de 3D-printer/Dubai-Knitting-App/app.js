
"use strict";
var printer;
var material;
var lapje;
var stitches;
var rows;
var korting;

var pos;
var inrows;
var institches;
var inlayers;
var windowscale;


var sliderStitches;
var sliderRows;
var sliderRadius;
var sliderForce;
var slidercosfrom;
var slidercosto;
var sliderScale;
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
var issaved;
var newscale;
var manip;

function setup() {
    var canvas = createCanvas(1150,1150);
    canvas.parent("divcanvas");

    windowscale =  ((windowWidth-100)/2)/1200;
    korting = 1;
   
    
    offset = createVector(0,15);
    pos = createVector(6,2);
    totlayerheight = 0;
    func ="none";
    manip = [];
    sliderRadius = document.getElementById("sliderradius");
    sliderForce = document.getElementById("sliderforce");
    sliderScale = document.getElementById("sliderscale");


    changeStitches();
    changeRows();
    
    selectPrinter();
    selectMaterial();
    
    
    
    checkShowGrid = document.getElementById("showgrid");
    checkShowPointDrawing = document.getElementById("showpointdrawing");
    checkShowLineDrawing = document.getElementById("showlinedrawing");
    
    //institches =  floor(int(sliderStitches.value));
   // inrows = floor(int(sliderRows.value));
    linepath = [];
    
    issaved = false;
    
  
}
function draw(){
  push();
  scale(windowscale);
  if(ischanged == true){
    create();
    ischanged = false;
  }
  pop();
}

function create(){
  var ina,inb;
  lapje = new Lapje(printer, material, "normal",  institches, inrows, true  );
    
  lapje.createGrid(2,2,2);
  lapje.showGrid();
  
  if(func.value == "none"){
    ina =0;
    inb =0;
    manip = [];
  }
  else if(func.value == "circlesin"){
    manip.push(new Manip());
    manip[manip.length-1].func = func.value;
    ina = document.getElementById("sliderradiusin").value;
    inb = document.getElementById("sliderforcein").value;
    manip[manip.length-1].a = parseInt(ina);
    manip[manip.length-1].b = parseInt(inb);
  }
  else if(func.value == "circlesout"){
    manip.push(new Manip());
    manip[manip.length-1].func = func.value;
    ina = document.getElementById("sliderradiusout").value;
    inb = document.getElementById("sliderforceout").value;
    manip[manip.length-1].a = parseInt(ina);
    manip[manip.length-1].b = parseInt(inb);
  }
  
  else if(func.value == "cos"){
    manip.push(new Manip());
    manip[manip.length-1].func = func.value;
    ina = document.getElementById("slidercosfrom").value;
    inb = document.getElementById("slidercosto").value;
    manip[manip.length-1].a = parseInt(ina);
    manip[manip.length-1].b = parseInt(inb);
  }
 
  else if(func.value == "vert"){
    manip.push(new Manip());
    manip[manip.length-1].func = func.value;
    ina = document.getElementById("slidervert").value;
    manip[manip.length-1].a = parseInt(ina);
  }
  else if(func.value == "hor"){
    manip.push(new Manip());
    manip[manip.length-1].func = func.value;
    ina = document.getElementById("sliderhor").value;
    manip[manip.length-1].a = parseInt(ina);
  }
  
  
  if(inrows  > 0 && institches >0){
   
   lapje.create(true, ischanged,institches, inrows,5, manip);
  }
  
  changePrice(); 
  
  issaved = false;
}
function changePosx(){
  pos.x = parseInt(document.getElementById("inx").value);
  ischanged = true;
}
function changePosy(){
  pos.y = parseInt(document.getElementById("iny").value);
  ischanged = true;
}
function changeCode(){
  if(document.getElementById("incode").value == "FACEBOOK50"){
    korting = 0.5;
  }
  else{
    korting = 1;
  }
   changePrice();
}
function changePrice(){
  if(institches >0 && inrows > 0 ){
    var price = 0;
    var mat = 0.01;
    if(material == "PETGCARBON"){
      mat = 0.02;
    }
    if(material == "PLABRO"){
      mat = 0.015;
    }
    price = institches * inrows  * mat * 5 * newscale * korting;
    
    
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

    if(!issaved){
      lapje.save();
      issaved = true;
    }
    //document.location.href ="#email";
}

function Manip(){
  this.func;
  this.a;
  this.b;
  this.v;
}
function mousePressed(){
  if(mouseX > offset.x && mouseY > offset.y){
    var v = createVector(0,0);
    
    v.x = (mouseX - offset.x) / windowscale;
    v.y = (mouseY - offset.y) / windowscale;
    
    manip.push(new Manip());
    if(manip.length> 1){
      manip[manip.length-1].func =  manip[manip.length-2].func;
      manip[manip.length-1].a =  manip[manip.length-2].a;
      manip[manip.length-1].b =  manip[manip.length-2].b;
      manip[manip.length-1].v = v.copy(); 
    }
    ischanged = true;
  }   
}

function changeStitches(){
  document.getElementById("spinstitches").innerHTML = document.getElementById("sliderstitches").value;
  institches = floor(document.getElementById("sliderstitches").value);
  manip = [];
  ischanged = true;
 
}
function changeRows(){
  document.getElementById("spinrows").innerHTML = document.getElementById("sliderrows").value;
  inrows = floor(document.getElementById("sliderrows").value);
  if(inrows < floor(document.getElementById("slidercosto").value)){
    document.getElementById("slidercosto").value = inrows.toString();
    document.getElementById("slidercosto").max = inrows.toString();
  }
   manip = [];
  ischanged = true;
 
 }
// function changeLayers(){
//   document.getElementById("spinlayers").innerHTML = document.getElementById("sliderlayers").value;
//   inlayers = floor(int(document.getElementById("sliderlayers").value));
//   ischanged = true;
//   changePrice();
//  }
function selectPrinter(){
   printer = document.getElementById("selectprinter").value
   var spn = document.getElementById("spnmaterial");
   spn.innerHTML = "";
  if(printer == "Anet"){
      //Create array of options to be added
      var array1 = ["ABS",             "SAT1N",        "SAT2N",      "SAT3N"];
      var array2 = ["ABS neutraal/wit","Satijn silver","Satijn goud","Satijn licht blauw"];
  }
  else if (printer == "Ultimaker2+"){
      var array1 = ["PLA",      "PLABRO"   ];
      var array2 = ["PLA zwart","Brons(30%)"];
  }

  //Create and append select list
  var selectList = document.createElement("select");
  selectList.id = "selectmaterial";
  selectList.onchange = selectMaterial;
  spn.appendChild(selectList);

  //Create and append the options
  for (var i = 0; i < array1.length; i++) {
      var option = document.createElement("option");
      option.value = array1[i];
      option.text = array2[i];
      selectList.appendChild(option);
  }
  selectMaterial();
  ischanged = true;
  
}
function selectMaterial(){
   material = document.getElementById("selectmaterial").value
   ischanged = true;
   
}
function selectDisorderFunction(){
  func = document.getElementById("disorderfunctions");
  
  if(func.value =="none"){
    w3.addClass("#circlesinfunction", "hidden");
    w3.addClass("#circlesoutfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#vertfunction", "hidden");
    w3.addClass("#horfunction", "hidden");
    
  }
  else if(func.value =="circlesin"){
    w3.removeClass("#circlesinfunction", "hidden");
    w3.addClass("#circlesoutfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#vertfunction", "hidden");
    w3.addClass("#horfunction", "hidden");
    
    document.getElementById("spinradiusin").innerHTML = document.getElementById("sliderradiusin").value;
    document.getElementById("spinforcein").innerHTML = document.getElementById("sliderforcein").value;
    
  }
  else if(func.value =="circlesout"){
    w3.removeClass("#circlesoutfunction", "hidden");
    w3.addClass("#circlesinfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#vertfunction", "hidden");
    w3.addClass("#horfunction", "hidden");
    
    document.getElementById("spinradiusout").innerHTML = document.getElementById("sliderradiusout").value;
    document.getElementById("spinforceout").innerHTML = document.getElementById("sliderforceout").value;
    
  }
  
  else if(func.value =="cos"){
    w3.addClass("#circlesinfunction", "hidden");
    w3.addClass("#circlesoutfunction", "hidden");
    w3.removeClass("#cosfunction", "hidden");
    w3.addClass("#vertfunction", "hidden");
    w3.addClass("#horfunction", "hidden");
    
    document.getElementById("spincosfrom").innerHTML = document.getElementById("slidercosfrom").value;
    document.getElementById("spincosto").innerHTML = document.getElementById("slidercosto").value;
  }
  
  else if(func.value =="vert"){
    w3.addClass("#circlesinfunction", "hidden");
    w3.addClass("#circlesoutfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.removeClass("#vertfunction", "hidden");
    w3.addClass("#horfunction", "hidden");
   
    document.getElementById("spinvert").innerHTML = document.getElementById("slidervert").value;
  }
  else if(func.value =="hor"){
    w3.addClass("#circlesinfunction", "hidden");
    w3.addClass("#circlesoutfunction", "hidden");
    w3.addClass("#cosfunction", "hidden");
    w3.addClass("#vertfunction", "hidden");
    w3.removeClass("#horfunction", "hidden");
    
    document.getElementById("spinhor").innerHTML = document.getElementById("sliderhor").value;
  }
  ischanged = true;
}
function changeRadiusIn(){
  document.getElementById("spinradiusin").innerHTML = document.getElementById("sliderradiusin").value;
   ischanged = true;
}
function changeForceIn(){
  document.getElementById("spinforcein").innerHTML = document.getElementById("sliderforcein").value;
  ischanged = true;
}
function changeRadiusOut(){
  document.getElementById("spinradiusout").innerHTML = document.getElementById("sliderradiusout").value;
  ischanged = true;
}
function changeForceOut(){
  document.getElementById("spinforceout").innerHTML = document.getElementById("sliderforceout").value;
  ischanged = true;
}
function changeCosFrom(){
  document.getElementById("spincosfrom").innerHTML = document.getElementById("slidercosfrom").value;
  ischanged = true;
}
function changeCosTo(){
  document.getElementById("spincosto").innerHTML = document.getElementById("slidercosto").value;
  ischanged = true;
}

function changeVert(){
  document.getElementById("spinvert").innerHTML = document.getElementById("slidervert").value;
  ischanged = true;
}
function changeHor(){
  document.getElementById("spinhor").innerHTML = document.getElementById("sliderhor").value;
  ischanged = true;
}



function changeScale(){

  document.getElementById("spinscale").innerHTML = document.getElementById("sliderscale").value;
  document.getElementById("sliderstitches").max = (floor(40 / document.getElementById("sliderscale").value ));
  document.getElementById("sliderrows").max = (floor(40 / document.getElementById("sliderscale").value ));

  if(document.getElementById("sliderstitches").value > document.getElementById("sliderstitches").max){
    document.getElementById("sliderstitches").value = document.getElementById("sliderstitches").max;
    document.getElementById("spinstitches").innerHTML = document.getElementById("sliderstitches").value;
    stitches = document.getElementById("sliderstitches").value;
    changeStitches();
  }
  if(document.getElementById("sliderrows").value > document.getElementById("sliderrows").max){
    document.getElementById("sliderrows").value = document.getElementById("sliderrows").max;
    document.getElementById("spinrows").innerHTML = document.getElementById("sliderrows").value;
    rows = document.getElementById("sliderrows").value;
    changeRows();
  }
  document.getElementById("slidercosfrom").max = document.getElementById("sliderrows").max;
  document.getElementById("slidercosfrom").value = 1;
  document.getElementById("slidercosto").max = document.getElementById("sliderrows").max;
  document.getElementById("slidercosto").value = document.getElementById("sliderrows").max;
  newscale = parseFloat(document.getElementById("sliderscale").value);
  manip = [];
 
  ischanged = true;
}
