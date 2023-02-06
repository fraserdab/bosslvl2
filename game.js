var buttonColours = ["red", "yellow", "blue", "green"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function (e) {
    if(!started){
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  });
function checkAnswer(currentLevel){
      if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
          if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
              nextSequence();
          }, 1000);
          userClickedPattern = [];
        }
      }
      else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
            $("body").addClass("game-over");
            setTimeout(function() {
            $("body").removeClass("game-over");
              }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startover();
      }
  }
function startover(){
  level = 0;
  gamePattern=[];
  started = false;
}
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name){
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}
