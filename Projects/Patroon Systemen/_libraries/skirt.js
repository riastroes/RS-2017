function Skirt(minx, miny, maxx, maxy, start) {
    this.p = [];
    this.p[0] = createVector(minx, miny, 0);
    this.p[1] = createVector(maxx, miny, 0);
    this.p[2] = createVector(minx, maxy, 0);
    this.p[3] = createVector(maxx, maxy, 0);


}