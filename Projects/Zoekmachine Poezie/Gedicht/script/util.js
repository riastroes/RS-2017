//module pattern
var Util = (function() {
 
var rand = function(max){
    var r =  1 + Math.floor(Math.random() * max);
    return r;
};
var betweenrand = function(min, max){
    var r =  min + Math.floor(Math.random() * (max - min));
    return r;
};


    

 var getX = function(event){
    var $map = $("#divmap");
    var posmap = $map.position();
    var x = event.pageX - posmap.left;
    return x;
    };
var getY = function(event){
    var $map = $("#divmap");
    var posmap = $map.position();
    var y = event.pageY - posmap.top;
    return y;
 };
var getDistance = function(p, g){
    var diffx = Math.abs(p[0] - g[0]);
    var diffy = Math.abs(p[1] - g[1]);
    var r = Math.sqrt((diffx * diffx) + (diffy * diffy)); 
    return r;
 };
var getTime = function(millisec){
    var zero = '0', hh,mm,ss, time;
    
    

    time = new Date(0, 0, 0, 0, 0, 0,millisec);

    hh = time.getHours();
    mm = time.getMinutes();
    ss = time.getSeconds() 

    // Pad zero values to 00
    hh = (zero+hh).slice(-2);
    mm = (zero+mm).slice(-2);
    ss = (zero+ss).slice(-2);

    time = hh + ':' + mm + ':' + ss;
    return time; 
    
    
}

//fraq
var nextX = function(x,dir){
    var x1;
    if( dir > 4 && dir <=7 ){ x1 = x -1;}
    else if( dir > 0 && dir < 4 ) { x1 = x + 1;}
    else { x1 = x;}
return x1;
}
var nextY  = function(y,dir){
    var y1;
    if( dir === 3 || dir === 4 || dir === 5  ){ y1 = y +1;}
    else if( dir === 1 || dir === 7 || dir === 0 ) { y1 = y - 1;}
    else { y1 = y;}
return y1;
}

//response
var color = function( r,g,b,a){
    return "rgba(" + r + ","+ g + ","+ b + ","+ a + ")";
}
var changeColor = function (color,r,g,b,a){
    var str = color.split(",");
    var str1 = str[0].split("(");
    var red = parseInt(str1[1]) + r;
    var green = parseInt(str[1]) + g;
    var blue = parseInt(str[2]) + b;
    var str2 = str[3].split(")");
    var aa = parseFloat(str2[0]) + a;
    return "rgba(" + red + ","+ green + ","+ blue + ","+ aa + ")";
    
}
var randomSign = function(){
    var sign = this.between(0,2);
    if(sign === 0 ){ sign = -1;}
    return sign;
}
 // public API
return {
        random: rand,
        between: betweenrand,
        getX: getX,
        getY: getY,
        getTime: getTime,
        getDistance: getDistance,
        nextX: nextX,
        nextY: nextY,
        color:color,
        changeColor:changeColor,
        randomSign: randomSign
        
    };
    
})();