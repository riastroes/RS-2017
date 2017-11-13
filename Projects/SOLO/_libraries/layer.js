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

        if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
            append(this.p, p);
        } else {
            console.log("FATAL ERROR IN PRINT");
        }



    }
}

Layer.prototype.addPoint = function(vector) {
    append(this.p, vector);
}

Layer.prototype.add = function(path) {
    for (var i = 0; i < path.length; i++) {
        var p = path[i].copy();
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
Layer.prototype.draw = function() {
    strokeWeight = 1;


    noFill();
    if (this.p.length > 0) {


        beginShape();
        if (this.p[0].z == 0) {
            stroke(0);
        }
        if (this.p[0].z > 0) {
            stroke(255, 0, 0);
        }
        if (this.p[0].z == -1) {
            stroke(0, 0, 255);
        }

        vertex(this.p[0].x, this.p[0].y);

        for (var i = 1; i < this.p.length; i++) {
            if (this.p[i].z == 0) {
                stroke(250,250,200);
            }
            if (this.p[i].z > 0) {
                stroke(0);
            }
            if (this.p[i].z == -1) {
                stroke(0, 0, 255);
            }

            if ((abs(this.p[i].x - this.p[i - 1].x) > 1 || abs(this.p[i].y - this.p[i - 1].y) > 1)) {

                vertex(this.p[i].x, this.p[i].y);
            }

        }
        endShape();
    }
}

Layer.prototype.generate = function(layer, gcode) {
    var nz = (layer * this.layerheight); // nz = normaal niveau
    append(this.commands, "G0 Z" + (nz + this.layerheight));


    for (var i = 0; i < this.p.length; i++) {


        var x = this.p[i].x * this.scale;
        x = floor(x * 100) / 100;
        var y = this.p[i].y * this.scale;
        y = floor(y * 100) / 100;
        var z = floor(this.p[i].z * 10) / 10;

        var dvector = p5.Vector.sub(this.p[i], this.p[i - 1]);
        var d = dvector.mag() * this.scale;
        if (i > 0) {
            if (z != floor(this.p[i - 1].z * 10) / 10) {
                // andere hoogte
                z = (nz + this.layerheight);
            }
        }


        if (z == -1) { //transport
            append(this.commands, "G0 X" + x + " Y" + y);
        } else if (z == 0) { // normale hoogte
            gcode.extrude += (d * this.thickness);
            append(this.commands, "G1 X" + x + " Y" + y + " E" + gcode.extrude);
        } else {
            gcode.extrude += (d * this.thickness);
            append(this.commands, "G1 X" + x + " Y" + y + " Z" + z + " E" + gcode.extrude);
        }
    }
}