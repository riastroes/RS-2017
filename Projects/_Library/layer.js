function Layer(layer, settings, totlayerheight) {
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
Layer.prototype.addPattern = function(offset, pos, path) {

    for (var i = 0; i < path.length; i++) {
        var p = pos.copy();
        p.add(offset);
        p.add(path[i]);
        p.z = 0.2;
        if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
            append(this.p, p);
        } else {
            console.log("FATAL ERROR IN PRINT");
        }



    }
}

Layer.prototype.add = function(path) {

    for (var i = 0; i < path.length; i++) {
        var p = path[i].copy();
        p.z = 0.2;
        append(this.p, p);
    }
}

Layer.prototype.change = function(min, max) {
    var r = [];
    for (var i = 1; i < this.p.length; i++) {
        r[0] = random(min, max);
        r[1] = random(min, max);
        this.p[i].x += r[0];
        this.p[i].y += r[1];
    }


}
Layer.prototype.draw = function(acolor) {
    strokeWeight = 1;
    stroke(acolor);
    noFill();
    if (this.p.length > 0) {


        beginShape();
        vertex(this.p[0].x, this.p[0].y);

        for (var i = 1; i < this.p.length; i++) {

            if ((abs(this.p[i].x - this.p[i - 1].x) > 1 || abs(this.p[i].y - this.p[i - 1].y) > 1)) {
                vertex(this.p[i].x, this.p[i].y);
            }

        }
        endShape();
    }
}

Layer.prototype.generate = function(layer, gcode) {
    var z = 0.2 + (layer * this.layerheight);
    append(this.commands, "G0 Z" + z);


    for (var i = 0; i < this.p.length; i++) {


        var x = this.p[i].x * this.scale;
        x = floor(x * 100) / 100;
        var y = this.p[i].y * this.scale;
        y = floor(y * 100) / 100;
        var z;
        if (i == 0) {
            z = 0;
        } else {
            z = this.p[i].z;
        }

        var dvector = p5.Vector.sub(this.p[i], this.p[i - 1]);
        var d = dvector.mag() * this.scale;


        var kz = this.totallayerheight * z;
        if (z == 0) {
            append(this.commands, "G0 X" + x + " Y" + y);
        } else {
            gcode.extrude += (d * this.thickness);
            append(this.commands, "G1 X" + x + " Y" + y + " E" + gcode.extrude);
        }
    }
}