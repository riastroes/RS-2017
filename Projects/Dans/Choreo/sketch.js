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


function setup(){
    var canvas = createCanvas(windowWidth-31, windowHeight-3)
    canvas.parent(document.getElementById("divcanvas"));
    time = 0;
    background(0,120,180);
    strokeWeight(1);
   
    groups = [];
    mousepath = [];
    buttons = [];
    isTraining = false;
    isDancing = false;
    groupMode = false;
    blendMode(BURN)
    frameRate(20);
    mode = 0;
    min = 100;
    max = -100;
}
function draw(){
     blendMode(BLEND)
  background(0,120,180);
    selectMode(mode) ;
   fill(255);
   rect(0,0,100,120);
   
   
   if(time > 0 && isDancing){
       for(var g = 0; g < groups.length; g++){
           if(groups[g].isActive){
             groups[g].dancing();
           }  
            
       }
    }
    if(time > 0 && isTraining){
       for(var g = 0; g < groups.length; g++){
           if(groups[g].isActive){
               for(var m = 0; m < groups[g].movements; m++){
                   groups[g].movements[m].draw();
               }
            
           }      
       }
    }
    if(groups.length > 0 && groups[0].dancers.length> 0){
        var t = floor( groups[0].dancers[0].a * 100)/100
        if ( t < min){min = t}
        if(t > max){ max = t}
        fill(0);
        noStroke();
        textSize(10);
        text(t, 10,30);
        text("min: " + min, 10,50);
        text("max: " + max, 10,70);
        text("distx: " + groups[0].dancers[0].distx, 10,90);
        text("disty: " + groups[0].dancers[0].disty, 10,110);
    }   
    if(frameCount % 1 == 0){
        time++;
        stopwatch++;
    }
        
 
    
    

}
function changeMode(){
    mode = (mode+1) % 14
}
function selectMode(){
  switch(mode){
      case 0:{
          blendMode(BLEND);
          break;
      }
      case 1:{
          blendMode(ADD);
           break;
      }
      case 2:{
          blendMode(DARKEST);
           break;
      }
      case 3:{
          blendMode(LIGHTEST);
           break;
      }
      case 4:{
          blendMode(DIFFERENCE);
           break;
      }
      case 5:{
          blendMode(EXCLUSION);
           break;
      }
      case 6:{
          blendMode(MULTIPLY);
           break;
      }
      case 7:{
          blendMode(SCREEN);
           break;
      }
      case 8:{
          blendMode(REPLACE);
           break;
      }
      case 9:{
          blendMode(OVERLAY);
           break;
      }
      case 10:{
          blendMode(HARD_LIGHT);
           break;
      }
      case 11:{
          blendMode(SOFT_LIGHT);
           break;
      }
      case 12:{
          blendMode(DODGE);
           break;
      }
      case 13:{
          blendMode(BURN);
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
function addGroup(){
    //creat a group and make it active.
    var i = groups.length;
    groups[i] = new Group();
    for(var g = 0; g < groups.length; g++){
        if(g == i){
            groups[g].isActive = true;
            
        }     
    }
    

    buttons[i] = createButton(0,i);
    buttons[i].parent(document.getElementById("divbuttons"));
    buttons[i].mousePressed(activateGroup);
    buttons[i].style("background-color:" + groups[i].bcolor);
}
function addDancers(){
    var btnDancers = document.getElementById("btnAddDancers");
    if(!groupMode){
        groupMode = true;
        btnDancers.style.color = "black";
    }
    else{
        groupMode = false;
        btnDancers.style.color = "lightgray";
    }
    
}
function deleteDancers(){
    var btnDancers = document.getElementById("btnDelDancers");
    for(var g = 0; g < groups.length; g++){
        if(groups[g].isActive){
            groups[g].dancers.pop();
            buttons[g].innerHTML = groups[g].length;
        }
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
        btn.innerHTML = "Start Dancing";
        var btn = document.getElementById('btnAddDancers');
         btn.style.color = "lightgray";
        
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
        btn.innerHTML = "Stop Dancing";
    }
    else{
        isDancing = false;
        groupMode = true;
        var btn = document.getElementById('btnDancing');
        btn.innerHTML = "Start Dancing";
    }
    
   

}
// function changeDancers(){
//     dancers = [];
//     buttons = [];
//     var divbuttons = document.getElementById("divbuttons");
//     divbuttons.innerHTML ="";

//     totdancers = parseInt(document.getElementById("indancers").value);
//     for(var i = 0; i < totdancers; i++){
//         var pos = randomPos(width,height);
//         dancers[i] = new Dancer(pos,10,randomColor(100), 5);
//         dancers[i].draw();
    
//         buttons[i] = createButton(i+1,"off");
//         buttons[i].parent(document.getElementById("divbuttons"));
//         buttons[i].mousePressed(trainDancer);
       
        
//     }
    
// }
function touchStarted(){
    stopwatch = 0;
}
function touchMoved() {
    if(isTraining){
        mousepath.push(createVector(mouseX, mouseY));
        stroke(255);
        strokeWeight(3);
        point(mouseX, mouseY);
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
// function trainDancer(){
//     var i = parseInt(this.elt.textContent)-1;
    
    
//     if(buttons[i].value != "on"){
//         buttons[i].style("background-color:" + dancers[i].acolor);
//         buttons[i].value = "on";
//         dancers[i].startTraining();
        
//     }
//     else{
//         buttons[i].style("background-color:lightgray");
//         buttons[i].value = "off";
//         dancers[i].isTraining = false;
//     }
    
// }
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

