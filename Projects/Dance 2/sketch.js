"use strict";

//het idee is, een circle beweegt random door de ruimte, maar als hij op een punt komt 
// waar de choreography een beweging heeft gedefinieerd, dan voert hij deze uit.

var time;
var circles;
var movements;




function setup(){
    var canvas = createCanvas(windowWidth-31, windowHeight-3)
    canvas.parent(document.getElementById("divcanvas"));
    time = 0;
    background(0,120,180);
    strokeWeight(1);
   
    circles = [];
    for(var i = 0; i < 2; i++){
        var pos = randomPos(width,height);
        circles.push(new Circle(i,pos,10,randomColor(40), 5));
        circles[i].draw();
    }
    
    movements =[];
    
    
    
}
function draw(){
    background(0,120,180,10);
    var tot = 0;
   if(time > 0){
         
     for(var i = 0; i < circles.length; i++){
        if(circles[i].movement!=0){
            circles[i].movement.move(time);
           
        }
        else{
            circles[i].randomMove();
        }
        circles[i].draw();
     }    
    
    for(var m = 0; m < movements.length; m++){
       // movements[m].draw();
        if(!movements[m].isStarted){
             
             for(var i = 0; i < circles.length; i++){
                 if(abs(floor(dist(circles[i].pos.x, circles[i].pos.y, movements[m].center.x, movements[m].center.y))- movements[m].radiusx) <= 10 ){
                    
                    movements[m].start(circles[i]);
                    
                }    
                else if(abs(floor(dist(circles[i].pos.x, circles[i].pos.y, movements[m].center.x, movements[m].center.y))- movements[m].radiusy) <= 10 ){
                    
                    movements[m].start(circles[i]);
                    
                } 
                else if(movements[m].from ){
                    if(abs(floor(dist(circles[i].pos.x, circles[i].pos.y,movements[m].from.x, movements[m].from.y))) <= 10)  {
                        movements[m].start(circles[i]);
                    }   
                }          
             }
             movements[m].draw(0);
         }
         else{
             tot++;
             movements[m].draw(movements[m].obj.acolor);
         }
        
    }
    
    if(frameCount % 1 == 0){
         time++;
    }
        
   }
    document.getElementById("total").innerHTML = tot;

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
    circles.push(new Circle(circles.length, createVector(mouseX, mouseY),10,randomColor(40), 5));
}
function startAnimation(){
    time = 1;

}
function keyPressed(){
    if(key == '1' ){
     
     
        var pos = createVector(width/2,height/2);
        var speed = random(50, 200);
        var sizex = random(10,500);
        var sizey = random(10,500);
        var movement  = new Movement(speed);
        movement.addCircle(pos,sizex,sizex,90);
        append(movements, movement);
    
}
if(key == '2' ){
     
     
        var pos = createVector(width/2,height/2);
        var speed = random(50, 200);
        var sizex = random(10,500);
        var sizey = random(10,500);
        var movement = new Movement(speed);
        movement.addCircle(pos,sizex,sizey,90);
        append(movements, movement);
    
}

if(key == '3' ){

     
        var pos = randomPos(width,height);
        var speed = random(50, 200);
        var sizex = random(10,500);
        var sizey = random(10,500);
        var movement = new Movement(speed);
        movement.addCircle(pos,sizex, sizey,90);
        append(movements, movement);
    
}
if(key == '4' ){

     
        var pos = randomPos(width,height);
        var speed = random(50, 200);
        var sizex = random(10,500);
        var sizey = random(10,500);
        var movement = new Movement(speed);
        movement.addLine(randomPos(width,height),randomPos(width,height), 30);
        append(movements, movement);
    
}
}

