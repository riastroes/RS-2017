function Layer(layer, settings, totlayerheight) {
    this.layer = layer;
    this.layerheight = settings.layerheight;
    this.startlayerheight = totlayerheight;
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
    if (this.p.length > 1) {


        for (var i = 1; i < this.p.length; i++) {
            

            if (this.p[i].z == 0) {
                stroke(colors[0]);
            }
            if (this.p[i].z > 0) {
                stroke(colors[2]);
            }
            if (this.p[i].z == -1) {
                stroke(0, 255,255 );
            }

            line(this.p[i-1].x, this.p[i-1].y, this.p[i].x, this.p[i].y);
            

        }
       
    }
}

Layer.prototype.generate = function(layer, gcode) {
    //var nz = (layer * this.layerheight); // nz = normaal niveau
    var nz = floor(this.totallayerheight*100)/100  // nz = normaal niveau;
    append(this.commands, "G0 Z" + nz);


    for (var i = 0; i < this.p.length; i++) {


        var x = this.p[i].x * this.scale;
        x = floor(x * 100) / 100;
        var y = this.p[i].y * this.scale;
        y = floor(y * 100) / 100;
        var z = floor(this.p[i].z * 100) / 100;

        var dvector = p5.Vector.sub(this.p[i], this.p[i - 1]);
        var d = dvector.mag() * this.scale;
        
        if (this.p[i].z == -1) { //transport
            append(this.commands, "G0 X" + x + " Y" + y);
        } else  if(z == 0){
            gcode.extrude += (d * this.thickness);
            append(this.commands, "G1 X" + x + " Y" + y + " Z" + nz + " E" + gcode.extrude);
        }
        else  if(z > 0){
            z = floor((this.startlayerheight + z) * 100)/100;
            gcode.extrude += (d * this.thickness);
            append(this.commands, "G1 X" + x + " Y" + y + " Z" + z + " E" + gcode.extrude);
        }
    }
}