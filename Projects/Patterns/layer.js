function Layer(layer, settings) {
    this.layer = layer;
    this.layerheight = settings.layerheight;
    totlayerheight += this.layerheight;
    this.totallayerheight = totlayerheight;

    this.thickness = settings.thickness;
    this.speed = settings.speed;
    this.scale = settings.scale;
    this.commands = new Array(";Layer " + this.layer);
    append(this.commands, ";param layerheight: " + this.layerheight);
    append(this.commands, ";param total layerheight: " + this.totallayerheight);
    append(this.commands, ";param thickness:   " + this.thickness);
    append(this.commands, ";param speed:       " + this.speed);
    append(this.commands, "G0 F" + this.speed);


    this.p = [];
}
Layer.prototype.draw = function(from, to, acolor) {
    strokeWeight = 1;
    stroke(acolor);
    noFill();
    beginShape();
    for (var i = from; i < to; i++) {
        vertex(this.p[i].x, this.p[i].y);
    }
    endShape();
}