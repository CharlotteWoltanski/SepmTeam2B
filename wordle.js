
var height =6;
var width = 5;

var row = 0;
var column = 0;

var gameOver = false;
var wordList= ["pears","jello","bagel","river","hyped"];
var guessList = ["pears","jello","bagel","river","hyped","cargo", "river","mango"];


guessList = guessList.concat(wordList);

var word =wordList[Math.floor(Math.random()*wordList.length)].toUpperCase();
console.log(word);


window.onload = function() {
    initialize();
}
function initialize(){
    for (let r =0; r < height; r++){

        for(let c = 0; c < width; c++){
            let tile =document.createElement("span");
            tile.id = r.toString()+"-"+ c.toString();
            tile.classList.add("tile");
            tile.innerText = " ";
            document.getElementById("board").appendChild(tile);

        }
    }

let keyboard = [
    ["Q","W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H","J","K","L", " "],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
]
for(let i = 0; i < keyboard.length; i++){
    let currentRow = keyboard[i];
    let keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");

    for(let j=0; j < currentRow.length; j++){
        let keyTile = document.createElement("div");
        let key = currentRow[j];
        keyTile.innerText = key;

        if (key == "Enter"){
            keyTile.id = "Enter";
        }
        else if (key == "⌫" ){
            keyTile.id = "Backspace";
        }
        else if("A" <= key && key <= "Z")
        {
            keyTile.id = "Key" + key;
        }
        keyTile.addEventListener("click",processKey);

        if (key == "Enter"){
            keyTile.classList.add("enter-key-tile");

        } else {
            keyTile.classList.add("key-tile");
        }
        keyboardRow.appendChild(keyTile);
    }
        document.body.appendChild(keyboardRow)
    }
    document.addEventListener("keyup", (e) => {
        processInput(e);
    })
}

function processKey(){
    e = {"code" : this.id};
    processInput(e);
}


function processInput(e){
    if(gameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ"){
        if(column < width) {
            let currentTile = document.getElementById(row.toString() + "-" + column.toString());

            if(currentTile.innerText == ""){
                currentTile.innerText = e.code[3];
                column+=1
            }
        }
    }
    else if (e.code == "Backspace"){
        if(0 < column && column <= width){
            column -=1;
        }
        let currentTile = document.getElementById(row.toString() + "-" + column.toString());
        currentTile.innerText = " ";
    }
    else if(e.code == "Enter" ){
        update();
    }
    if(!gameOver && row == height){
        gameOver = true;
        document.getElementById("answer").innerText = word;

    }

    }

function update() {
let guess = "";
document.getElementById("answer").innerText = "";
for (let c=0; c < width; c++){
    let currentTile = document.getElementById(row.toString()+ "-" + column.toString());
    let letter = currentTile.innerText;
    guess += letter;
}
    guess = guess.toLowerCase();
    //check guess
    console.log(guess);

    if(!guessList.includes(guess)){
        document.getElementById("answer").innerText = "Not in word List, Please try again";
        return }

        let correct = 0;
        let letterCount = {};
        for(let i = 0; i < word.length; i++){
            let letter = word[i];
            if (letterCount[letter]){
                letterCount[letter]+=1;
            }
            else{
                letterCount[letter] = 1;
            }
        }
        //check letter count
        console.log(letterCount);

        for ( let c=0; c < width; c++){
            let currentTile = document.getElementById(row.toString() + "-" + column.toString());
            let letter = currentTile.innerText;

            if(word[c] == letter){
                currentTile.classList.add("correct")

                let keyTile = document.getElementById("Key" + letter);
                keyTile.classList.remove("present");
                keyTile.classList.add("correct");
                correct += 1;
                letterCount[letter] -=1
            }
            if (correct == width){
                gameOver = true;
            }
            }
            console.log(letterCount);

            for( let c = 0; c < width; c++){
                
                let currentTile = document.getElementById(row.toString() + "-" + column.toString());
                let letter = currentTile.innerText;

                if (!currentTile.classList.contains("correct")){
                    if(word.includes(letter)&& letterCount[letter]>0){
                        currentTile.classList.add("present");

                        let keyTile = document.getElementById("Key" + letter);
                        if(!keyTile.classList.contains("correct")){
                            keyTile.classList.add("present");
                        }
                        letterCount[letter] -=1;
                    }
                    else{
                        currentTile.classList.add("absent");
                        let keyTile = document.getElementById("Key" + letter);
                        keyTile.classList.add("absent")
                    }
                }
            }
            row += 1;
            column =0;
        }

