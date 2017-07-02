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
    var d = this.dancers.push(new Dancer(pos,30, this.acolor, this.bcolor, speed))
                
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

    this.a = 0;
    this.b = 0;
    this.distx = 0;
    this.disty = 0;
    
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
   // this.size = 20;
    this.isTraining = false;
}
Dancer.prototype.startDancing = function(){
    this.step = 0;
   // this.size = 20;
    this.isDancing = true;
 }
 Dancer.prototype.stopDancing = function(){
    this.step = 0;
   // this.size = 20;
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
   
    
   
    this.pos = this.start.copy();
    if(this.dance.length > 1){
        var i = (time % ( this.dance.length-1));
        i += 1
        this.distx = floor(  (this.dance[i].x - this.dance[i-1].x) *100)/100;
        this.disty = floor(  (this.dance[i].y - this.dance[i-1].y) *100)/100;
        this.pos.add(this.dance[i]);
        this.a = atan2(this.dance[time% this.dance.length].y - this.dance[(time-1)% this.dance.length].y, this.dance[time% this.dance.length].x- this.dance[(time-1)% this.dance.length].x);
        // a = constrain(a,0, TWO_PI);
        this.a =map(this.disty, -30,30,  PI/5*4,-PI/5*4);
        this.b =map(this.distx, -30,30,  PI/5*4,-PI/5*4);
        
        
        
    }
    push();   
        translate(this.pos.x, this.pos.y);
        strokeWeight(1);
        stroke(this.bcolor);
        fill(this.acolor);
        
        if(this.dance.length >= 0){
                            
            rotate(this.a);
            this.drawBody();
            this.drawHead();
            this.drawSkirt(0,30);
            this.drawArms(0,-20,this.b);
            
            translate(0,50);
            //rotate(1 +(-a % 2)*4);
            line(0,0,0,100);
            rotate((this.a%4)*-4);
            line(0,0,100,0);
            pop();
        }
        else{
            ellipse(0,0, this.size, this.size);  
        }
    pop();
    
}
Dancer.prototype.drawBody = function(a){
    
    stroke(255,0,0);
    line(0,-50,0,50);
        
    
}
Dancer.prototype.drawHead = function(){
     fill(red(this.acolor),green(this.acolor),blue(this.acolor),100);
     noStroke();
    ellipse(0,-50, this.size, this.size);  
}
Dancer.prototype.drawSkirt = function(x,y){
    fill(red(this.acolor),green(this.acolor),blue(this.acolor),100);
   noStroke();
    var a = createVector(x+50 - random(10), y+50 + random(10));
    var b = createVector(x-50 + random(10), y+50 + random(10));
    quad(x-random(5),y-10, x +random(5),y-10, a.x, a.y, b.x, b.y);
    fill(this.acolor);
    stroke(this.bcolor);

}
Dancer.prototype.drawArms = function (x,y,a){
    push();
        translate(x,y);
        rotate(a*3);
      
        curve(-80,-50,-80,0,0,0,0,-50)

        rotate(-a);
       curve(80,-50,80,0,0,0,0,-50)
       
    pop();
}
