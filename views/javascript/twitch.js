var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

function getStreams(username){
  $.getJSON("https://api.twitch.tv/kraken/channels/" + username + "?callback=?", function(data){
    console.log("channels ", data);
    var result = "";
    var game = data.game;
    var status = data.status;
    if (status !== null && status !== 422) {
    result = "<div class='row container card1 " + data.display_name + "'><div class='col-xs-2 col-sm-2'><img src='" + data.logo + "' class='img-circle logo'></div><div class='col-xs-10 col-sm-3 name'><a href=" + data.url + " target='_blank'>" + data.display_name + "</a></div><div id='status' class='col-xs-10 col-sm-7'><span class='hidden-xs'>" + "<b>" + game + "</b>" + " : " + status + "</span></div></div></div>";
    
    } else if (status === 422){
      result = "<div class='row container card4'><div class='col-xs-2 col-sm-2'><img src='https://cdn4.iconfinder.com/data/icons/simplicio/128x128/notification_error.png' class='img-circle logo'></div><div class='col-xs-10 col-sm-3 name'>" + username + "</div><div id='status' class='col-xs-10 col-sm-7'><span class='hidden-xs'><b>Account Closed</b></span></div></div></div>";
    } else {
      result = "<div class='row container card2'><div class='col-xs-2 col-sm-2'><img src='" + data.logo + "' class='img-circle logo'></div><div class='col-xs-10 col-sm-3 name'><a href=" + data.url + " target='_blank'>" + data.display_name + "</a></div><div id='status' class='col-xs-10 col-sm-7'><span class='hidden-xs'><b>Offline</b></span></div></div></div>";
    }
    
    $("#main").append(result);
   
  });
  
}

$(document).ready(function(){
  //usernames.forEach(function(i){ getStreams(i); });
  usernames.forEach(getStreams);
  
  $(".streams").on("click", function(){
     $("input").val("");
     $("#main").empty();
     //usernames.forEach(function(i){ getStreams(i); });
     usernames.forEach(getStreams);
   })
   $(".online").on("click", function(){
     $(".card1").removeClass("hidden");
     $(".card2").addClass("hidden");
     $(".card4").addClass("hidden");
   })
   $(".offline").on("click", function(){
     $(".card2").removeClass("hidden");
     $(".card1").addClass("hidden");
     $(".card4").addClass("hidden");
   })
   $(".closed").on("click", function(){
     $(".card4").removeClass("hidden");
     $(".card1").addClass("hidden");
     $(".card2").addClass("hidden");
   })
   
    //$(function() {
    
    $( "#tags" ).autocomplete({
      source: usernames
    });
      $('.tag').submit(function (event) {
        event.preventDefault();
        var searched =  $('input').val();
        if (searched) {
        $("#main").empty();
        //console.log(searched);
        getStreams(searched);
        } else {
          $("#main").empty();
          //usernames.forEach(function(i){ getStreams(i); });
          usernames.forEach(getStreams);
        }
      })
 // });

})