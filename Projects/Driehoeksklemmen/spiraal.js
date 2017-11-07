function Spiraal(){
    this.path = [];
}
Spiraal.prototype.create = function(pos, size, corner,  z){
    this.path = [];
    var p = pos.copy();
    p.z = -1;
    var apath = [];
    var steps = size/8;
    
    append( apath, p);
    for(var t = 2; t < size-5; t += steps){
        for(var i = 0; i <= 10; i++ ){
            var p = pos.copy();
            p.x += (t+i) * cos(corner +  (i*(TWO_PI / 10)));
            p.y += (t+i) * sin(corner +(i*(TWO_PI / 10)));
            p.z = z;
            append( apath, p);
            append( this.path, p);
         }
    }
    for(var i = apath.length - 2; i >=0 ; i--){
        append( this.path, apath[i]);
    }
    
    
    return this.path;
}
