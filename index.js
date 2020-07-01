
var colorSequence = [];
var playerSequence = [];
var gameState = "disabled";
var levelCounter = 1;
var redButton = $("#red");
var greenButton = $("#green");
var blueButton = $("#blue");
var yellowButton = $("#yellow");
var playerClicks = 0;



//Button Press Sound and Animation
function greenPress() {

    $(greenButton).addClass("pressed");

    setTimeout(function () {
        $(greenButton).removeClass("pressed");
    }, 100);

    var greenAudio = new Audio("sounds/green.mp3");
    greenAudio.play();

};

function redPress() {

    $(redButton).addClass("pressed");

    setTimeout(function () {
        $(redButton).removeClass("pressed");
    }, 100);

    var redAudio = new Audio("sounds/red.mp3");
    redAudio.play();

};

function bluePress() {

    $(blueButton).addClass("pressed");

    setTimeout(function () {
        $(blueButton).removeClass("pressed");
    }, 100);

    var blueAudio = new Audio("sounds/blue.mp3");
    blueAudio.play();

};

function yellowPress() {

    $(yellowButton).addClass("pressed");

    setTimeout(function () {
        $(yellowButton).removeClass("pressed");
    }, 100);

    var yellowAudio = new Audio("sounds/yellow.mp3");
    yellowAudio.play();

};


//Get a Randomised number and  decides next random color sequence. Adds the color to array colorSequence
function addSequenceColor() {

    function randomNumber() {
        var random = Math.floor((Math.random() * 4) + 1);
        return random;
    };

    switch (randomNumber()) {
        //Green
        case 1 :
            colorSequence.push("green");
            break;
        //Red
        case 2:
            colorSequence.push("red");
            break;
        //Yellow
        case 3:
            colorSequence.push("blue");
            break;
        //Blue
        case 4:
            colorSequence.push("yellow");
            break;
        default:
            alert("Error in Adding Color Sequences");
            break;
    }
};

//Checks if sequence is correct
function compareSequences (correctSequence, sequenceToCheck) {
    
    //Prevents error from user clicks during check
    gameState = "computer-turn";    
    
    //If not the final click to get next level
    if (playerClicks < colorSequence.length ) {
        
        if (playerSequence[playerClicks - 1] === colorSequence[playerClicks -1]) {
            return "continue";
        }else {
            return "incorrect";
        }
    }

    // If final click to get to next level
     else if (playerClicks === colorSequence.length) {
         
        if (playerSequence[playerClicks -1] === colorSequence[playerClicks -1]) {
            return "correct";
        }else {
            return "incorrect";
        }
    }

    //Error catcher
    else {
        alert("stil broken");
    }
};

//Ends game and resets variables
function gameOver () {
    var failSound = new Audio("sounds/wrong.mp3");
    failSound.play();
    gameState = "disabled";
    colorSequence = [];
    playerSequence = [];
    playerClicks = 0;
    levelCounter = 1;
    $("#level-title").text("Incorrect. Press a key to start over.");
    
};

//Plays Sequence in colorSequence Array
function playSequence(takenArray) {
    var colorToPLay = takenArray[(takenArray.length - 1)];

    switch (colorToPLay) {
        case "green" : 
            greenPress();
            break;
        case "red" :
            redPress();
            break;
        case "blue" :
            bluePress();
            break;
        case "yellow":
            yellowPress();
            break;
        default:
            alert("Error in play Sequence");
            break;
    }
};


// Button Event Listeners
document.querySelector("#green").addEventListener("click", function() {
    if (gameState === "player-turn") {
        playerSequence.push("green");
        playerClicks++;
        
        var comparisonResult = compareSequences(colorSequence,playerSequence);

        if (comparisonResult === "continue") {
            greenPress();
            gameState = "player-turn"; 
            
        } 
        else if (comparisonResult === "correct") {
            greenPress();
            nextLevel();
        }
        
        else {
            gameOver();
        };
    }
});

document.querySelector("#blue").addEventListener("click", function () {
     if (gameState === "player-turn") {
         playerSequence.push("blue");
         playerClicks++;

         var comparisonResult = compareSequences(colorSequence, playerSequence);

         if (comparisonResult === "continue") {
             bluePress();
             gameState = "player-turn"; 

         } else if (comparisonResult === "correct") {
             bluePress();
             nextLevel();
         } else {
             gameOver();
         };
     }
});

document.querySelector("#red").addEventListener("click", function () {
     if (gameState === "player-turn") {
         playerSequence.push("red");
         playerClicks++;

         var comparisonResult = compareSequences(colorSequence, playerSequence);

         if (comparisonResult === "continue") {
             redPress();
             gameState = "player-turn"; 

         } else if (comparisonResult === "correct") {
             redPress();
             nextLevel();
         } else {
             gameOver();
         };
     }
});

document.querySelector("#yellow").addEventListener("click", function () {
     if (gameState === "player-turn") {
         playerSequence.push("yellow");
         playerClicks++;

         var comparisonResult = compareSequences(colorSequence, playerSequence);

         if (comparisonResult === "continue") {
             yellowPress();
             gameState = "player-turn"; 

         } else if (comparisonResult === "correct") {
             yellowPress();
             nextLevel();
         } else {
             gameOver();
         };
     }
});




//Start Game
$(document).on("keypress", function (event) {
    if (gameState === "disabled") {
        $("#level-title").text(`Level ${levelCounter}`);
        addSequenceColor();
        playSequence(colorSequence);
        setTimeout(function() {
            gameState = "player-turn";
        },200);
    };
})

//Sets Next Level
function nextLevel () {
    
    levelCounter++;    

    setTimeout(function() {
        $("#level-title").text(`Level ${levelCounter}`);
        gameState = "computer-turn";
        addSequenceColor();
        playSequence(colorSequence);
        playerSequence = [];
        playerClicks = 0;
        setTimeout(function () {
            gameState = "player-turn";
        }, 200);
    },500);
    
    
    
};