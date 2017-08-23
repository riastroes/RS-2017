function Pattern(patternwidth, patternheight) {
    this.p = [];
    this.start;
    this.end;

    this.start = this.p[0] = createVector(-patternwidth / 2, -patternheight / 2);
    this.end = this.p[1] = createVector(patternwidth / 2, patternheight / 2);
    this.color = color(random(255), random(255), random(255));
}
Pattern.prototype.style = function(acolor, weight) {
    stroke(acolor);
    strokeWeight(weight);
}
Pattern.prototype.draw = function(center) {
    this.style(this.color, 10);
    push();
    translate(center.x, center.y);
    beginShape();
    vertex(this.p[0].x, this.p[0].y);
    vertex(this.p[0].x, this.p[1].y);
    vertex(this.p[1].x, this.p[1].y);
    endShape();
    pop();

}