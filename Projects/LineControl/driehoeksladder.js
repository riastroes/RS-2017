function DriehoeksLadder(a,b,c, steps){
    this.path = [];
    this.a = a;
    this.b = b;
    this.c = c;
    
    this.d = this.a.copy().add(-5,30);
    this.e = this.b.copy().add(0,10);
    this.f = this.c.copy().add(0,10);
    this.controls = [];
    this.steps = steps;
}
DriehoeksLadder.prototype.create = function(){

   
    var bloem = new Bloem();
    corner = PI/2;
    
    
    this.path = this.path.concat(bloem.createRond(this.a, 100, corner, 2.8));
    this.controls[0] = a.copy().add(0,-200);
    this.controls[1] = b.copy().add(-200,0);
    this.controls[2] = d.copy().add(0,-200);
    this.controls[3] = e.copy().add(-200,0);
    this.AB = new Ladder(this.a, this.b, this.d, this.e, this.controls);
    this.AB.create(this.steps);
    this.path = this.path.concat(this.AB.path);
    corner = -PI/5;
    this.path = this.path.concat(bloem.createRond(this.b, 100,corner,2.8));
    this.controls[0] = b.copy().add(-200,0);
    this.controls[1] = c.copy().add(200,200);
    this.controls[2] = e.copy().add(-200,0);
    this.controls[3] = f.copy().add(200,200);
    this.BC = new Ladder(this.b, this.c, this.e, this.f, this.controls);
    this.BC.create(this.steps);
    this.path = this.path.concat(this.BC.path);
    corner = PI + PI/8;
    this.path = this.path.concat(bloem.createRond(this.c, 100, corner,2.8));
    this.controls[0] = c.copy().add(200,0);
    this.controls[1] = a.copy().add(200,200);
    this.controls[2] = f.copy().add(200,0);
    this.controls[3] = d.copy().add(200,200);
    this.CA = new Ladder(this.c, this.a, this.f, this.d, this.controls);
    this.CA.create(this.steps);
    this.path = this.path.concat(this.CA.path);
    return this.path;
}
