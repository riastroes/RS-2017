function Pattern(patternwidth, patternheight) {
    this.p = [];

    this.p[0] = createVector(-patternwidth / 2, -patternheight / 2);
    this.p[1] = createVector(-patternwidth / 4, -patternheight / 2);
    this.p[2] = createVector(0, -patternheight / 2);
    this.p[3] = createVector(patternwidth / 4, -patternheight / 2);
    this.p[4] = createVector(patternwidth / 2, -patternheight / 2);

    this.p[5] = createVector(-patternwidth / 2, -patternheight / 4);
    this.p[6] = createVector(-patternwidth / 4, -patternheight / 4);
    this.p[7] = createVector(0, -patternheight / 4);
    this.p[8] = createVector(patternwidth / 4, -patternheight / 4);
    this.p[9] = createVector(patternwidth / 2, -patternheight / 4);

    this.p[10] = createVector(-patternwidth / 2, 0);
    this.p[11] = createVector(-patternwidth / 4, 0);
    this.p[12] = createVector(0, 0);
    this.p[13] = createVector(patternwidth / 4, 0);
    this.p[14] = createVector(patternwidth / 2, 0);

    this.p[15] = createVector(-patternwidth / 2, patternheight / 4);
    this.p[16] = createVector(-patternwidth / 4, patternheight / 4);
    this.p[17] = createVector(0, patternheight / 4);
    this.p[18] = createVector(patternwidth / 4, patternheight / 4);
    this.p[19] = createVector(patternwidth / 2, patternheight / 4);

    this.p[20] = createVector(-patternwidth / 2, patternheight / 2);
    this.p[21] = createVector(-patternwidth / 4, patternheight / 2);
    this.p[22] = createVector(0, patternheight / 2);
    this.p[23] = createVector(patternwidth / 4, patternheight / 2);
    this.p[24] = createVector(patternwidth / 2, patternheight / 2);

    this.path = [];

}
Pattern.prototype.style = function(acolor, weight) {
    stroke(acolor);
    strokeWeight = weight;
    noFill();
}
Pattern.prototype.create = function(alist, acolor, weight) {
    this.style(acolor, weight);
    this.path = [];
    for (var i = 0; i < alist.length; i++) {
        this.path[i] = createVector(this.p[alist[i]].x, this.p[alist[i]].y);
    }
}

Pattern.prototype.draw = function(center, a) {
    this.style(0, 1);
    push();
    translate(center.x, center.y);
    rotate(a);
    beginShape();
    for (var i = 0; i < this.path.length; i++) {
        vertex(this.path[i].x, this.path[i].y);
    }
    endShape();
    pop();

}