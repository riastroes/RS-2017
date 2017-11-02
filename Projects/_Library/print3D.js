function Print3D(printer, material, style, maxlayers) {

    this.settings = new Settings(printer, material, style);
    this.gcode = new Gcode(this.settings);

    this.totlayerheight = 0;
    this.layers = [];

    this.maxlayers = maxlayers;
    this.skirt = new Skirt(150, 50, 950, 70);
    this.createLayers();


}
Print3D.prototype.createLayers = function() {

    for (var l = 0; l < this.maxlayers; l++) {
        this.layers[l] = new Layer(l, this.settings, this.totlayerheight);
        this.layers[l].add(this.skirt.p);
    }

}
Print3D.prototype.addToLayer = function(layer, path) {
    this.layers[layer].add(path);
}
Print3D.prototype.print = function() {

    for (var l = 0; l < this.maxlayers; l++) {
        this.layers[l].generate(l, this.gcode);
        this.layers[l].draw(0);
    }

    this.gcode.generateLayers(this.layers);
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