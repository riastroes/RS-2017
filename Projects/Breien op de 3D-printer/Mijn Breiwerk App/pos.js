function Pos(x,y,z,t){
    this.x = x;
    this.y = y;
    this.z = z;
    this.t = t;  //thickness
}
Pos.prototype.copy = function(){
    var p = new Pos(this.x, this.y, this.z, this.t);
    return p;
}
Pos.prototype.add = function(pos){
    this.x += pos.x;
    this.y += pos.y;
    this.z += pos.z;
    this.t += pos.t;
}
Pos.prototype.add2= function(x,y, z,t){
    this.x += x;
    this.y += y;
    this.z += z;
    this.t += t;
}
