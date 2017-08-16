function Shape(max) {
    this.p = [];
    this.max = max;
    this.strokecolor;
    this.fillcolor;
    this.strokeweight;

    for (var i = 0; i < max; i++) {
        this.p[i] = createVector(0, 0);
    }
    this.style(0, 255, 1);

}
Shape.prototype.style = function(strokecolor, fillcolor, strokeweight) {
    this.strokecolor = strokecolor;
    this.fillcolor = fillcolor;
    this.strokeweight = strokeweight;
}
Shape.prototype.start = function(s) {
    for (var i = 0; i < this.max; i++) {
        this.p[i] = createVector(s.x, s.y);

    }
}
Shape.prototype.change = function(i, s) {
    this.p[i].x += s.x;
    this.p[i].y += s.y;
}
Shape.prototype.size = function(s, r) {
    if (r == 0) {
        this.p[0].x -= random(s / 2);
    } else {
        this.p[0].x -= s / 2;
    }
    this.p[0].y -= s / 2;
    this.p[1].x += s / 2;
    this.p[1].y -= s / 2;
    this.p[2].x += s / 2 + map(this.p[0].y, 0, height, 0, 100);
    this.p[2].y += s / 2 + map(this.p[0].x, 0, width, 0, 100);
    this.p[3].x -= s / 2 + map(this.p[0].y, 0, height, 0, 100);
    this.p[3].y += s / 2 + map(this.p[0].x, 0, width, 0, 100);

}
Shape.prototype.changeToRect = function(s) {
    for (var i = 0; i < this.max; i++) {
        var vector = createVector(0, 0);
        if (i % 4 == 0) {
            vector.x -= s / 2;
            vector.y -= s / 2;
        }
        if (i % 4 == 1) {
            vector.x += (s / 2);
            vector.y -= s / 2;
        }
        if (i % 4 == 2) {
            vector.x += s / 2;
            vector.y += s / 2;
        }
        if (i % 4 == 3) {
            vector.x -= s / 2;
            vector.y += s / 2;
        }
        this.change(i, vector);
    }

}
Shape.prototype.draw = function(pg) {
    if (this.strokecolor == -1) {
        pg.noStroke();
    } else {
        pg.stroke(this.strokecolor);
    }
    if (this.fillcolor == -1) {
        pg.noFill();
    } else {
        pg.fill(this.fillcolor);
    }
    pg.strokeWeight(this.strokeweight);

    pg.beginShape();

    for (var i = 0; i < this.max; i++) {
        pg.vertex(this.p[i].x, this.p[i].y);

    }
    pg.endShape(CLOSE);

}