
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
}
