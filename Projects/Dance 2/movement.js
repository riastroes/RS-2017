function Movement(speed){
    this.pos = [];
    this.center;
    this.end = false;
    this.pos;
    this.radiusx;
    this.radiusy;
    this.obj;
    this.isStarted = false;
    this.speed = speed;
    this.angle =0;
    this.steps = 0;
    this.n = 0;
    this.step =0;
    
}
Movement.prototype.addCircle = function(center,radiusx, radiusy, steps){
    this.center = center.copy();
    this.radiusx = radiusx;
    this.radiusy = radiusy;
    this.steps = steps;
    var start = random(TWO_PI);
    for(var a = start ; a < start + TWO_PI; a += TWO_PI/steps){
        var p = this.center.copy();
        p.x += radiusx * sin(a);
        p.y += radiusy * cos(a);
        append(this.pos, p);
    }
    this.draw(0);
}
Movement.prototype.addLine = function(from, to, steps){
    this.from = from.copy();
    this.to = to.copy();
    this.steps += steps;
    this.center = createVector(this.to.x - this.from.x, this.to.y- this.from.y);
    for(var i =0; i < steps; i++){
        var v = createVector(to.x - from.x, to.y - from.y);
        v.div(steps);
        v.mult(i);
        v.add(from);
        append(this.pos, v);
        
    }
    this.draw(0);
}
Movement.prototype.start = function(obj){
    
        this.obj = obj;
        this.angle = atan2(this.center.y - obj.pos.y, this.center.x-obj.pos.x);
        if(this.angle < 0){ 
            this.angle = TWO_PI - this.angle;
        }
        var i =  this.angle/TWO_PI; 
        this.step = floor(this.steps/(i+1)); 
        
       
        this.isStarted = true;
        obj.movement = this;
    
}
Movement.prototype.stop = function(){
    
    this.isStarted = false;
    this.n = 0;
    this.end = 0;
    
    this.obj.size =10;
    this.obj.radius =5;
    this.obj.movement  = 0;
    this.obj.jump();
    
   
}
Movement.prototype.move = function(t){

    if(this.isStarted){
        if(this.n == this.steps){
            this.stop();
        }
        else {
            if(this.n < this.steps/2){
                this.obj.size += 1;
                this.obj.radius += 0.5;
            }
            else{
                this.obj.size -= 1;
                this.obj.radius -= 0.5;
            }
            
                        
            this.obj.pos = this.pos[(this.step + this.n) % this.steps].copy();
            this.n++;
        }
        
    }
}
    
Movement.prototype.draw = function(acolor){
    stroke(acolor);
    strokeWeight(this.size/10);
    for(var p = 0; p < this.pos.length; p++){
        point(this.pos[p].x, this.pos[p].y);
    }

}


