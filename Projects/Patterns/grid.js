function Grid() {
    this.p = [];
    this.newp = [];


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
    this.newp = [];
    var reversep = [];
    var n = 0;
    var r = 0;
    var nrechts = true;

    this.newp[0] = this.p[0].copy();
    n = 1;

    for (var i = 1; i < this.p.length; i++) {
        if (this.p[i].y != this.p[i - 1].y) {
            nrechts = !nrechts;
            if (reversep.length > 0) {

                console.log(reversep);
                for (var j = reversep.length - 1; j >= 0; j--) {
                    this.newp[n] = reversep[j].copy();
                    n += 1;
                }
                reversep = [];
                r = 0;
            }
        }

        if (nrechts) { //naar rechts: this.p[i].x > this.p[i - 1].x
            this.newp[n] = this.p[i].copy();
            n += 1;
        } else { //naar links
            reversep[r] = this.p[i].copy();
            r += 1;
        }


    }
    if (reversep.length > 0) {
        for (var j = reversep.length - 1; j >= 0; j--) {
            this.newp[n] = reversep[j].copy();
            n += 1;
        }
    }

    this.p = [];
    for (var i = 0; i < this.newp.length; i++) {
        this.p[i] = this.newp[i].copy();
    }

}
Grid.prototype.mask = function() {
    this.newp = [];
    var n = 0;
    loadPixels();


    for (var i = 0; i < this.p.length; i++) {
        var r = (this.p[i].y) % 4;
        var s = (this.p[i].x) % 4;
        var x = this.p[i].x - s;
        var y = this.p[i].y - r;


        var idx = (y * width * 4) + (x * 4);
        if (idx >= pixels.length) {
            console.log("idx: " + idx);
        }

        if (pixels[idx] == 0) {
            this.newp[n] = this.p[i].copy();
            n += 1;
        }

    }
    if (this.newp.length > 0) {

        this.p = [];
        for (var i = 0; i < this.newp.length; i++) {
            this.p[i] = this.newp[i].copy();
        }
    }

}
Grid.prototype.maskImage = function(pmarge, img) {
    this.newp = [];
    var n = 0;
    img.loadPixels();


    for (var i = 0; i < this.p.length; i++) {
        var r = (this.p[i].y - pmarge) % 4;
        var s = (this.p[i].x - pmarge) % 4;
        if ((img.pixels[(((this.p[i].y - pmarge) - r) * img.width * 4) + (((this.p[i].x - pmarge) - s) * 4) + 3] == 255) &&
            (img.pixels[(((this.p[i].y - pmarge) - r) * img.width * 4) + (((this.p[i].x - pmarge) - s) * 4)] < 10)) {
            this.newp[n] = this.p[i].copy();
            n += 1;

        }
    }
    if (this.newp.length > 0) {

        this.p = [];
        for (var i = 0; i < this.newp.length; i++) {
            this.p[i] = this.newp[i].copy();
        }
    }

}
Grid.prototype.defineRand = function() {
    this.rand = [];
    this.rand[0] = this.p[0].copy();
    var n = 1;
    for (var i = 1; i < this.p.length; i++) {
        if (this.p[i].y != this.p[i - 1]) {
            this.rand[n] = this.p[[i - 1]].copy();
            this.rand[n + 1] = this.p[[i]].copy();
            n += 2;
        }
    }
    this.rand[n] = this.p[this.p.length - 1].copy();

}
Grid.prototype.maskCircle = function(pos, radius) {
    //pos is a position
    var tot = [];
    this.newp = [];
    var n = 0;

    for (var i = 0; i < this.p.length; i++) {

        if (dist(pos.x, pos.y, this.p[i].x, this.p[i].y) < radius) {
            this.newp[n] = this.p[i].copy();
            n += 1;
        }
    }
    if (this.newp.length > 0) {
        this.p = [];
        for (var i = 0; i < this.newp.length; i++) {
            this.p[i] = this.newp[i].copy();
        }
    }

}
Grid.prototype.maskCircles = function(pos, radius) {
    //pos is an array of positions
    this.newp = [];
    var n = 0;
    for (var m = 0; m < pos.length; m++) {
        for (var i = 0; i < this.p.length; i++) {

            if (dist(pos[m].x, pos[m].y, this.p[i].x, this.p[i].y) < radius) {
                this.newp[n] = this.p[i].copy();
                n += 1;
            }
        }

    }
    if (this.newp.length > 0) {
        this.p = [];
        for (var i = 0; i < this.newp.length; i++) {
            this.p[i] = this.newp[i].copy();
        }
    }

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
    stroke(0, 0, 255);
    strokeWeight(3);
    for (var i = 0; i < this.newp.length; i++) {
        point(this.newp[i].x, this.newp[i].y);
    }


}