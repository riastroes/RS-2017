function Bubble(x,y){

    
   
    this.x = x;
    this.y = y;
    this.a = 0;
    this.seedx = random(100);
    this.seedy = random(100);
    this.size = floor(random(500));
    this.pg = createGraphics(this.size,this.size);
    
}


Bubble.prototype.draw = function(x,y){ 
    blendMode(OVERLAY);
    this.pg.background(0,0);
    
    this.pg.fill(255);
    this.pg.noStroke();
    //this.create();
    this.pg.ellipse(this.size/4, this.size/4,this.size/2,this.size/2);
    blendMode(DIFFERENCE);
    image(this.pg,this.x-100,this.y-100);
}
Bubble.prototype.create = function(){
    this.pg.beginShape();
    this.pg.vertex(10,10);
    this.pg.vertex(90, 80);
    this.pg.vertex(180, 40);
    this.pg.endShape(CLOSE);
}
Bubble.prototype.move = function(){
    var move = createVector(0,0);
    
    move.x = map(noise(this.seedx + this.a), 0, 1, -3,3);
    move.y = map(noise(this.seedy + this.a), 0, 1, -3,3);

    if( (this.x + move.x)< -50 || (this.x + move.x) > (width + 50)){
        move.x = -move.x;
    }
    this.x += move.x;

    if((this.y + move.y) < -50 ||  (this.y + move.y) > (height + 50)){
        move.y = -move.y;
    }
    this.y += move.y;
    
    this.a += 0.003;
}
