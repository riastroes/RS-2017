function Blob(pos, size, dim, force){
    this.path = [];
    this.b = [];
    this.pos = pos.copy();
    this.size = size;
    this.dimention = dim;
    this.force = force;
    for(var i = 0; i< this.dimention; i++){
        this.b[i] = this.pos.copy();
        var radius = random(this.size, this.size * this.force);
        this.b[i].x += radius * cos(i * angle);
        this.b[i].y += radius * sin(i * angle);
    }
}
Blob.prototype.create = function(){
    var next = 0;
    var angle = TWO_PI /this.dimention;
    
    var from, to;
    for(var i = 0; i < this.dimention; i++){
        from = this.b[i].copy();
        if(i == this.dimention - 1){
            to = this.b[0].copy();
        }
        else{
            to = this.b[i+1].copy();
        }
        stroke(colors[2]);
        ellipse(from.x, from.y, 10,10);
        ellipse(to.x, to.y, 10,10);
        for( var t = 0; t< 5; t++){
            var s  = t /4;
            this.path[next] = createVector(0,0);
            this.path[next].x = curvePoint(this.pos.x,from.x,to.x, this.pos.x,s );
            this.path[next].y = curvePoint(this.pos.y,from.y,to.y, this.pos.y,s );
            next++;
        }
    }
    
}
