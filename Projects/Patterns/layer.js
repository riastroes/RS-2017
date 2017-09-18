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
Layer.prototype.generate = function(layer, from,to){
    var z = 0.2 + (layer * this.layerheight);
    append(this.commands,"G0 Z" + z );
    for(var i = from; i < to; i++){
        
        
            var x = this.p[i].x * this.scale ;
            x = floor(x * 100)/100;
            var y = this.p[i].y * this.scale;
            y = floor(y * 100)/100;
            var z;
            if(i == from){
                z = 0;
            }
            else{
                z = this.p[i].z;
            }
            
            var dvector = p5.Vector.sub(this.p[i], this.p[i-1]);
            var d = dvector.mag()* this.scale;
        
        
            var kz = this.totallayerheight * z;
            if(z == 0){
              append(this.commands, "G0 X" + x + " Y" + y );
            }
            else{
              gcode.extrude += (d * this.thickness);
              append(this.commands, "G1 X" + x + " Y" + y + " E" + gcode.extrude );
            }
    }
}