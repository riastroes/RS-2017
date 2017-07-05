function Group(apg){
    this.pg = apg;
    this.dancers = [];
    this.movements = [];
    this.isActive = true;
    this.acolor = randomColor(255);
    this.bcolor = color(red(this.acolor), green(this.acolor), blue(this.acolor)); // not transparent
}
Group.prototype.dancing = function(g){
   this.pg.blendMode(BLEND)
   this.pg.background(0,120,180,parseInt(delay));
   selectMode(mode) ;
   
    for(var d =0; d < this.dancers.length; d++){
        this.dancers[d].dancing();
        this.dancers[d].draw();
    }
    //if(time% groups.length == g){
         image(this.pg, 0,0);
    // }
}
Group.prototype.draw = function(g){
   //this.pg.blendMode(BLEND)
   //this.pg.background(0,120,180,parseInt(delay));
   selectMode(mode) ;
   
    for(var d =0; d < this.dancers.length; d++){
       this.dancers[d].draw();
    }
    image(this.pg, 0,0); 
}
Group.prototype.addDancer = function(pos,speed){
    var d = this.dancers.push(new Dancer(this.pg, pos,30, this.acolor, this.bcolor, speed))
                
    for(var m = 0; m < this.movements.length; m++){
        this.dancers[d-1].addMovementToDance(this.movements[m]);
    }
     this.dancers[d-1].draw();
}
function Dancer(apg, pos, size, acolor,bcolor, speed){
    this.pg = apg;
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
    this.inscale = 1;
    
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
        this.a =map(this.disty/3, -30,30,  PI/5*4,-PI/5*4);
        this.b =map(this.distx, -30,30,  PI/5*4,-PI/5*4);
        
        this.inscale = map(this.pos.y, 0,height, 0.4,1.5);
        
    }
    this.pg.push();   
        this.pg.translate(this.pos.x, this.pos.y);
        this.pg.scale(this.inscale);
        this.pg.strokeWeight(1);
        this.pg.stroke(this.bcolor);
        this.pg.fill(this.acolor);
        
       // if(this.dance.length >= 0){
                            
            this.pg.rotate(this.a);
            this.drawBody();
            this.drawHead();
            this.drawSkirt(0,0);
            this.drawArms(0,-20,this.b);
            this.drawLegs(0,10, this.a);
           
           //pop();
       // }
        // else{
        //     this.pg.stroke(this.bcolor);
        //     this.pg.fill(this.acolor);
        //     this.pg.ellipse(0,0, this.size, this.size);  
        // }
   this.pg.pop();
    
}
Dancer.prototype.drawBody = function(a){
    this.pg.ellipse(0,-10,20,70);
}
Dancer.prototype.drawLegs = function(x,y, a){
    //fill(255)
    this.pg.translate(x,y);
    if(time % 10 < 5){
       this.pg. rotate(-0.1);
        //line(0,0,0,100);
        this.pg.ellipse(0,50,10,100);
        this.drawSkirt(0 ,-20);
        this.drawStep(this.pos.x,this.pos.y + 100);
    }
    else{
       this.pg. rotate(a*-2);
        this.pg.ellipse(0,50,10,100);
        this.drawSkirt(0 ,-20);
        this.drawStep(this.pos.x,this.pos.y + 100);
    }
   
    if(time % 10 >= 5){
        this.pg.rotate(0.1);
        this.pg.ellipse(0,50,10,100);
        this.drawSkirt(0 ,-20);
        this.drawStep(this.pos.x,this.pos.y + 100);
    }
    else{
       this.pg.rotate(a*2);
       this.pg.ellipse(0,50,10,100);
       this.drawSkirt(0 ,-20);
       this.drawStep(this.pos.x,this.pos.y + 100);
    }
 }
Dancer.prototype.drawStep= function(x,y ){
    pg.fill(random(200,255),random(200,255),random(200,255),10);
    pg.noStroke();
    pg.ellipse(x,y,this.inscale* 10,this.inscale* 10);
}

Dancer.prototype.drawHead = function(){
    pg.stroke(this.bcolor);
    pg.fill(this.acolor);
    this.pg.ellipse(0,-60, this.size, this.size);  
    this.pg.ellipse(0,-50, this.size/2, this.size);  
}
Dancer.prototype.drawSkirt = function(x,y){
    this.pg.noStroke();
    this.pg.fill(this.acolor);
    var a = createVector(x+50 - random(10), y+50 + random(10));
    var b = createVector(x-50 + random(10), y+50 + random(10));
    this.pg.quad(x-random(10),y-10, x +random(10),y-10, a.x, a.y, b.x, b.y);
 }
Dancer.prototype.drawArms = function (x,y,a){
    this.pg.stroke(this.acolor);
    this.pg.fill(this.bcolor);
    this.pg.push();
        this.pg.translate(x,y);
        this.pg.rotate(a*3);
      
        this.pg.curve(-80,-80,-80,0,0,0,-10,80)

       this.pg.rotate(-a*3);
        this.pg.curve(80,-80,80,0,0,0,10,80)
       
    this.pg.pop();
}
