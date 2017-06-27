"use strict";

//het is begonnen met een idee; een circle beweegt random door de ruimte, maar als hij op een punt komt 
// waar de choreography een beweging heeft gedefinieerd, dan voert hij deze uit.

var time;
var groups;
var totdancers;
var groupMode;

var mousepath;
var buttons;
var isTraining;
var isDancing;


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
    
    
}
function draw(){
   background(0,120,180,20);
   
   
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
    if(frameCount % 1 == 0){
        time++;
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
    }
}
function startDance(){
    if(!isDancing){
        //start dancing
        isDancing = true;
        isTraining = false;
        background(0,120,180);
        time = 1;
        var btn = document.getElementById('btnTraining');
        btn.innerHTML = "Start Training";
        
        var btn = document.getElementById('btnDancing');
        btn.innerHTML = "Stop Dancing";
    }
    else{
        isDancing = false;
       
        var btn = document.getElementById('btnDancing');
        btn.innerHTML = "Start Dancing";
    }
    
   

}
function changeDancers(){
    dancers = [];
    buttons = [];
    var divbuttons = document.getElementById("divbuttons");
    divbuttons.innerHTML ="";

    totdancers = parseInt(document.getElementById("indancers").value);
    for(var i = 0; i < totdancers; i++){
        var pos = randomPos(width,height);
        dancers[i] = new Dancer(pos,10,randomColor(100), 5);
        dancers[i].draw();
    
        buttons[i] = createButton(i+1,"off");
        buttons[i].parent(document.getElementById("divbuttons"));
        buttons[i].mousePressed(trainDancer);
       
        
    }
    
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
        addMousePath();
    }
    return false;
}
function mousePressed(){
    //add a new dancer
    if(groupMode && mouseX > 0 && mouseY > 0 && mouseX <width && mouseY <height){
        var pos =createVector(mouseX, mouseY);
        for(var g = 0; g < groups.length;g++){
            if(groups[g].isActive){
                groups[g].addDancer(pos, 5);
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
    for(var g = 0; g < groups.length; g++){
        if(groups[g].isActive){
            agroup = groups[g];
            break;
        }
    }

    console.log(key);
    if(key == '1' ){
     
     
        var pos = createVector(width/2,height/2);
        var speed = random(50, 200);
        var sizex = random(10,500);
        var sizey = random(10,500);
        var movement  = new Movement(speed);
        movement.addCircle(pos,sizex,sizex,90);
        append(agroup.movements, movement);
        
    }
    if(key == '2' ){
        
        
            var pos = createVector(width/2,height/2);
            var speed = random(50, 200);
            var sizex = random(10,500);
            var sizey = random(10,500);
            var movement = new Movement(speed);
            movement.addCircle(pos,sizex,sizey,90);
            append(agroup.movements, movement);
        
    }

    if(key == '3' ){

        
            var pos = randomPos(width,height);
            var speed = random(50, 200);
            var sizex = random(10,500);
            var sizey = random(10,500);
            var movement = new Movement(speed);
            movement.addCircle(pos,sizex, sizey,90);
            append(agroup.movements, movement);
        
    }
    if(key == '4' ){
        
            var pos = randomPos(width,height);
            var speed = random(50, 200);
            var sizex = random(10,500);
            var sizey = random(10,500);
            var movement = new Movement(speed);
            movement.addLine(randomPos(width,height),randomPos(width,height), 30);
            append(agroup.movements, movement);
        
    }
     for(var g = 0; g < groups.length; g++){
        if(groups[g].isActive){
            agroup = groups[g];
            break;
        }
    }
    for(var d = 0; d < agroup.dancers.length; d++){
        if(agroup.dancers[d].isTraining){
            agroup.dancers[d].dance = [];
            for(var m = 0; m < agroup.movements.length; m++){
                agroup.dancers[d].addMovementToDance(agroup.movements[m]);
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
        movement = new Movement(50);
        movement.addMouse(mousepath,100);
        append(agroup.movements, movement);
        movement.draw(0);
        mousepath = [];

        for(var d = 0; d < agroup.dancers.length; d++){
                agroup.dancers[d].addMovementToDance(movement);
        }
    }
}

