function Dance(patroon, ritme, movement, repeatritme){
    this.steps = [];
    
    this.patroon = patroon;
    this.ritme = ritme;
    this.movement =movement;
    var p = 0;
    var apos;
    var maten = this.patroon.pos.length/ this.ritme.maatsoort;
    if(repeatritme){

       for(var i = 0; i < maten;i++){
           p = i* this.ritme.maatsoort;
           for(var  m = 0 ; m < this.ritme.maat.length; m++){
               apos = this.patroon.pos[p];
               for( var r = 0; r < this.ritme.maat[m]; r++){
                  
                    this.steps.push(new Step(apos,  movement.move[m] ));
                    p++;
               }
           }

       }
      
    //    // for(var p = 0; p < patroon.pos.length; p++){
    //    //     var r = p % ritme.maatsoort;
    //         var m = floor(r / ritme.maat.length);
    //         this.pose = movement.move[m];
    //         // for(var l = 0; l < ritme.maat[m]; l++){
                
                
                
    //         // }
    //         this.steps.push(new Step(patroon.pos[p], this.pose ))
            
    //     }
    }
    else{
        for(var m = 0; m < ritme.maat.length; m++){
            for(var l = 0; l < ritme.maat[m]; l++){
                
                this.steps.push(new Step(patroon.pos[p], this.pose ))
                
            }
            if(m < ritme.maat.length-1){
                    p += 1;
            }

        }
    }
    
}
Dance.prototype.pos = function(step){
    return this.steps[step].pos;
}
Dance.prototype.move = function(step){
    return this.steps[step].move
}
