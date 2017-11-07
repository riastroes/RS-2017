function LangeLadder(p, r,  controls) {
    this.p = [];
    this.r = [];
    this.p = this.p.concat(p);
    this.r = this.r.concat(r);
    
    this.curve1 = [];
    this.curve2 = [];
    this.path = [];
    this.steps = [];


}
LangeLadder.prototype.create = function(steps) {
    
    for(var n = 0 ; n < this.p.length; n++){
        append(this.path, this.p[n]);
    }
    append(this.path, this.p[0]);
    for(var n = 0 ; n < this.r.length; n++){
       
        if(n == 0 ||n == 1 || n == 7|| n == 8){
            this.r[n].add(createVector(3,0));//correctie
        }
        if(n == 5|| n == 6){
            this.r[n].add(createVector(5,0));//correctie
        }
        append(this.path, this.r[n]);
    }
    append(this.path, this.r[0]);

    for(var n = 0 ; n < this.p.length; n++){
        m = n + 1;
        if (m == this.p.length){m = 0;}
        var c1 = this.p[n];
        var c2 = this.p[m];
        var c3 = this.r[n];
        var c4 = this.r[m];
        

       
    
    
        for (i = 0; i <= steps; i++) {
            t = i / steps;
            this.x1 = curvePoint(c1.x, this.p[n].x, this.p[m].x, c2.x, t);
            this.y1 = curvePoint(c1.y, this.p[n].y, this.p[m].y, c2.y, t);
            fill(0, 0, 255);
            //ellipse(this.x1, this.y1, 5, 5);
            append(this.curve1, createVector(this.x1, this.y1));
        }
        for (i = 0; i <= steps; i++) {
            t = i / steps;
            this.x2 = curvePoint(c3.x, this.r[n].x, this.r[m].x, c4.x, t);
            this.y2 = curvePoint(c3.y, this.r[n].y, this.r[m].y, c4.y, t);
            fill(255, 0, 0);
            //ellipse(this.x2, this.y2, 5, 5);
            append(this.curve2, createVector(this.x2, this.y2));
        }
   

        
    }
    for (var i = 0; i <  this.curve1.length-2; i += 2) {
        append(this.path, this.curve1[i]);
        append(this.path, this.curve2[i]);
        append(this.path, this.curve2[i + 1]);
        append(this.path, this.curve1[i + 1]);
    }

    

}
LangeLadder.prototype.rotate = function(rot) {
    for (var i = 0; i < this.path.length; i++) {
        this.path[i].rotate(rot);
    }
}
LangeLadder.prototype.shift = function(x, y) {
    for (var i = 0; i < this.path.length; i++) {
        this.path[i].add(x, y);
    }
}
LangeLadder.prototype.draw = function() {
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < this.path.length; i++) {
        vertex(this.path[i].x, this.path[i].y);
    }
    endShape();
}