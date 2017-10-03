function Grid() {
    this.p = [];


}
Grid.prototype.init = function(marge, maxx, maxy) {
    var i = 0;
    var w = (width - (2 * marge)) / maxx;
    var h = (height - (2 * marge)) / maxy;
    for (var y = 0; y < maxy; y++) {
        for (var x = 0; x < maxx; x++) {
            this.p[i] = createVector(marge + ((x * w) + (w / 2)), marge + ((y * h) + (h / 2)), 0);
            i++;

        }
    }
}
Grid.prototype.reorder = function() {
    var newp = [];
    var reversep = [];
    var n = 0;
    var r = 0;
    var nrechts = true;

    for (var i = 1; i < this.p.length - 1; i++) {
        if (this.p[i].y != this.p[i - 1].y) {
            nrechts != nrechts;
            if (reversep.length > 0) {

                console.log(reversep.length);
                for (var j = reversep.length - 1; j >= 0; j--) {
                    newp[n] = reversep[j].copy();
                    n += 1;
                }
                reversep = [];
                r = 0;
            }
        } else {

            if (nrechts) { //naar rechts: this.p[i].x > this.p[i - 1].x
                newp[n] = this.p[i].copy();
                n += 1;
            } else { //naar links
                reversep[r] = this.p[i].copy();
                r += 1;
            }
        }

    }
    this.p = [];
    this.p = newp;
    for (var i = 0; i < this.p.length; i++) {
        console.log(this.p[i].x, this.p[i].y);
    }
}
Grid.prototype.maskImage = function(marge, img) {
    var newp = [];
    var n = 0;
    img.loadPixels();

    for (var i = 0; i < this.p.length; i++) {
        if ((img.pixels[((this.p[i].y - marge) * img.width * 4) + ((this.p[i].x - marge) * 4) + 3] == 255) &&
            (img.pixels[((this.p[i].y - marge) * img.width * 4) + ((this.p[i].x - marge) * 4)] == 0)) {
            newp[n] = this.p[i].copy();
            n += 1;

        }
    }
    this.p = [];
    this.p = newp;

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
Grid.prototype.changeToCenter = function() {
    var center = createVector(width / 2, height / 2);
    for (var i = 0; i < this.p.length; i++) {

        var sub = center.copy();
        sub.sub(this.p[i]);
        sub.normalize();
        sub.mult(sub.mag() * 150);
        this.p[i].add(sub);
    }

}
Grid.prototype.draw = function() {
    stroke(255, 0, 0);
    strokeWeight(3);
    for (var i = 0; i < this.p.length; i++) {
        point(this.p[i].x, this.p[i].y);
    }

}