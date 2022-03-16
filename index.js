var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameState = "stopped";
var level = 0;

$(document).keydown(function () {
  if (gameState == "stopped") {
    $("#level-title").text("Level " + level);
    setTimeout(function () {
      nextSequence();
    }, 500);

    gameState = "started";
  }
});

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  var indexOfUserChosenColour = userClickedPattern.length - 1;
  checkAnswer(indexOfUserChosenColour);
});

// START GAMEPLAY
function checkAnswer(currentLevel) {
  //checks if the most recent user answer is the same as the game pattern. If so then logs "success", otherwise logs "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // If the user got the most recent answer right then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").attr("class", "game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
    console.log("wrong");
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gameState = "stopped";
  gamePattern = [];
}

nextSequence();
