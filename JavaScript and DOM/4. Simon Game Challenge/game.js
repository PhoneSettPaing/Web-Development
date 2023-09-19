var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}

var randomChosenColour = buttonColours[nextSequence()];

gamePattern.push(randomChosenColour);

document.querySelector("#" + randomChosenColour).classList.add("pressed");
setTimeout(function(){
    document.querySelector("#" + randomChosenColour).classList.remove("pressed");
}, 100);

var soundPath = "./sounds/" + randomChosenColour + ".mp3";
var sound = new Audio(soundPath);
sound.play();