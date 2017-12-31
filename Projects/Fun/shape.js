function Shape(acolor){
    this.p;
    this.color = acolor;
    this.direction = createVector(0,0);
    
}
Shape.prototype.createCircle = function(pos ,size){
    this.p = [];
    this.p[0] = pos.copy();
    var i = 1;
    for(var angle = 0; angle <= TWO_PI; angle += (TWO_PI / size) ){
        this.p[i] = pos.copy();
        this.p[i].x += (size/2) * cos(angle);
        this.p[i].y += (size/2) * sin(angle);
        i++;
    }
}
Shape.prototype.changeDirection = function(){
    if(this.p[0].x > width){
        this.direction.x = random(-1,0);
    }
    else if(this.p[0].x < 0){
        this.direction.x = random(0, 1);
    }
    else{
        this.direction.x = random( -1, 1);
    }
    if(this.p[0].y > height){
        this.direction.y = random(-1,0);
    }
    else if(this.p[0].y < 0){
        this.direction.y = random(0, 1);
    }
    else{
        this.direction.y = random( -1, 1);
    }
    
}
Shape.prototype.move = function(speed){
    var move = this.direction.copy();
    move.mult(speed);
    for(var i = 0; i < this.p.length; i++){
        this.p[i].x += move.x;
        this.p[i].y += move.y;
    }
}
Shape.prototype.change = function(factor){
    for(var i = 1; i < this.p.length; i++){
        this.p[i].x += random(-factor,factor);
        this.p[i].y += random(-factor,factor);
    }
}
Shape.prototype.draw = function(){
    var max = this.p.length;
    stroke(0);
    fill(this.color);
    beginShape();
    
    for(var i = 1; i < this.p.length +4; i++){
        curveVertex(this.p[i%max].x, this.p[i%max].y);
    }
     endShape();
    
}