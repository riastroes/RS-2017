"use strict";

//het is begonnen met een idee; een circle beweegt random door de ruimte, maar als hij op een punt komt 
// waar de choreography een beweging heeft gedefinieerd, dan voert hij deze uit.

var time;
var stopwatch;
var groups;
var totdancers;
var groupMode;

var mousepath;
var buttons;
var isTraining;
var isDancing;
var mode;
var min, max;

var pg;
var delay;
var activegroup;



function setup(){
    var canvas = createCanvas(windowWidth-31, windowHeight-3)
    canvas.parent(document.getElementById("divcanvas"));
    pg  = createGraphics(width,height);
    
    time = 0;
    background(0,120,180);
    strokeWeight(1);
   
    groups = [];
    mousepath = [];
    buttons = [];
    isTraining = false;
    isDancing = false;
    groupMode = false;
    blendMode(BLEND)
    frameRate(20);
    mode = 0;
    min = 100;
    max = -100;
}
function draw(){
    
   
 pg.blendMode(BLEND)
 pg.background(0,120,180);
 image(pg,0,0);
   
   
   if(isDancing){
       for(var g = 0; g < groups.length; g++){
           if(groups[g].isActive){
             groups[g].dancing(g);
            }  
        }
    }
    else if(isTraining){
       for(var g = 0; g < groups.length; g++){
           if(groups[g].isActive){
               for(var m = 0; m < groups[g].movements; m++){
                   groups[g].movements[m].draw();
               }
           }      
       }
     }
    else{
        for(var g = 0; g < groups.length; g++){
            if(groups[g].isActive){
                groups[g].draw();
            }
        }
    }

    if(frameCount % 1 == 0){
        time++;
        stopwatch++;
    }
}
function changeMode(){
    mode = (mode+1) % 13
}
function selectMode(){
  var btn = document.getElementById("btnMode");
  switch(mode){
    case 0:{
    blendMode(BLEND);
    btn.innerHTML ="Mode:BLEND";
    break;
    }
    case 1:{
    blendMode(ADD);
    btn.innerHTML ="Mode:ADD";
    break;
    }
    case 2:{
    blendMode(DARKEST);
    btn.innerHTML ="Mode:DARKEST";
    break;
    }
    case 3:{
    blendMode(LIGHTEST);
    btn.innerHTML ="Mode:LIGHTEST";
    break;
    }
    case 4:{
    blendMode(DIFFERENCE);
    btn.innerHTML ="Mode:DIFFERENCE";
    break;
    }
    case 5:{
    blendMode(EXCLUSION);
    btn.innerHTML ="Mode:EXCLUSION";
    break;
    }
    case 6:{
    blendMode(MULTIPLY);
    btn.innerHTML ="Mode:MULTIPLY";
    break;
    }
    case 7:{
    blendMode(SCREEN);
    btn.innerHTML ="Mode:SCREEN";
    break;
    }
    case 8:{
    blendMode(REPLACE);
    btn.innerHTML ="Mode:REPLACE";
    break;
    }
    case 8:{
    blendMode(OVERLAY);
    btn.innerHTML ="Mode:OVERLAY";
    break;
    }
    case 9:{
    blendMode(HARD_LIGHT);
    btn.innerHTML ="Mode:HARD_LIGHT";
    break;
    }
    case 10:{
    blendMode(SOFT_LIGHT);
    btn.innerHTML ="Mode:SOFT_LIGHT";
    break;
    }
    case 11:{
    blendMode(DODGE);
    btn.innerHTML ="Mode:DODGE";
    break;
    }
    case 12:{
    blendMode(BURN);
    btn.innerHTML ="Mode:BURN";
    break;
    }   
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
function changeSpeed(){
    var inspeed = document.getElementById("inputspeed");
    var spn = document.getElementById("spnspeed");
    spn.innerHTML = inspeed.value;
    frameRate(parseInt( inspeed.value));
}
function changeDelay(){
    var indelay = document.getElementById("inputdelay");
    var spn = document.getElementById("spndelay");
    spn.innerHTML = indelay.value;
    delay = indelay.value;
}
function addGroup(){
    //creat a group and make it active.
    var i = groups.length;
    buttons[i] = createButton(0,i);
    buttons[i].parent(document.getElementById("divbuttons"));
    buttons[i].mousePressed(activateGroup);
   
    groups[i] = new Group(createGraphics(width,height));
    for(var g = 0; g < groups.length; g++){
        if(g == i){
            groups[g].isActive = true;
            buttons[g].style("background-color:" + groups[g].bcolor);
            activegroup = g;
            
        }   
        else{
            groups[g].isActive = false;
            buttons[g].style("background-color:lightgray");
        }  
    }
    

    
}
function addDancers(){
    var btnDancers = document.getElementById("btnAddDancers");
    if(!groupMode){
        groupMode = true;
        btnDancers.style.backgroundColor = groups[activegroup].acolor;
    }
    else{
        groupMode = false;
        btnDancers.style.backgroundColor = "lightgray";
    }
    
}
function deleteDancers(){
    var btnDancers = document.getElementById("btnDelDancers");
    btnDancers.style.backgroundColor = groups[activegroup].acolor;
    for(var g = 0; g < groups.length; g++){
        if(groups[g].isActive){
            groups[g].dancers.pop();
            buttons[g].innerHTML = groups[g].length;
        }
    }
    if(groups[g].dancers.length == 0){
        btnDancers.style.backgroundColor = "lightgray";
    }


}


function activateGroup(){
    var g = parseInt(this.elt.value);
    if(groups[g].isActive){
        //deactivate
        groups[g].isActive = false;
        buttons[g].style("background-color:lightgray");

    }
    else{
        //activate
        groups[g].isActive = true;
        buttons[g].elt.style.backgroundColor =groups[g].bcolor;
        activegroup = g;
    }

}
function startTraining(){
    if(!isTraining){
        //start training
        isDancing = false;
        isTraining = true;
        groupMode = false;
        background(0,120,180);
        time = 1;
        
        var btn = document.getElementById('btnTraining');
        btn.innerHTML = "Stop Training";
        var btn = document.getElementById('btnDancing');
        btn.innerHTML = "Start Dansen";
        var btn = document.getElementById('btnAddDancers');
         btn.style.backgrounColor = "lightgray";
        
    }
    else{
        //stop training
        isTraining = false;
        var btn = document.getElementById('btnTraining');
        btn.innerHTML = "Start Training";
        groupMode = true;
    }
}
function startDance(){
    if(!isDancing){
        //start dancing
        isDancing = true;
        isTraining = false;
        groupMode = false;
        background(0,120,180);
        time = 1;
        var btn = document.getElementById('btnTraining');
        btn.innerHTML = "Start Training";
        
        var btn = document.getElementById('btnDancing');
        btn.innerHTML = "Stop Dansen";
    }
    else{
        isDancing = false;
        groupMode = true;
        var btn = document.getElementById('btnDancing');
        btn.innerHTML = "Start Dansen";
    }
    
   

}

function touchStarted(){
    stopwatch = 0;
}
function touchMoved() {
    if(isTraining){
        mousepath.push(createVector(mouseX, mouseY));
        stroke(255);
        strokeWeight(3);
        pg.point(mouseX, mouseY);
    }
    return false;
}
function touchEnded(){
    if(isTraining){
        addMousePath(stopwatch);
    }
    return false;
}
function mousePressed(){
    //add a new dancer
    if(groupMode && mouseX > 0 && mouseY > 0 && mouseX <width && mouseY <height){
        var pos =createVector(mouseX, mouseY);
        for(var g = 0; g < groups.length;g++){
            if(groups[g].isActive){
                groups[g].addDancer(pos, 2);
                buttons[g].elt.innerHTML = groups[g].dancers.length;
               
            }
        }
     }
    

}

function keyPressed(){
    console.log(key);
    var movement = new Movement(speed);
    if(key == '1' ){
     
     
        var pos = createVector(width/2,height/2);
        var speed = random(50, 200);
        var sizex = random(10,500);
        var sizey = random(10,500);
        movement.addCircle(pos,sizex,sizex,90);
        
        
    }
    if(key == '2' ){
        
        
            var pos = createVector(width/2,height/2);
            var speed = random(50, 200);
            var sizex = random(10,500);
            var sizey = random(10,500);
           movement.addCircle(pos,sizex,sizey,90);
           
        
    }

    if(key == '3' ){

        
            var pos = randomPos(width,height);
            var speed = random(50, 200);
            var sizex = random(10,500);
            var sizey = random(10,500);
            movement.addCircle(pos,sizex, sizey,90);
            
        
    }
    if(key == '4' ){
        
            var pos = randomPos(width,height);
            var speed = random(50, 200);
            var sizex = random(10,500);
            var sizey = random(10,500);
            
            movement.addLine(randomPos(width,height),randomPos(width,height), 30);
            
        
    }
    
   
     for(var g = 0; g < groups.length; g++){
        if(groups[g].isActive){
            for(var d = 0; d < groups[g].dancers.length; d++){
                    groups[g].dancers[d].addMovementToDance(movement);
            }
        }
     }

    
}
function addMousePath(){
    var agroup;
    var movement;
    for(var g = 0; g < groups.length; g++){
        if(groups[g].isActive){
            agroup = groups[g];
            break;
        }
    }
    if(mousepath.length > 0 && agroup != undefined){
        movement = new Movement(stopwatch);
        movement.addMouse(mousepath,100);
        append(agroup.movements, movement);
        movement.draw(0);
        mousepath = [];

        for(var d = 0; d < agroup.dancers.length; d++){
                agroup.dancers[d].addMovementToDance(movement);
        }
    }
}

