function Ritme(maatsoort, maat){
    this.maatsoort = maatsoort;
    this.maat = maat;
    if(this.checkMaatsoort(maat) == false){
        append(errors ,"maatsoort en maat komen niet met elkaar overeen");
    }
}

Ritme.prototype.checkMaatsoort = function(maat){
    var ok = false;
    var tot = 0;
    for( var i = 0; i < maat.length; i++){
        tot += maat[i];
    }
    if(tot % this.maatsoort == 0){
        ok = true;
    }
    return ok;
}

function Movement(maatsoort, move){
    this.maatsoort = maatsoort;
    this.move = move;
    
}