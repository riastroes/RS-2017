function Ladder(a, b, c, d, controls) {
    this.a = a;
    this.b = b;

    this.c1 = controls[0];
    this.c2 = controls[1];

    this.c = c;
    this.d = d;

    this.c3 = controls[2];
    this.c4 = controls[3];

    this.curve1 = [];
    this.curve2 = [];
    this.path = [];
    this.steps = [];


}
Ladder.prototype.create = function(steps) {

   
    for (i = 0; i <= steps; i++) {
        t = i / steps;
        this.x1 = curvePoint(this.c1.x, this.a.x, this.b.x, this.c2.x, t);
        this.y1 = curvePoint(this.c1.y, this.a.y, this.b.y, this.c2.y, t);
        fill(0,0,255);
        //ellipse(this.x1, this.y1, 5, 5);
        append(this.curve1, createVector(this.x1, this.y1));
    }
    for (i = 0; i <= steps; i++) {
        t = i / steps;
        this.x2 = curvePoint(this.c3.x, this.c.x, this.d.x, this.c4.x, t);
        this.y2 = curvePoint(this.c3.y, this.c.y, this.d.y, this.c4.y, t);
        fill(255,0,0);
       // ellipse(this.x2, this.y2, 5, 5);
        append(this.curve2, createVector(this.x2, this.y2));
    }

    append(this.path, begin);
    for (var i = 0; i <= steps; i += 1) {
        append(this.path, this.curve1[i]);
    }
    for (var i = 0; i <= steps; i += 1) {
        append(this.path, this.curve2[(steps-i) ]);
    }
    



    for (var i = 0; i < steps; i += 2) {
        append(this.path, this.curve1[i]);
        append(this.path, this.curve2[i]);
        append(this.path, this.curve2[i + 1]);
        append(this.path, this.curve1[i + 1]);
    }
    append(this.path, end);

}
Ladder.prototype.rotate = function(rot) {
    for (var i = 0; i < this.path.length; i++) {
        this.path[i].rotate(rot);
    }
}
Ladder.prototype.shift = function(x, y) {
    for (var i = 0; i < this.path.length; i++) {
        this.path[i].add(x, y);
    }
}
Ladder.prototype.draw = function() {
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < this.path.length; i++) {
        vertex(this.path[i].x, this.path[i].y);
    }
    endShape();
}