//alert("hi");

var buttonColors = ["red", "blue", "green", "yellow"]; // list of all button colors

var gamePattern = []; // pattern that should be followed
//console.log(randomChosenColor);
var userClickedPattern = []; // pattern that user follows

var started = false; // game has not started yet
var level = 0; // initial levels

// the game starts once any button is clicked
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level); // update the level title
    nextSequence();
    started = true; //game starts
  }
});

$(".btn").click(function() { // amytime a button is clicked

  var userChosenColor = $(this).attr("id"); //get the color of clicked button
  userClickedPattern.push(userChosenColor); // add the clicked button to the
  //clicked pattern

  //console.log(userClickedPattern);
  playSound(userChosenColor); //play clicked sound and animate the button press
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1); // check if user clicked on the correct button
});

// function to check if button clicked was correct
function checkAnswer(currentLevel){

  // if the current button clicked matches the current color value...
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      // if all buttons clicked match, then increment the level
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else{ // if we do not have a match then game over!
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").txt("Game Over, Press Any Key to Restart");

    // we reset the game
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// function that generates the next sequence
function nextSequence(){
  userClickedPattern = []; // reset the user clicked pattern and increment the level
  level++;

  $("#level-title").text("Level " + level); // update the level title

  // generate a random button to be clicked and add it to the game pattern array
  var randomNumber = Math.floor(Math.random()* 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // make it known to the user which button they should click!
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// function to animate a button press
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed"); // call pressed class
  setTimeout(function(){
      $("#" + currentColor).removeClass("pressed");
  }, 100); // unpress after 100ms
}
// play sounds for each event (button clicked or game over)
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function that will reset the gmae
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
