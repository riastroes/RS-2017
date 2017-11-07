function DriehoekInCirkelLadder(center, size, corner){
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
DriehoekInCirkelLadder.prototype.getPR = function(center, size, corner){
    var i = 0;
    for(var step = 0 ; step < 12; step++ ){
        var hoek = (step * (TWO_PI/12)) +corner;
        if(step % 4 == 0){
            this.p[i] = createVector(0,0);
            this.p[i].x = center.x + ((size/3) * cos(hoek));
            this.p[i].y = center.y + ((size/3) * sin(hoek));
            this.r[i] = this.p[i].copy().add(0,5);
            i++;
        }
        if(step % 4 == 1){
            this.p[i] = createVector(0,0);
            this.p[i].x = center.x + ((size) * cos(hoek));
            this.p[i].y = center.y + ((size) * sin(hoek));
            this.r[i] = this.p[i].copy().add(0,5);
            i++;
        }
        if(step % 4 == 2){
        }
        if(step % 4 == 3){
            this.p[i] = createVector(0,0);
            this.p[i].x = center.x + ((size) * cos(hoek));
            this.p[i].y = center.y + ((size) * sin(hoek));
            this.r[i] = this.p[i].copy().add(0,5);
            i++;
        }
        
    }
    
}

DriehoekInCirkelLadder.prototype.create2 = function(metknoppen){
    var bloem = new Bloem();
    var b = [];
    var corner = 0;
    
    this.AB = new LangeLadder(this.p, this.r);
    this.AB.create(this.steps);
    this.path = this.path.concat(this.AB.path);
    
    if(metknoppen){
        //met knoppen
        for(var i = 0; i < 3;i++){
            var p = this.center.copy();
            p.x  += (this.size/3) * cos((TWO_PI/3) * i);
            p.y  += (this.size/3) * sin((TWO_PI/3) * i);
            fill(255,0,0);
            ellipse(p.x, p.y, 10,10);
            this.path = this.path.concat(bloem.createKnop(p,30,corner,1));
            
        }
    }
    
   
    return this.path;
}
DriehoekInCirkelLadder.prototype.create = function(metbloemen){
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
    // if(metbloemen){
    //     for(var i = 0; i < 9; i+=1){
            
    //         var j = i + 1;
    //         if (j == 9){ j = 0;}
    //         if(( i ==2 ||i ==5 ||i ==8)){
    //             if (i == 8){
    //                 corner = TWO_PI/3;
    //             }
    //             else if( i== 2 ){
    //                  corner = -TWO_PI/3;
    //             }
    //             else if( i== 5 ){
    //              corner =0;
    //             }
            
    //             var pos = createVector(this.center.x, this.center.y);
    //             var hoek =  (j * (TWO_PI/9)) - PI/3;
    //             pos.x += (100 * cos(hoek));
    //             pos.y += (100 * sin(hoek));
    //             this.path = this.path.concat(bloem.createCirkel(pos,20,corner,1));
    //         }
    //     }
    // }
   
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
