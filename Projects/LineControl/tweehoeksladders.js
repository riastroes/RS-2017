function TweeHoeksLadder(center, size, corner){
    this.p = [];
    this.r = [];
    this.path = [];
    
    this.size = size;
    this.center = center;
    this.start = start; //createVector(600,300);

    
   
    this.controls = [];
    this.steps = 10;

    this.getPR(this.center, this.size, corner);
    

   
   
}
TweeHoeksLadder.prototype.getPR = function(center, size, corner){
    var i = 0;
    for(var step = 0 ; step < 16; step++ ){
        var hoek = (step * (TWO_PI/16)) +corner;
        if(step % 8 == 0){
            this.p[i] = createVector(0,0);
            this.p[i].x = center.x + ((size/3) * cos(hoek));
            this.p[i].y = center.y + ((size/3) * sin(hoek));
            this.r[i] = this.p[i].copy().add(0,5);
            i++;
        }
        if(step % 8 == 1){
            this.p[i] = createVector(0,0);
            this.p[i].x = center.x + ((size) * cos(hoek));
            this.p[i].y = center.y + ((size) * sin(hoek));
            this.r[i] = this.p[i].copy().add(0,5);
            i++;
        }
        
        if(step % 8 == 7){
            this.p[i] = createVector(0,0);
            this.p[i].x = center.x + ((size) * cos(hoek));
            this.p[i].y = center.y + ((size) * sin(hoek));
            this.r[i] = this.p[i].copy().add(0,5);
            i++;
        }
        
    }
    
}

TweeHoeksLadder.prototype.create2 = function(metknoppen, metpijlpunten){
    var bloem = new Bloem();
    var b = [];
    var corner = 0;
    
    this.AB = new LangeLadder(this.p, this.r);
    this.AB.create(this.steps);
    this.path = this.path.concat(this.AB.path);
    
    if(metknoppen){
        //met knoppen
        for(var i = 0; i < 2;i++){
            var p = this.center.copy();
            p.x  += (this.size/3) * cos((TWO_PI/2) * i);
            p.y  += (this.size/3) * sin((TWO_PI/2) * i);
            fill(255,0,0);
            ellipse(p.x, p.y, 10,10);
            if(metpijlpunten){
                if(i == 0){ corner = 0;}
                else{ corner =PI;}
                this.path = this.path.concat(bloem.createPijlPunten(p,40,corner,1));
            }
            else{
                this.path = this.path.concat(bloem.createKnop(p,30,0,1));
            }
            
            
        }
    }
    
   
    return this.path;
}
TweeHoeksLadder.prototype.create = function(metbloemen){
    var bloem;
    if(metbloemen){
        bloem = new Bloem();
    }
    
    var corner = 0;
    for(var i = 0; i < 9; i+=1){
        
        var j = i + 1;
        if (j == 9){ j = 0;}

       
       
        if(metbloemen && ( i ==2 ||i ==5 ||i ==8)){
           if (i == 8){
               corner = -PI /3;
           }
           else if( i== 2 ){
                corner =-PI /4;
           }
           else if( i== 5 ){
            corner = PI /6 * 5;
       }
           this.path = this.path.concat(bloem.createKnop(this.p[j],30,corner,1));
          
         }
        
    }
    
   
    return this.path;
}
DriehoekInCirkelLadder.prototype.createLadder = function(a,b,c,d, i){
   
        this.controls[0] = a.copy();
        this.controls[1] = b.copy();
        this.controls[2] = c.copy();
        this.controls[3] = d.copy();
    

    this.AB = new Ladder(a,b,c,d, this.controls);
    this.AB.create(this.steps);
    this.path = this.path.concat(this.AB.path);
    
    
}
