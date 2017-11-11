function Print3D(printer, material, style, maxlayers) {

    this.settings = new Settings(printer, material, style);
    this.gcode = new Gcode(this.settings);

    this.totlayerheight = 1;
    this.layers = [];

    this.maxlayers = maxlayers;
    this.skirt = new Skirt(150, 50, 950, 70);
    this.createLayers();


}
Print3D.prototype.createLayers = function() {

    for (var l = 0; l < this.maxlayers; l++) {
        this.layers[l] = new Layer(l, this.settings, this.totlayerheight);
        if (l == 0) {
            this.layers[l].add(this.skirt.p);
        }
    }

}
Print3D.prototype.addToLayer = function(layer, path) {
    this.layers[layer].add(path);
}
Print3D.prototype.addPointToLayer = function(layer, vector) {
    this.layers[layer].addPoint(vector);

}
Print3D.prototype.start = function() {
    this.gcode.startCode();
}
Print3D.prototype.pause = function(sec) {
    this.gcode.pauseCode(sec);
}
Print3D.prototype.stop = function() {
    this.gcode.endCode();
}
Print3D.prototype.print = function(layer) {


    this.layers[layer].generate(layer, this.gcode); // generate commands
    this.layers[layer].draw();


<<<<<<< Updated upstream
    this.gcode.generateLayer(this.layers[layer]);
    //this.gcode.generateLayers(this.layers);
=======
    this.gcode.generateLayers(this.layers);
>>>>>>> Stashed changes
}
Print3D.prototype.checkPrint = function(path, minx, miny, maxx, maxy) {
    var ok = true;
    for (var i = 0; i < path.length; i++) {
        if (path[i].x < minx || path[i].x > maxx) {
            console.log("ILLEGAL x(" + path[i].x + "): i= " + i);
            ok = false;
        }
        if (path[i].y < miny || path[i].y > maxy) {
            console.log("ILLEGAL y(" + path[i].y + "): i= " + i);
            ok = false;
        }
    }
    return ok;
}