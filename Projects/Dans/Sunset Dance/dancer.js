function Group(name, size){
    this.dancers = [];
    this.name= name;
    this.size = size;
    switch(this.name){
        case "danser_m":{
            this.poses = danser_m;
            break;
        }
        case "danseres_st":{
            this.poses = danseres_st;
            break;
        }
    }
    

}
Group.prototype.join = function(group){
    for(var i = 0; i < group.dancers.length; i++){
        this.dancers.push(group.dancers[i]);
    }
}
function Dancer(group, startmaat, endmaat, adance){
    this.group = group.name;
    this.poses = group.poses;
    this.startmaat= startmaat;
    this.endmaat = endmaat;

    this.dances = [];
    this.dances[0] = adance;
    this.dancemove = 0;
    this.step = 0;

    this.pos = this.dances[0].pos(0);
    this.dancemove = this.dances[0].move(0);

    
}

Dancer.prototype.godance = function(dance,tempo){
    if((time / tempo) >= (this.startmaat * choreo.maatsoort) && (time/tempo) < (this.endmaat * choreo.maatsoort)){
        if((time % tempo) == 0 && this.step < this.dances[dance].steps.length){
            this.pos = this.dances[dance].pos(this.step);
            this.dancemove = this.dances[dance].move(this.step);
            this.step++
        }
        this.draw();
    }
  
}

Dancer.prototype.draw = function(){
    var s = map(this.pos.y , 0, height, 0.3, 2);
    push();
        translate(this.pos.x, this.pos.y);
        scale(s);
        image(this.poses[this.dancemove] ,0,0);
     pop();
}
