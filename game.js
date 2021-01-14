var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

$(document).keydown(function() {
  if (!start) {
  $("#level-title").text("Level " + level);
  nextSequence();
  start = true; }
});

$(".btn").click(function() {
var userChosenColour = this.id;
userClickedPattern.push(userChosenColour);
console.log(userClickedPattern);
makeSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animateFlash(randomChosenColour);
  makeSound(randomChosenColour);
}

function makeSound(color) {
  switch (color) {
    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;
    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    default:
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
  }
}

function animatePress(currentColour) {
  $("#"+ currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+ currentColour).removeClass("pressed");
  }, 100);
}

function animateFlash(color) {
  $("#" + color).fadeOut(100).fadeIn(100);
  }

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      },1000);
      userClickedPattern = [];
    }
  } else {
    console.log("Wrong");
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
 level = 0;
 start = false;
 gamePattern = [];
 userClickedPattern = [];
}
