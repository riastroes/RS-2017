function Patroon(){
    this.pos = [];
    this.angle =[];
}
Patroon.prototype.addCircle = function(center, radiusx, radiusy, steps, startangle){  
    if(steps > 0){
        for(var i = 1; i <=steps; i++){

            var p = createVector(center.x, center.y);
            p.x += radiusx * cos(startangle + (TWO_PI/steps)* i);
            p.y += radiusy * sin(startangle + (TWO_PI/steps)* i);
            append(this.angle, startangle + (TWO_PI/steps)* i);
            append(this.pos, p);
            
        }
    }
    else{
        //draai andere kant op.
        for(var i = steps-1; i > 0; i--){

            var p = createVector(center.x, center.y);
            p.x += radiusx * cos(startangle + (TWO_PI/steps)* i);
            p.y += radiusy * sin(startangle + (TWO_PI/steps)* i);
            append(this.angle, startangle + (TWO_PI/steps)* i);
            append(this.pos, p);
            
        }
    }
}
Patroon.prototype.addLine = function(start, end, steps){  
    if(steps > 0){
        for(var i = 1; i <= steps; i++){

            var v = createVector(end.x - start.x, end.y - start.y);
            v.div(steps);
            v.mult(i);
            var s = start.copy();
            s.add(v);
        
            append(this.angle,0);
            append(this.pos, s);
            
        }
    }
    
}
Patroon.prototype.addArc = function(center, radiusx, radiusy,  start, end, steps){
     if(steps > 0){
        if(end > start){
            var stepsize = (end - start)/(steps);
            for(var a = start + stepsize; a <= end; a += stepsize){
                var p = createVector(center.x, center.y);
                p.x += radiusx * cos(a);
                p.y += radiusy * sin(a);
                append(this.angle, a);
                append(this.pos, p);
                
            }
        }
        else{
            var stepsize =(start - end)/(steps);
        
            for(var a = start-stepsize; a >= end; a -= stepsize){
               var p = createVector(center.x, center.y);
                p.x += radiusx * cos(a);
                p.y += radiusy * sin(a);
                append(this.angle, a);
                append(this.pos, p);
                
            }
        }
    }
}
Patroon.prototype.draw = function(){
    stroke(0);
    strokeWeight(5);
    for(var i = 0; i < this.pos.length; i++){
        point(this.pos[i].x, this.pos[i].y);
    }
    
}