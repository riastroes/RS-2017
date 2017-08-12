function Grid() {
    this.p = [];

}
Grid.prototype.init = function(maxx, maxy) {
    var i = 0;
    for (var y = height / (maxy + 1); y < height; y += height / (maxy + 1)) {
        for (var x = width / (maxx + 1); x < width; x += width / (maxx + 1)) {
            this.p[i] = createVector(x, y, 0);
            i++;

        }
    }
}
Grid.prototype.draw = function() {
    stroke(0);
    strokeWeight(3);
    for (var i = 0; i < grid.p.length; i++) {
        ellipse(this.p[i].x, this.p[i].y, 10, 10);
    }
}