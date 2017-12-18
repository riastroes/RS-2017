function Print3D(printer, material, style, maxlayers, startlayerheight, maxskirt) {

    this.settings = new Settings(printer, material, style);
    this.gcode = new Gcode(this.settings);

    this.startlayerheight = startlayerheight;
    this.layers = [];

    this.maxlayers = maxlayers;
    if (maxskirt == undefined) { maxskirt = 3; }
    this.maxskirt = maxskirt;

    this.skirt = new Skirt(150, 50, 750, 70);

    this.createLayers();
    this.last = this.skirt.p[this.maxskirt];


}
Print3D.prototype.createLayers = function() {
   
    for (var l = 0; l < this.maxlayers; l++) {
       
        this.layers[l] = new Layer(l, this.settings, this.startlayerheight);
        if (l == 0) {
            for (var s = 0; s <= this.maxskirt; s++) {
               
                this.addPointToLayer(l, this.skirt.p[s]);
            }

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
    var acolor = color(0);
    this.layers[layer].draw(acolor);


    this.gcode.generateLayer(this.layers[layer]);
    //this.gcode.generateLayers(this.layers);
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