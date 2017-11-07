function DriehoeksLadder(a,b,c, steps){
    this.path = [];
    this.a = a.copy();
    this.b = b.copy();
    this.c = c.copy();
    
    this.d = this.a.copy().add(10,0);
    this.e = this.b.copy().add(10,10);
    this.f = this.c.copy().add(0,10);
    this.controls = [];
    this.steps = steps;
}
DriehoeksLadder.prototype.create = function(size){

   
    var bloem = new Bloem();
    corner = PI/2;
    
    
    this.path = this.path.concat(bloem.createRond(this.a, size, corner, 2.8));
    this.controls[0] = this.a.copy().add(0,-200);
    this.controls[1] = this.b.copy().add(-200,0);
    this.controls[2] = this.d.copy().add(0,-200);
    this.controls[3] = this.e.copy().add(-200,0);
    this.AB = new Ladder(this.a, this.b, this.d, this.e, this.controls);
    this.AB.create(this.steps);
    this.path = this.path.concat(this.AB.path);
    corner = -PI/6*5;
    this.path = this.path.concat(bloem.createRond(this.b,size,corner,2.8));
    this.controls[0] = this.b.copy().add(-200,0);
    this.controls[1] = this.c.copy().add(200,200);
    this.controls[2] = this.e.copy().add(-200,0);
    this.controls[3] = this.f.copy().add(200,200);
    this.BC = new Ladder(this.b, this.c, this.e, this.f, this.controls);
    this.BC.create(this.steps);
    this.path = this.path.concat(this.BC.path);
    corner = -PI/3;
    this.path = this.path.concat(bloem.createRond(this.c, size, corner,2.8));
    this.controls[0] = this.c.copy().add(200,0);
    this.controls[1] = this.a.copy().add(200,200);
    this.controls[2] = this.f.copy().add(200,0);
    this.controls[3] = this.d.copy().add(200,200);
    this.CA = new Ladder(this.c, this.a, this.f, this.d, this.controls);
    this.CA.create(this.steps);
    this.path = this.path.concat(this.CA.path);
    return this.path;
}
