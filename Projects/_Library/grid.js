function Grid(pos) {
    this.pos = pos;
    this.p = [];
    this.newp = [];
    this.gridwidth;
    this.gridheight;
    this.gridcolors = [];

    this.c = [];
    this.palette = new Color();
    this.colormarge = 20;


}
Grid.prototype.init = function(marge, maxx, maxy) {
    var i = 0;
    var w = (width - (2 * marge)) / maxx;
    this.gridwidth = w;
    var h = (height - (2 * marge)) / maxy;
    this.gridheight = h;
    for (var y = 0; y < maxy; y++) {
        for (var x = 0; x < maxx; x++) {
            this.p[i] = createVector(marge + ((x * w) + (w / 2)), marge + ((y * h) + (h / 2)), 0);
            i++;

        }
    }
}
Grid.prototype.init2 = function( gridw, gridh, maxx, maxy) {
    var i = 0;
    var w = gridw / maxx;
    this.gridwidth = w;
   
    var h = gridh / maxy;
    this.gridheight = h;
    for (var y = 0; y < maxy; y++) {
        for (var x = 0; x < maxx; x++) {
            this.p[i] = createVector(this.pos.x + ((x * w) + (w / 2)), this.pos.y + ((y * h) + (h / 2)), 0);
            i++;

        }
    }
}
Grid.prototype.init2vertical = function( gridw, gridh, maxx, maxy) {
    var i = 0;
    var w = gridw / maxx;
    this.gridwidth = w;
   
    var h = gridh / maxy;
    this.gridheight = h;
    for (var x = 0; x < maxx; x++) {
        for (var y = 0; y < maxy; y++) {
            this.p[i] = createVector(this.pos.x + ((x * w) + (w / 2)), this.pos.y + ((y * h) + (h / 2)), 0);
            i++;

        }
    }
}
Grid.prototype.reordervertical = function() {
    this.newp = [];
    var reversep = [];
    var n = 0;
    var r = 0;
    var nrechts = true;

    this.newp[0] = this.p[this.p.length-1].copy();
    n = 1;

    for (var i = this.p.length-2; i >0; i--) {

        if (this.p[i].x != this.p[i + 1].x) {
            nrechts = !nrechts;
            if (reversep.length > 0) {

                for (var j = reversep.length - 1; j >= 0; j--) {
                    this.newp[n] = reversep[j].copy();
                    n += 1;
                }
                reversep = [];
                r = 0;
            }
        }

        if (nrechts) { //naar rechts: this.p[i].x > this.p[i - 1].x
            this.newp[n] = this.p[i].copy();
            n += 1;
        } else { //naar links
            reversep[r] = this.p[i].copy();
            r += 1;
        }


    }
    if (reversep.length > 0) {
        for (var j = reversep.length - 1; j >= 0; j--) {
            this.newp[n] = reversep[j].copy();
            n += 1;
        }
    }
    //append(this.newp, this.p[this.p.length-1]);
    this.p = [];
    for (var i = 0; i < this.newp.length; i++) {
        this.p[i] = this.newp[i].copy();
    }


}
Grid.prototype.reorder = function() {
    this.newp = [];
    var reversep = [];
    var n = 0;
    var r = 0;
    var nrechts = true;

    this.newp[0] = this.p[0].copy();
    n = 1;

    for (var i = 1; i < this.p.length; i++) {
        if (this.p[i].y != this.p[i - 1].y) {
            nrechts = !nrechts;
            if (reversep.length > 0) {

                for (var j = reversep.length - 1; j >= 0; j--) {
                    this.newp[n] = reversep[j].copy();
                    n += 1;
                }
                reversep = [];
                r = 0;
            }
        }

        if (nrechts) { //naar rechts: this.p[i].x > this.p[i - 1].x
            this.newp[n] = this.p[i].copy();
            n += 1;
        } else { //naar links
            reversep[r] = this.p[i].copy();
            r += 1;
        }


    }
    if (reversep.length > 0) {
        for (var j = reversep.length - 1; j >= 0; j--) {
            this.newp[n] = reversep[j].copy();
            n += 1;
        }
    }
    //append(this.newp, this.p[this.p.length-1]);
    this.p = [];
    for (var i = 0; i < this.newp.length; i++) {
        this.p[i] = this.newp[i].copy();
    }

}
Grid.prototype.reorderc = function() {
    this.newp = [];
    var reversep = [];
    var n = 0;
    var r = 0;
    var nrechts = true;

    this.newp[0] = this.c[0].copy();
    n = 1;

    for (var i = 1; i < this.c.length; i++) {
        
        if (this.c[i].p.y != this.c[i - 1].p.y) {
            nrechts = !nrechts;
            if (reversep.length > 0) {

                for (var j = reversep.length - 1; j >= 0; j--) {
                    this.newp[n] = reversep[j].copy();
                    n += 1;
                }
                reversep = [];
                r = 0;
            }
        }

        if (nrechts) { //naar rechts: this.p[i].x > this.p[i - 1].x
            this.newp[n] = this.c[i].copy();
            n += 1;
        } else { //naar links
            reversep[r] = this.c[i].copy();
            r += 1;
        }
        

    }
    if (reversep.length > 0) {
        for (var j = reversep.length - 1; j >= 0; j--) {
            this.newp[n] = reversep[j].copy();
            n += 1;
        }
    }

    this.c = [];
    for (var i = 0; i < this.newp.length; i++) {
        this.c[i] = this.newp[i].copy();
    }

}
Grid.prototype.mask = function() {
    this.newp = [];
    var n = 0;
    loadPixels();


    for (var i = 0; i < this.p.length; i++) {
        var r = (this.p[i].y) % 4;
        var s = (this.p[i].x) % 4;
        var x = this.p[i].x - s;
        var y = this.p[i].y - r;


        var idx = (y * width * 4) + (x * 4);
        if (idx >= pixels.length) {
            console.log("idx: " + idx);
        }

        if (pixels[idx] == 0) {
            this.newp[n] = this.p[i].copy();
            n += 1;
        }

    }
    if (this.newp.length > 0) {

        this.p = [];
        for (var i = 0; i < this.newp.length; i++) {
            this.p[i] = this.newp[i].copy();
        }
    }

}
Grid.prototype.maskColorImage = function(pmarge, img, acolor) {
    this.newp = [];
    var n = 0;
    img.loadPixels();


    for (var i = 0; i < this.p.length; i++) {
        var r = (this.p[i].y - pmarge) % 4;
        var s = (this.p[i].x - pmarge) % 4;
        var index = (((this.p[i].y - pmarge) - r) * img.width * 4) + (((this.p[i].x - pmarge) - s) * 4)
        if (img.pixels[index + 3] == 255){
            if(img.pixels[index] -red(acolor)==0 && img.pixels[index+1] -green(acolor)==0  && img.pixels[index+2] -blue(acolor)==0 ){
            this.newp[n] = this.p[i].copy();
            n += 1;
            }

        }
    }
    if (this.newp.length > 0) {

        this.p = [];
        for (var i = 0; i < this.newp.length; i++) {
            this.p[i] = this.newp[i].copy();
        }
    }

}
Grid.prototype.maskColorImage2 = function(pmargew, pmargeh, img, acolor) {
    this.newp = [];
    var n = 0;
    img.loadPixels();


    for (var i = 0; i < this.p.length; i++) {
        var r = (this.p[i].y - pmargeh) % 4;
        var s = (this.p[i].x - pmargew) % 4;
        var index = (((this.p[i].y - pmargeh) - r) * img.width * 4) + (((this.p[i].x - pmargew) - s) * 4)
        if (img.pixels[index + 3] == 255){
            if(img.pixels[index] -red(acolor)==0 && img.pixels[index+1] -green(acolor)==0  && img.pixels[index+2] -blue(acolor)==0 ){
            this.newp[n] = this.p[i].copy();
            n += 1;
            }

        }
    }
    if (this.newp.length > 0) {

        this.p = [];
        for (var i = 0; i < this.newp.length; i++) {
            this.p[i] = this.newp[i].copy();
        }
    }

}
Grid.prototype.maskImage = function(pmarge, img) {
    this.newp = [];
    var n = 0;
    img.loadPixels();


    for (var i = 0; i < this.p.length; i++) {
        var r = (this.p[i].y - pmarge) % 4;
        var s = (this.p[i].x - pmarge) % 4;
        if ((img.pixels[(((this.p[i].y - pmarge) - r) * img.width * 4) + (((this.p[i].x - pmarge) - s) * 4) + 3] == 255) &&
            (img.pixels[(((this.p[i].y - pmarge) - r) * img.width * 4) + (((this.p[i].x - pmarge) - s) * 4)] < 200)) {
            this.newp[n] = this.p[i].copy();
            n += 1;

        }
    }
    if (this.newp.length > 0) {

        this.p = [];
        for (var i = 0; i < this.newp.length; i++) {
            this.p[i] = this.newp[i].copy();
        }
    }

}
Grid.prototype.maskImage2 = function(pmargew, pmargeh, img) {
    this.newp = [];
    var n = 0;
    img.loadPixels();


    for (var i = 0; i < this.p.length; i++) {
        var r = (this.p[i].y - pmargeh) % 4;
        var s = (this.p[i].x - pmargew) % 4;
        if ((img.pixels[(((this.p[i].y - pmargeh) - r) * img.width * 4) + (((this.p[i].x - pmargew) - s) * 4) + 3] == 255) &&
            (img.pixels[(((this.p[i].y - pmargeh) - r) * img.width * 4) + (((this.p[i].x - pmargew) - s) * 4)] < 200)) {
            this.newp[n] = this.p[i].copy();
            n += 1;

        }
    }
    if (this.newp.length > 0) {

        this.p = [];
        for (var i = 0; i < this.newp.length; i++) {
            this.p[i] = this.newp[i].copy();
        }
    }

}
Grid.prototype.defineRand = function() {
    this.rand = [];
    this.rand[0] = this.p[0].copy();
    var n = 1;
    for (var i = 1; i < this.p.length; i++) {
        if (this.p[i].y != this.p[i - 1]) {
            this.rand[n] = this.p[[i - 1]].copy();
            this.rand[n + 1] = this.p[[i]].copy();
            n += 2;
        }
    }
    this.rand[n] = this.p[this.p.length - 1].copy();

}
Grid.prototype.maskCircle = function(pos, radius) {
    //pos is a position
    var tot = [];
    this.newp = [];
    var n = 0;

    for (var i = 0; i < this.p.length; i++) {

        if (dist(pos.x, pos.y, this.p[i].x, this.p[i].y) < radius) {
            this.newp[n] = this.p[i].copy();
            n += 1;
        }
    }
    if (this.newp.length > 0) {
        this.p = [];
        for (var i = 0; i < this.newp.length; i++) {
            this.p[i] = this.newp[i].copy();
        }
    }

}
Grid.prototype.maskCircles = function(pos, radius) {
    //pos is an array of positions
    this.newp = [];
    var n = 0;
    for (var m = 0; m < pos.length; m++) {
        for (var i = 0; i < this.p.length; i++) {

            if (dist(pos[m].x, pos[m].y, this.p[i].x, this.p[i].y) < radius) {
                this.newp[n] = this.p[i].copy();
                n += 1;
            }
        }

    }
    if (this.newp.length > 0) {
        this.p = [];
        for (var i = 0; i < this.newp.length; i++) {
            this.p[i] = this.newp[i].copy();
        }
    }

}
Grid.prototype.round = function(radius, grow) {
    var center = createVector(width / 2, height / 2);
    var i = 0;
    var j = 4;
    for (var s = 0; s < width / 2; s += grow) {
        radius += grow;
        j += 4
        for (var r = 0; r < 360 - (360 / j); r += (360 / (j + 1))) {
            this.p[i] = center.copy();
            this.p[i].x += (radius * cos(r));
            this.p[i].y += (radius * sin(r));
            i += 1;
        }
    }
}
Grid.prototype.changeToCenter = function() {
    var center = createVector(width / 2, height / 2);
    for (var i = 0; i < this.p.length; i++) {

        var sub = center.copy();
        sub.sub(this.p[i]);
        sub.normalize();
        sub.mult(sub.mag() * 150);
        this.p[i].add(sub);
    }

}

Grid.prototype.collectColors = function(pmargew, pmargeh, img, acolor) {
    this.c = [];
    var n = 0;
    img.loadPixels();
    var errors = 0
    var count = 0;
    var countwit = 0;
    


    for (var i = 0; i < this.p.length; i++) {
        var r = (this.p[i].y - pmargeh) % 4;
        var s = (this.p[i].x - pmargew) % 4;
        var index = (((this.p[i].y - pmargeh) - r) * img.width * 4) + (((this.p[i].x - pmargew) - s) * 4)
        var imgcolor = color(img.pixels[index],img.pixels[index+1],img.pixels[index+2],img.pixels[index+3]);
        
        if(this.palette.compare(imgcolor,acolor, this.colormarge) ){
            this.c[i] = new GridSpot(this.p[i].copy(), acolor);
            count++;
        }
        else if(this.palette.compare(imgcolor,color(255), this.colormarge) ){
            //wit
            var p = this.p[i].copy();
            p.z = -1;
            this.c[i] = new GridSpot(p, color(255));
            countwit++;
        }
        else if(this.palette.compare(imgcolor,color(0,255,0), this.colormarge) ){
            //green
            var p = this.p[i].copy();
            p.z = -1;
            this.c[i] = new GridSpot(p, color(0,255,0));
            countwit++;
        }
        else{
            //andere kleuren
            
            var p = this.p[i].copy();
            p.z = -1;
            this.c[i] = new GridSpot(p, color(255,0,0));
            errors++;
        }
           
        
    }
    console.log("ONBEKENDE KLEUREN:" + errors + " van " + this.p.length);
    console.log("KLEUR:" + count );
    console.log("WIT:" + countwit );
}
Grid.prototype.showErrors = function()
{
    stroke(255,0,0);
    for(var i = 0; i < this.c.length; i++){
        if(this.palette.compare(this.c[i].color, color(255,0,0), 50)){
            point(this.c[i].p.x, this.c[i].p.y);
        }
       
    }
    stroke(255,255,0)
    for(var i = 0; i < this.c.length-1; i++){
        if(floor(abs(this.c[i].p.x - this.c[i+1].p.x)) > this.gridsize){
            console.log(abs(this.c[i].p.x - this.c[i+1].p.x));
            line(this.c[i].p.x, this.c[i].p.y,this.c[i+1].p.x, this.c[i+1].p.y);
        }
    }
}
Grid.prototype.draw = function(acolor) {
    //strokeWeight(3);
    stroke(acolor);
   
    for (var i = 0; i < this.p.length; i++) {
        point(this.p[i].x, this.p[i].y);
    }
    //stroke(0);
  

}
Grid.prototype.draw2 = function() {
    strokeWeight(3);
    //stroke(acolor);
   
    for (var i = 0; i < this.p.length; i++) {
        stroke(this.c[i].color);
        point(this.p[i].x, this.p[i].y);
    }
    //stroke(0);
  

}
Grid.prototype.showMargin = function(marge){
    background(colors[2]);
    stroke(colors[0]);
    fill(colors[1]);
    rect(marge, marge, width- (2*marge), height - (2*marge));
}
Grid.prototype.showMargin2 = function(margew, margeh){
    background(colors[2]);
    stroke(colors[0]);
    fill(colors[1]);
    rect(margew, margeh, width- (2*margew), height - (2*margeh));
}

function GridSpot(pos, acolor){
    this.p = pos.copy();
    this.color = acolor;
}
GridSpot.prototype.copy = function(){
    return this;
}