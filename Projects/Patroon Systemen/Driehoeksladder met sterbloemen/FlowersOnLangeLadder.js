function FlowersOnLangeLadder(center, size, corner) {
    this.p = [];
    this.r = [];
    this.path = [];

    this.size = size;
    this.center = center;
    this.start = start; //createVector(600,300);



    this.controls = [];
    this.steps = 10;

    this.getPR(this.center, this.size, corner);




}
FlowersOnLangeLadder.prototype.getPR = function(start, size, corner) {
    var next;
    append(this.p, start.copy());
    next = start.copy().add(1.5 * size, 2 * size);
    append(this.p, next.copy());
    next = next.copy().add(-3 * size, 0);
    append(this.p, next.copy());



    for (var i = 0; i < this.p.length; i++) {
        this.r[i] = this.p[i].copy().add(5, 5);
    }

}

FlowersOnLangeLadder.prototype.create2 = function(flowers) {
    var bloem = new Bloem();
    var b = [];
    var corner = 0;

    this.AB = new LangeLadder(this.p, this.r);
    this.AB.create(this.steps);
    this.path = this.path.concat(this.AB.path);

    if (flowers) {

        for (var i = 0; i < 3; i++) {
            var p = this.p[i].copy();
            fill(255, 0, 0);
            ellipse(p.x, p.y, 10, 10);
            if (i == 1) { corner = -PI / 3; }
            if (i == 2) { corner = PI / 3; }
            this.path = this.path.concat(bloem.lijn(p, 50, corner, 0));

        }
    }


    return this.path;
}
FlowersOnLangeLadder.prototype.create = function(metbloemen) {
    var bloem;
    var corner = 0;
    if (metbloemen) {
        bloem = new Bloem();
    }




    return this.path;
}
FlowersOnLangeLadder.prototype.createLadder = function(a, b, c, d, i) {

    this.controls[0] = a.copy();
    this.controls[1] = b.copy();
    this.controls[2] = c.copy();
    this.controls[3] = d.copy();


    this.AB = new Ladder(a, b, c, d, this.controls);
    this.AB.create(this.steps);
    this.path = this.path.concat(this.AB.path);


}