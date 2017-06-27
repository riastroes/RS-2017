function Group(){
    this.dancers = [];
    this.movements = [];
    this.isActive = true;
    this.acolor = randomColor(10);
    this.bcolor = color(red(this.acolor), green(this.acolor), blue(this.acolor)); // not transparent
}
Group.prototype.dancing = function(){
    for(var d =0; d < this.dancers.length; d++){
        this.dancers[d].dancing();
        this.dancers[d].draw();
    }
}
Group.prototype.addDancer = function(pos,speed){
    var d = this.dancers.push(new Dancer(pos,10, this.acolor, this.bcolor, speed))
                
    for(var m = 0; m < this.movements.length; m++){
        this.dancers[d-1].addMovementToDance(this.movements[m]);
    }
     this.dancers[d-1].draw();
}
function Dancer(pos, size, acolor,bcolor, speed){
   
    this.acolor = acolor;
    this.bcolor = bcolor;
    this.dance = [];
    this.step = 0;
    this.start = pos.copy();
    this.pos;
    this.size = size;
    this.radius = this.size/2;
   
    this.speed = speed;
    this.jumping = 0;
    this.xo = 0;
    this.yo = 0;
    this.seed1 = random(100);
    this.seed2 = random(100);
    
    this.isTraining = false;
    this.isDancing = false;
}
Dancer.prototype.randomMove = function(){
    var x = map(noise(this.seed1+this.xo),0,1, -this.speed,this.speed);
    var y = map(noise(this.seed2+this.yo),0,1, -this.speed,this.speed);
    //this.pos.x = constrain(this.pos.x + x, this.radius, width-this.radius);
    //this.pos.y = constrain(this.pos.y + y, this.radius, height-this.radius);
    if(x> 0 && x < 0.1){x +=0.1}
    if(y> 0 && y < 0.1){y +=0.1}
    if(x> -0.1 && x <= 0){x -=0.1}
    if(y> -0.1 && y <= 0){y -=0.1}
    this.pos.x += x;
    this.pos.y += y;
    this.xo += 0.004;
    this.yo += 0.004;
    if( this.pos.x < -50 || this.pos.x > width+50){
       // this.pos.x = -this.pos.x;
        this.speed = -this.speed;
    }
    if(this.pos.y < -50 || this.pos.y > height+50 ){
       // this.pos.y = -this.pos.y;
        this.speed = -this.speed;
    }
    if(this.jumping >10){
        this.pos = randomPos(width,height);
        this.jumping = 0;
    }
    if(time % 10 == 0 && this.dance.length < 1000){
        this.dance.push(this.pos.copy());
     }
    
    
}
Dancer.prototype.addMovementToDance = function(movement){
    var last = createVector(0,0);
    if(this.dance.length > 0){
        last = this.dance[this.dance.length-1];
    }
    for(var p = 0; p < movement.pos.length; p++){
        var v = movement.pos[p].copy();
        v.add(last);
        this.dance.push(v);
    }
}
Dancer.prototype.startTraining = function(){
    
    this.isTraining = true;
}
Dancer.prototype.stopTraining = function(){
    this.step = 0;
    this.size = 20;
    this.isTraining = false;
}
Dancer.prototype.startDancing = function(){
    this.step = 0;
    this.size = 20;
    this.isDancing = true;
 }
 Dancer.prototype.stopDancing = function(){
    this.step = 0;
    this.size = 20;
    this.isDancing = false;
    this.pos = this.start.copy();
 }

Dancer.prototype.dancing = function(){
    this.pos = this.dance[this.step];
    this.step++;
    if(this.step == this.dance.length){
        this.startDancing();
    }
}
Dancer.prototype.jump = function(){
    var x = random(-30,30);
    var y = random(-30,30);
    this.pos.x = constrain(this.pos.x + x, this.radius, width-this.radius);
    this.pos.y = constrain(this.pos.y + y, this.radius, height-this.radius);
    this.xo += 1;
    this.yo += 1;
    this.jumping++;

}

Dancer.prototype.draw = function(){
   
    push();
        this.pos = this.start.copy();
        if(this.dance.length > 0){
            this.pos.add(this.dance[time% this.dance.length]);
        }
        
        translate(this.pos.x, this.pos.y);
        strokeWeight(1);
        //noStroke();//stroke(255);
        stroke(this.bcolor);
        fill(this.acolor);
        //fill(this.acolor);
            if(this.pos != undefined){
               // ellipse(this.pos.x, this.pos.y, this.size, this.size);
               
                beginShape();
                for(var d = 0; d < this.dance.length; d++){
                    if (d % floor(random(10)) == 0){
                    curveVertex(this.dance[d].x, this.dance[d].y);
                    }
                }
                endShape(CLOSE);
               
                
                if(time % 20 == 0){
                    this.dance.pop();
                }
                
            }
            else{
                ellipse(0,0, this.size*2, this.size*2);  
            }
    pop();
    
}