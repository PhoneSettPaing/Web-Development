var numberOfButton = document.querySelectorAll(".drum").length;
//var drumSound = ["crash.mp3","kick-bass.mp3","snare.mp3","tom-1.mp3","tom-2.mp3","tom-3.mp3","tom-4.mp3"];

// Detecting button click
for (var i=0; i < numberOfButton; i++) {
    
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttonInnerHTML = this.innerHTML;
        drumSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
    });

}

//Detecting keyboard press
document.addEventListener("keypress", function(event) {
    drumSound(event.key);
    buttonAnimation(event.key);
});

function drumSound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio("./sounds/tom-1.mp3");
            tom1.play();
        break;

        case "a":
            var tom2 = new Audio("./sounds/tom-2.mp3");
            tom2.play();
        break;

        case "s":
            var tom1 = new Audio("./sounds/tom-3.mp3");
            tom1.play();
        break;

        case "d":
            var tom2 = new Audio("./sounds/tom-4.mp3");
            tom2.play();
        break;

        case "j":
            var tom1 = new Audio("./sounds/snare.mp3");
            tom1.play();
        break;

        case "k":
            var tom2 = new Audio("./sounds/crash.mp3");
            tom2.play();
        break;
        
        case "l":
            var tom1 = new Audio("./sounds/kick-bass.mp3");
            tom1.play();
        break;

        default:
            console.log(buttonInnerHTML);
    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100);
}