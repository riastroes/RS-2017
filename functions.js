function setFilter(filter){
  var allcards = document.getElementsByClassName("card");
  if(filter == "all"){
    for(var i = 0; i < allcards.length; i++){
      allcards[i].style.display = "block";
    }
  }
  else{
      for(var i = 0; i < allcards.length; i++){
        allcards[i].style.display = "none";
      }
      var cards = document.getElementsByClassName(filter);
      for(var i = 0; i < cards.length; i++){
        cards[i].style.display = "block";
      }
  }
}
function goHome(){

  window.location.assign("/Sites/RS-2017/index.html")
}
function show(projectname){
  window.location.assign("/Sites/RS-2017/Projects/" + projectname + "/index.html");

}
function photos(projectname){
  window.location.assign("/Sites/RS-2017/Photos/" + projectname + "/index.html");

}
