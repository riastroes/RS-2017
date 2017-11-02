function Bloem(){
    this.path = [];
}
Bloem.prototype.createRond = function(pos, size, corner,  z){
    this.path = [];
    var p = pos.copy();
    p.z = -1;
    var apath = [];
    
    append( apath, p);
    for(var t = 10; t < size; t += 10){
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
