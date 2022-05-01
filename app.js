var height = 6;
var width = 5;

var row = 0;
var column = 0;

var gameOver = false;
//hard coded word list
var wordList = [
    "piano", "shelf", "lodge", "suing", "rearm", "coral", "ramen", "worth", "psalm",
];
var guessList = [
    "piano", "shelf", "lodge", "suing", "rearm", "coral", "ramen", "worth", "psalm",
];

guessList = guessList.concat(wordList);

var word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
console.log(word);

window.onload = function() {
    intialize();
};

function intialize() {
    // Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // Creating the key board
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
    ];

    for (let i = 0; i < keyboard.length; i++) {
        let currentRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currentRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currentRow[j];
            keyTile.innerText = key;
            if (key == "Enter") {
                keyTile.id = "Enter";
            } else if (key == "⌫") {
                keyTile.id = "Backspace";
            } else if ("A" <= key && key <= "Z") {
                keyTile.id = "Key" + key; // "Key" + "A";
            }

            keyTile.addEventListener("click", processKey);

            if (key == "Enter") {
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        processInput(e);
    });
}

//process methods
function processKey() {
    e = { code: this.id };
    processInput(e);
}
//User input method
function processInput(e) {
    if (gameOver) return;

    // alert(e.code);
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (column < width) {
            let currentTile = document.getElementById(
                row.toString() + "-" + column.toString()
            );
            if (currentTile.innerText == "") {
                currentTile.innerText = e.code[3];
                column += 1;
            }
        }
    } else if (e.code == "Backspace") {
        if (0 < column && column <= width) {
            column -= 1;
        }
        let currentTile = document.getElementById(
            row.toString() + "-" + column.toString()
        );
        currentTile.innerText = "";
    } else if (e.code == "Enter") {
        update();
    }

    if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;
        document.getElementById("answer").innerText =
            "GameOver!   " + "\n" + "The answer was " + word;
    }
}

function update() {
    let guess = "";
    document.getElementById("answer").innerText = "";

    //string up the guess into the word
    for (let c = 0; c < width; c++) {
        let currentTile = document.getElementById(
            row.toString() + "-" + c.toString()
        );
        let letter = currentTile.innerText;
        guess += letter;
    }

    guess = guess.toLowerCase(); //case sensitive
    console.log(guess);

    if (!guessList.includes(guess)) {
        document.getElementById("answer").innerText =
            "Not in the word list" + "\n" + "Please try again";
        return;
    }

    //start processing guess
    let correct = 0;

    let letterCount = {}; //keep track of letter frequency, ex) KENNY -> {K:1, E:1, N:2, Y: 1}
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];

        if (letterCount[letter]) {
            letterCount[letter] += 1;
        } else {
            letterCount[letter] = 1;
        }
    }

    console.log(letterCount);

    //first iteration, check all the correct letters
    for (let c = 0; c < width; c++) {
        let currentTile = document.getElementById(
            row.toString() + "-" + c.toString()
        );
        let letter = currentTile.innerText;

        //checking if letters in the correct postion
        if (word[c] == letter) {
            currentTile.classList.add("correct");

            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.remove("partialcorrect");
            keyTile.classList.add("correct");

            correct += 1;
            letterCount[letter] -= 1; //deduct the letter count
        }

        if (correct == width) {
            gameOver = true;
        }
    }

    console.log(letterCount);
    //checks for letters that are correct but in the wrong postion
    for (let c = 0; c < width; c++) {
        let currentTile = document.getElementById(
            row.toString() + "-" + c.toString()
        );
        let letter = currentTile.innerText;

        // skips the letter if it has been marked correct
        if (!currentTile.classList.contains("correct")) {
            //Checks if the guess is the answer, also makes sure it doesn't double count
            if (word.includes(letter) && letterCount[letter] > 0) {
                currentTile.classList.add("partialcorrect");

                let keyTile = document.getElementById("Key" + letter);
                if (!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("partialcorrect");
                }
                letterCount[letter] -= 1;
            } else {
                currentTile.classList.add("absent");
                let keyTile = document.getElementById("Key" + letter);
                keyTile.classList.add("absent");
            }
        }
    }

    row += 1; //start new row
    column = 0; //start at 0 for new row
}