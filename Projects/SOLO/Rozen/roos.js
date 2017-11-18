function Roos() {
    this.path;
    this.blob;
    this.steps;
    this.g;
    this.size;
    this.hoek;
    this.radius1;
    this.radius2;
}
Roos.prototype.init = function(steps, size) {
    this.path = [];
    this.blob = [];
    this.steps = steps;
    this.g = 0;
    this.size = size;
    this.hoek = TWO_PI / (this.steps - 1);
    this.radius1 = this.size / 2;
    this.radius2 = this.size;
}

Roos.prototype.create = function(center) {
    this.init(30, 200);
    this.path = [];
    var p = center.copy();
    var z = 0;

    append(this.path, p);
    for (var b = 0; b < this.steps * 15; b++) {

        var p = center.copy();
        var s = random(this.radius2 - 50, this.radius2)
        p.x += s * cos((this.hoek * b));
        p.y += s * sin((this.hoek * b));
        if (b % this.steps == 0) { z += 0.1 }
        p.z = 0.2 + (z);
        append(this.path, p);
        this.radius2 -= 0.2;
    }



    var max = this.path.length - 1;

    for (var i = 0; i < max; i++) {
        append(this.path, this.path[max - i]);
    }
    return this.path;
}