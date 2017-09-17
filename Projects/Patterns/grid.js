function Grid() {
    this.p = [];

}
Grid.prototype.init = function(maxx, maxy) {
    var i = 0;
    var w = width / maxx;
    var h = height / maxy;
    for (var y = 0; y < (height); y += h) {
        for (var x = 0; x < (width); x += w) {
            this.p[i] = createVector(x + (w / 2), y + (h / 2), 0);
            i++;

        }
    }
}
Grid.prototype.maskCircle = function(pos, radius) {
    //pos is an position
    var tot = [];
    var newp = [];
    var n = 0;

    for (var i = 0; i < this.p.length; i++) {

        if (dist(pos.x, pos.y, this.p[i].x, this.p[i].y) < radius) {
            newp[n] = this.p[i].copy();
            n += 1;
        }
    }


    this.p = [];
    this.p = newp;

}
Grid.prototype.maskCircles = function(pos, radius) {
    //pos is an array of positions
    var newp = [];
    var n = 0;
    for (var m = 0; m < pos.length; m++) {
        for (var i = 0; i < this.p.length; i++) {

            if (dist(pos[m].x, pos[m].y, this.p[i].x, this.p[i].y) < radius) {
                newp[n] = this.p[i].copy();
                n += 1;
            }
        }

    }
    this.p = [];
    this.p = newp;

}
Grid.prototype.round = function(radius, grow) {
    var center = createVector(width / 2, height / 2);
    var i = 0;
    var j = 4;
    for (var s = 0; s < width / 2; s += grow) {
        radius += grow;
        j += 4
        for (var r = 0; r < 360 - (360 / j); r += (360 / (j + 1))) {
            this.p[i] = center.copy();
            this.p[i].x += (radius * cos(r));
            this.p[i].y += (radius * sin(r));
            i += 1;
        }
    }
}
Grid.prototype.draw = function() {
    stroke(0);
    strokeWeight(3);
    for (var i = 0; i < this.p.length; i++) {
        point(this.p[i].x, this.p[i].y);
    }
}