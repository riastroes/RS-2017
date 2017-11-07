function Skirt(minx, miny, maxx, maxy, start) {
    this.p = [];
    this.p[0] = createVector(minx, miny);
    this.p[1] = createVector(maxx, miny);
    this.p[2] = createVector(minx, maxy);
    this.p[3] = createVector(maxx, maxy);


}