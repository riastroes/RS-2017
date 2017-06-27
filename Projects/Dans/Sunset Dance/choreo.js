function Choreo(){
    this.maatsoort = 8;
    this.startmaat = 0;
    this.endmaat = 0;
    this.end = 2000;
    this.maat = 0;
    
    this.act =[];
    this.ritme;
    this.patronen = [];
    
    this.width = width;
    this.height = height - 100;

    this.ritmes =[];
    this.ritmes[0] = new Ritme(8, [5,1,2]);
    this.ritmes[1] = new Ritme(8, [1,1,1,1,1,1,1,1]);
    this.ritmes[2] = new Ritme(8, [2,2,2,2]);
    this.ritmes[3] = new Ritme(8, [2,2,2,2]);
    this.movements =[];
    this.movements[0] = new Movement(8, [4,5,6] );
    this.movements[1] = new Movement(8, [0,2,6] );
    this.movements[2] = new Movement(8, [0,1,2,3,4,5,6,7] );
    this.movements[3] = new Movement(8, [7,1,7,1] );
    this.movements[4] = new Movement(8, [0,0,0,0,0,0,0,0] );
    this.movements[5] = new Movement(8, [8,9,10,11,11,12,13,8] );
    this.movements[6] = new Movement(8, [13,15,17,18] );

    this.group = [];
    this.dances = [];
   
    
}
Choreo.prototype.createAct = function(nr){
    if(nr == this.act.length){
        this.act.push(nr);
        switch(this.act[nr]){
        case 0:{
            //opkomst groep y( 8 mannen) van links naar verdeling op achterste rij.
            this.group[0] = new Group("danser_m");
            var groupsize = 8;
            this.startmaat = 0;
            this.endmaat = this.startmaat + 2;
            this.maten = (this.endmaat - this.startmaat);
            for(var i = 0; i < groupsize; i++){
                var patroonlen = (this.maatsoort*this.maten);
                var patroon = new Patroon();
                    var radiusx = (width) - (((width-100) / groupsize)* i);
                    var radiusy =(this.height - 250)/2;
                    var center = createVector(radiusx, radiusy + 200);
                    patroon.addArc(center, radiusx, radiusy,  PI, TWO_PI/4*3, patroonlen);
                this.patronen.push(patroon);
                this.dances[i] = new Dance(this.patronen[i],this.ritmes[1],this.movements[2],true, false);
                this.group[0].dancers.push(new Dancer(this.group[0], this.startmaat,this.end, this.dances[i]));

            }
             break;
        }
        case 1:{
            //opkomst groep y( 7 mannen) van rechts naar verdeling op de achterste rij.
            this.group[1] = new Group("danser_m", 7);
            var groupsize = 7;
            this.startmaat = this.endmaat;
            this.endmaat = this.startmaat + 2;
            this.maten = (this.endmaat - this.startmaat);
            this.d = this.dances.length;
            for(var i = 0; i < groupsize; i++){
                
                var patroonlen = (this.maatsoort*this.maten);
                var patroon = new Patroon();
                var radiusx = width - (100 + (i * width/groupsize));
                var radiusy = (this.height - 250/2);
                var center = createVector(100 + (i * (width/groupsize)), radiusy + 230);
                patroon.addArc(center, radiusx, radiusy,  TWO_PI, (TWO_PI/4*3), patroonlen);
                this.patronen.push(patroon);
                this.dances[this.d + i] = new Dance(patroon,this.ritmes[1],this.movements[2],true, false);
                this.group[1].dancers.push(new Dancer(this.group[1], this.startmaat,this.end, this.dances[this.d + i]));
                this.d++;
            }        
            break;
        }
        case 2:{
            //group 0 en 1 dansen samen deze act.
            this.group[0].join(this.group[1]);
            var groupsize = 15;
            this.startmaat = this.endmaat;
            this.endmaat = this.startmaat + 4;
            this.maten = (this.endmaat - this.startmaat);
            this.d = this.dances.length;
            for(var i = 0; i < groupsize; i++){
                var patroonlen = (this.maatsoort*this.maten);
                var patroon = new Patroon();
                var radiusx = 200;
                var radiusy = (this.height - 500)/2;
                var center = createVector(this.group[0].dancers[i].pos.x, this.group[0].dancers[i].pos.y+ radiusy);
                patroon.addCircle(center, radiusx, radiusy, patroonlen, TWO_PI/4*3);
                this.patronen.push(patroon);
                this.dances[this.d + i] = new Dance(patroon,this.ritmes[2],this.movements[3],true, false);
                this.group[0].dancers[i].dances[1] = this.dances[this.d + i];
                this.group[0].dancers[i].step = 0;
                this.d++;
            }         
            break;
        }
        case 3:{
            //group 0 en 1 dansen samen deze act terug naar 1 achterlijn.
            
            var groupsize = 15;
            this.startmaat = this.endmaat;
            this.endmaat = this.startmaat + 1;
            var maten = (this.endmaat - this.startmaat);
            this.d = this.dances.length;
            for(var i = 0; i < groupsize; i++){
                var patroonlen = (this.maatsoort* maten);
                var patroon = new Patroon();
                var start  = this.group[0].dancers[i].pos;
                var end = createVector(this.group[0].dancers[i].pos.x, 180);
                patroon.addLine(start, end, patroonlen);
                this.patronen.push(patroon);
                var dance = new Dance(patroon,this.ritmes[1],this.movements[4],true, false);
                var d = this.group[0].dancers[i].dances.length;
                this.group[0].dancers[i].dances[d] = dance;
                this.group[0].dancers[i].step = 0;
                this.d++;
            }         
            break;
        }
         case 4:{
            //group 2 rennen over het toneel van rechts naar links,midden.
            this.group[2] = new Group("danser_m", 3);
            var groupsize = 3;
            this.startmaat = this.endmaat;
            this.endmaat = this.startmaat + 2;
            var maten = (this.endmaat - this.startmaat);
            this.d = this.dances.length;
            for(var i = 0; i < groupsize; i++){
                var patroonlen = (this.maatsoort* maten);
                var patroon = new Patroon();
                var start  = createVector(width, (height/2) - (i * 30));
                var end = createVector(-100,  (height/2) -(i * 30));;
                patroon.addLine(start, end, patroonlen);
                this.patronen.push(patroon);
                var dance = new Dance(patroon,this.ritmes[1],this.movements[5],true, false);
                this.group[2].dancers.push(new Dancer(this.group[2], this.startmaat,this.end, dance));
   
                
                this.group[2].dancers[i].step = 0;
                this.d++;
            }         
            break;
        }
        case 5:{
            //group 3 rennen over het toneel van rechts naar links, achter.
            this.group[3] = new Group("danser_m", 3);
            var groupsize = 3;
            this.startmaat = this.endmaat;
            this.endmaat = this.startmaat + 2;
            var maten = (this.endmaat - this.startmaat);
            this.d = this.dances.length;
            for(var i = 0; i < groupsize; i++){
                var patroonlen = (this.maatsoort* maten);
                var patroon = new Patroon();
                var start  = createVector(width, 150+ (i * 30));
                var end = createVector(-100, 150 + (i * 30));;
                patroon.addLine(start, end, patroonlen);
                this.patronen.push(patroon);
                var dance = new Dance(patroon,this.ritmes[1],this.movements[5],true, false);
                this.group[3].dancers.push(new Dancer(this.group[3], this.startmaat,this.end, dance));
   
                
                this.group[3].dancers[i].step = 0;
                this.d++;
            }         
            break;
        }
        case 6:{
            //group 4 rennen over het toneel van links naar rechts,voor.
            this.group[4] = new Group("danser_m", 3);
            var groupsize = 3;
            this.startmaat = this.endmaat;
            this.endmaat = this.startmaat + 2;
            var maten = (this.endmaat - this.startmaat);
            this.d = this.dances.length;
            for(var i = 0; i < groupsize; i++){
                var patroonlen = (this.maatsoort* maten);
                var patroon = new Patroon();
                var start  = createVector(width, (height/3*2)-100 +(i * 40));
                var end = createVector(-100, (height/3*2)-100 + (i * 40));;
                patroon.addLine(start, end, patroonlen);
                this.patronen.push(patroon);
                var dance = new Dance(patroon,this.ritmes[1],this.movements[5],true, false);
                this.group[4].dancers.push(new Dancer(this.group[4], this.startmaat,this.end, dance));
   
                
                this.group[4].dancers[i].step = 0;
                this.d++;
            }         
            break;
        }
        case 7:{
            //group 4 rennen over het toneel van rechts naar links,voor.
            this.group[4].join(this.group[3]);
            this.group[4].join(this.group[2]);
            var groupsize = 9;
            this.startmaat = this.endmaat;
            this.endmaat = this.startmaat + 2;
            var maten = (this.endmaat - this.startmaat);
            this.d = this.dances.length;
            for(var i = 0; i < groupsize; i++){
                var patroonlen = (this.maatsoort* maten);
                var patroon = new Patroon();
                var start  = createVector(width + ((i%3)*30), (height/2)-100 +((i%3) * 40));
                var end = createVector(-100 -((i%3)*30), (height/2)-100 + ((i%3) * 40));;
                patroon.addLine(end, start, patroonlen);
                var l = this.patronen.push(patroon);
                
                var dance = new Dance(this.patronen[l-1],this.ritmes[3],this.movements[6],true, false);
                var d = this.group[4].dancers[i].dances.length;
                this.group[4].dancers[i].dances[d] = dance;
                this.group[4].dancers[i].startmaat = this.startmaat;
                this.group[4].dancers[i].endmaat = this.end;
                this.group[4].dancers[i].step = 0;
   
                //this.d++;
            }         
            break;
        }
        }
    }

}
Choreo.prototype.showAct = function(nr){
    blendMode(BURN)
    switch(nr){
        case 0:{
            
             for(var i =0; i < this.group[0].dancers.length; i++){  
                this.group[0].dancers[i].godance(0,speed);          
            }
            break;
        }
        case 1:{
            //blendMode(SCREEN)
            for(var i =0; i < this.group[0].dancers.length; i++){ 
                    
                this.group[0].dancers[i].draw();        
            }
            //blendMode(DARKEST)
            for(var i =0; i < this.group[1].dancers.length; i++){ 
               this.group[1].dancers[i].godance(0,speed);      
            }
            break;
        }
        case 2:{
            //blendMode(ADD)
            for(var i =0; i < this.group[0].dancers.length; i++){     
                this.group[0].dancers[i].godance(1,speed);        
            }
            break;
        }
        case 3:{
            //blendMode(LIGHTEST)
             for(var i =0; i < this.group[0].dancers.length; i++){     
                this.group[0].dancers[i].draw();        
            }
            //blendMode(MULTIPLY)
            for(var i =0; i < this.group[0].dancers.length; i++){     
                this.group[0].dancers[i].godance(2,speed);        
            }
            break;
        }
         case 4:{
            //blendMode(DODGE)
            for(var i =0; i < this.group[0].dancers.length; i++){     
                this.group[0].dancers[i].draw();        
            }
            for(var i =0; i < this.group[2].dancers.length; i++){     
                this.group[2].dancers[i].godance(0,speed);        
            }
            break;
        }
        case 5:{
            for(var i =0; i < this.group[0].dancers.length; i++){     
                this.group[0].dancers[i].draw();        
            }
            for(var i =0; i < this.group[3].dancers.length; i++){     
                this.group[3].dancers[i].godance(0,speed);        
            }
            break;
        }
        case 6:{
            for(var i =0; i < this.group[0].dancers.length; i++){     
                this.group[0].dancers[i].draw();        
            }
            for(var i =0; i < this.group[4].dancers.length; i++){     
                this.group[4].dancers[i].godance(0,speed);        
            }
            break;
        }
        case 7:{
            for(var i =0; i < this.group[0].dancers.length; i++){     
                this.group[0].dancers[i].draw();        
            }
            for(var i =0; i < this.group[4].dancers.length; i++){     
                this.group[4].dancers[i].godance(1,speed);        
            }
            break;
        }
    }
   
    
}