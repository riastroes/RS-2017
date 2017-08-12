function Grid(maxx, maxy) {

    this.p = [];

    var i = 0;
    for (var y = 0; y < maxy; y++) {
        for (var x = 0; x < maxx; x++) {
            this.p[i] = createVector((x + 1) * (width / (maxx + 1)), (y + 1) * (height / (maxy + 1)));
            i++;
        }
    }

}