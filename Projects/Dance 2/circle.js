function Circle(nr, pos, size, acolor, speed){
    this.nr = nr;
    this.pos = pos.copy();
    this.size = size;
    this.radius = this.size/2;
    this.acolor = acolor;
    this.speed = speed;
    this.jumping = 0;
    this.xo = 0;
    this.yo = 0;
    this.seed1 = random(100);
    this.seed2 = random(100);
    this.movement  = 0;
}
Circle.prototype.randomMove = function(){
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
    if( this.pos.x < -100 || this.pos.x > width+100 ||this.pos.y < -100 || this.pos.y > height+100){
        this.pos = randomPos(width,height);
    }
    if(this.jumping >10){
        this.pos = randomPos(width,height);
        this.jumping = 0;
    }
    console.log(this.nr, x,y);

}
Circle.prototype.jump = function(){
    var x = random(-30,30);
    var y = random(-30,30);
    this.pos.x = constrain(this.pos.x + x, this.radius, width-this.radius);
    this.pos.y = constrain(this.pos.y + y, this.radius, height-this.radius);
    this.xo += 1;
    this.yo += 1;
    this.jumping++;

}

Circle.prototype.draw = function(){
    strokeWeight(1);
    stroke(255);
    fill(this.acolor);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
}