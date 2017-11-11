function Bloem() {
    this.path = [];
}
Bloem.prototype.createRond = function(pos, size, corner, z) {
    this.path = [];
    var p = pos.copy();
    p.z = -1;
    var apath = [];
    var steps = 7;

    append(apath, p);
    for (var t = 2; t < size; t += steps) {
        for (var i = 0; i <= 10; i++) {
            var p = pos.copy();
            p.x += (t + i) * cos(corner + (i * (TWO_PI / 10)));
            p.y += (t + i) * sin(corner + (i * (TWO_PI / 10)));
            p.z = z;
            append(apath, p);
            append(this.path, p);
        }
    }
    for (var i = apath.length - 2; i >= 0; i--) {
        //weer terug naar het begin
        append(this.path, apath[i]);
    }
    append(this.path, pos);


    return this.path;
}
Bloem.prototype.createKnop = function(pos, size, corner, z) {
    this.path = [];
    var p = pos.copy();
    p.z = -1;
    var apath = [];
    var steps = size / 8;

    append(this.path, p); //moveto
    p.z = 0;
    for (var h = 0; h < 3; h++) {
        z += 0.2;
        for (var t = 2; t < size; t += steps) {
            for (var i = 0; i <= 10; i++) {
                var p = pos.copy();
                p.x += (t) * cos(corner + (i * (TWO_PI / 10)));
                p.y += (t) * sin(corner + (i * (TWO_PI / 10)));
                p.z = z;
                append(this.path, p);
            }
        }
    }
    return this.path;
}

Bloem.prototype.createPijlPunten = function( pos, size, corner,  z){
    this.path = [];
    var p = pos.copy();
    p.z = -1;
    var apath = [];
    var steps = size/8;
    
    append( this.path, p); //moveto
    p.z = 0;
    for( var h = 0; h < 3; h++){
        z += 0.2;
        for(var t = 2; t < size; t += steps){
            for(var i = 0; i <= 3; i++ ){
                var p = pos.copy();
                p.x += (t) * cos(corner +  (i*(TWO_PI / 3)));
                p.y += (t) * sin(corner +  (i*(TWO_PI / 3)));
                p.z = z;
                append( this.path, p);
            }
        }
    }
    return this.path;
}
Bloem.prototype.createCirkel = function(pos, size, corner,  z){


    this.path = [];
    var p = pos.copy();
    p.z = -1;
    var apath = [];
    var steps = size / 8;

    //append( apath, p);

    for (var i = 0; i <= 10; i++) {
        var p = pos.copy();
        p.x += size * cos(corner + (i * (TWO_PI / 10)));
        p.y += size * sin(corner + (i * (TWO_PI / 10)));
        p.z = z;
        append(apath, p);
        append(this.path, p);
    }
    for (var i = 0; i <= 10; i++) {
        var p = pos.copy();
        p.x += size / 3 * cos(corner + (i * (TWO_PI / 10)));
        p.y += size / 3 * sin(corner + (i * (TWO_PI / 10)));
        p.z = z;
        append(apath, p);
        append(this.path, p);
    }
    for (var i = 0; i <= 10; i++) {
        var p = pos.copy();
        p.x += (size / 3 * 2) * cos(corner + (i * (TWO_PI / 10)));
        p.y += (size / 3 * 2) * sin(corner + (i * (TWO_PI / 10)));
        p.z = z;
        append(apath, p);
        append(this.path, p);
    }

    for (var i = apath.length - 2; i >= 0; i--) {
        append(this.path, apath[i]);
    }


    return this.path;
}

Bloem.prototype.createPatroon = function(pos, size, steps, corner, z){
    
    var p = pos.copy();
    var r = 0;
    p.z = -1;
    size += 20;
    //for(var ring = 0; ring < 8; ring++){
   //     size = size - 20;
    //    corner -= TWO_PI / (steps/2);
    //    r = 0;
    for(var i = 0; i <= (steps * 12); i++ ){
        if(i % steps == 0){
           // corner += (TWO_PI /steps)/2;
        }
        if(i % 4 == 0 ||i % 4 == 1){
            var p = pos.copy();
            p.x += (size-r) * cos(corner +  (i*(TWO_PI /steps)));
            p.y += (size-r) * sin(corner +(i*(TWO_PI / steps)));
            p.z = z;
            append( this.path, p);
        }
        else{
            var p = pos.copy();
            p.x += ((size-r)-60) * cos(corner +  (i*(TWO_PI /steps)));
            p.y += ((size-r)-60) * sin(corner +(i*(TWO_PI / steps)));
            p.z = z;
            append( this.path, p);
        }
        r += (20/steps);
     }

    
    var max = this.path.length-1;
    for(var i = 0; i < max; i++){
        append(this.path, this.path[max - i].copy());
    }
    
    
    
    return this.path;
}


Bloem.prototype.lijn = function(pos, size, corner, z) {

    this.path = [];
    var p = pos.copy();
    p.z = -1;
    var apath = [];
    var steps = size / 8;
    var g = 0;

    //append( apath, p);
    for (var bb = 0; bb < 12; bb++) {
        g -= 1;
        for (var i = 0; i <= 40; i++) {
            if (i % 5 == 0) {
                var p = pos.copy();
                if (i % 2 == 0) {
                    p.x += (size + (g * bb / 4)) * cos(corner + ((i - 1) * (TWO_PI / 40)));
                    p.y += (size + (g * bb / 4)) * sin(corner + ((i - 1) * (TWO_PI / 40)));
                } else {
                    p.x += (size / 22) * cos(corner + (i * (TWO_PI / 40)));
                    p.y += (size / 22) * sin(corner + (i * (TWO_PI / 40)));
                }
                append(this.path, p);

                if (i % 2 == 0) {
                    p.x += ((size) + (g * bb)) * cos(corner + (i * (TWO_PI / 40)));
                    p.y += ((size) + (g * bb)) * sin(corner + (i * (TWO_PI / 40)));
                } else {
                    p.x += (size / 2) * cos(corner + (i * (TWO_PI / 40)));
                    p.y += (size / 2) * sin(corner + (i * (TWO_PI / 40)));
                }
                append(this.path, p);
                if (i % 2 == 0) {
                    p.x += (size + (g * bb / 2)) * cos(corner + ((i + 1) * (TWO_PI / 40)));
                    p.y += (size + (g * bb / 2)) * sin(corner + ((i + 1) * (TWO_PI / 40)));
                } else {
                    p.x += (size / 2) * cos(corner + (i * (TWO_PI / 40)));
                    p.y += (size / 2) * sin(corner + (i * (TWO_PI / 40)));
                }
                append(this.path, p);



            }
        }
    }


    return this.path;

}

