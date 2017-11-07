function VierhoeksLadder(start, size){
    this.p = [];
    this.r = [];
    this.path = [];
   
    this.size = size;
    this.start = start; //createVector(600,300)
   
    this.controls = [];
    this.steps = 10;
    

    append(this.p, this.start.copy());
    append(this.r, this.start.copy().add(0,5));
    

    append(this.p, this.p[0].copy().add(size,size)); //createVector(700,400));
    append(this.r, this.r[0].copy().add(size,size));
    append(this.p, this.p[1].copy().add(size,-size)); // createVector(800,300));
    append(this.r, this.r[1].copy().add(size,-size)); 
    append(this.p, this.p[2].copy().add(size,size)); //createVector(900,400));
    append(this.r, this.r[2].copy().add(size,size)); //this.p[3].copy().add(0,5));
    append(this.p, this.p[3].copy().add(-size,size)); //createVector(800,500));
    append(this.r, this.r[3].copy().add(-size,size)); //this.p[4].copy().add(0,5));
    append(this.p, this.p[4].copy().add(size,size)); //createVector(900,600));
    append(this.r, this.r[4].copy().add(size,size));
    append(this.p, this.p[5].copy().add(-size,size)); //createVector(800,700));
    append(this.r, this.r[5].copy().add(-size,size));
    append(this.p, this.p[6].copy().add(-size,-size)); //createVector(700,600));
    append(this.r, this.r[6].copy().add(-size,-size)); //this.p[7].copy().add(0,5));
    append(this.p, this.p[7].copy().add(-size,size));  //createVector(600,700));
    append(this.r, this.r[7].copy().add(-size,size)); //this.p[8].copy().add(0,5));
    append(this.p, this.p[8].copy().add(-size,-size));  //createVector(500,600));
    append(this.r, this.r[8].copy().add(-size,-size));  //this.p[9].copy().add(0,5));
    append(this.p, this.p[9].copy().add(size,-size));  //createVector(600,500));
    append(this.r, this.r[9].copy().add(size,-size));  //this.p[10].copy().add(0,5));
    append(this.p, this.p[10].copy().add(-size,-size)); // createVector(500,400));
    append(this.r, this.r[10].copy().add(-size,-size)); // this.p[11].copy().add(0,5));

   
}
VierhoeksLadder.prototype.create = function(metbloemen){
    if(metbloemen){
        var bloem = new Bloem();
    }
    
    var corner = 0;
    for(var i = 0; i < 12; i+=1){
        var j = i + 1;
        if (j == 12){ j = 0;}{
            this.createLadder(this.p[i],this.p[j],this.r[i],this.r[j]);
        }
        if( (i == 0) || (i == 3)|| (i == 6)|| (i == 9)){
           if((i == 0)){
                corner = -PI/2;
           }
           if((i == 3)){
                corner = 0;
            }
            if((i == 6)){
                corner = PI/2;
        }
        if((i == 9)){
            corner = PI;
         }
         if(metbloemen){
            this.path = this.path.concat(bloem.createRond(this.p[i+1],(this.size/10*7),corner,2.8));
         }
        }
    }
   
    return this.path;
}
VierhoeksLadder.prototype.createLadder = function(a,b,c,d, i){
    if((i % 3) == 1){
        this.controls[0] = a.copy().add(0,0);
        this.controls[1] = createVector(700,700);
        this.controls[2] = c.copy().add(0,0);
        this.controls[3] = createVector(700,700);
    }
    else{
        this.controls[0] = a.copy();
        this.controls[1] = b.copy();
        this.controls[2] = c.copy();
        this.controls[3] = d.copy();
    }

    this.AB = new Ladder(a,b,c,d, this.controls);
    this.AB.create(this.steps);
    this.path = this.path.concat(this.AB.path);
    
    
}