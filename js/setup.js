//function that adds pieces to the board
function addPieces() {
    //gets all the playing boxes/squares and puts them in an array
    var innerBoxes = document.getElementsByClassName('innerBoxes');

    for (var pieceNumber = 0; pieceNumber < 64; pieceNumber++) {
        //Looping through each of the playable squares
        //Create a local var to hold the playable square in question that the loop has brought focus to
        var innerBox = innerBoxes[pieceNumber];
        if (innerBox.className.includes("playableBox")) {
            //This is where you want to put a soldier
            if (parseInt(innerBox.id) < 40) {
                //This is on the far side of the board (AI side), therefore we are inserting red player pieces
                //Create the piece as a div
                var newPiece = document.createElement('div');
                //Give the piece an id and class
                newPiece.id = "enemy" + String(pieceNumber);
                newPiece.className = "enemySoldier piece";
                //Append it to the square
                innerBox.appendChild(newPiece);
                //Push it to the array containing all the enemy pieces
                AIPositions.push(Number(innerBox.id));
            } else if (parseInt(innerBox.id) > 60) {
                //Same thing as above, just for player pieces
                var newPiece = document.createElement('div');
                newPiece.id = "player" + String(pieceNumber);
                newPiece.className = "playerSoldier piece";
                innerBox.appendChild(newPiece);
                userPositions.push(Number(innerBox.id));
            }
        }
    }
    //Just a test object, will be commented out soon
    var newPiece = document.createElement('div');
    newPiece.className = "enemySoldier piece";
    document.getElementById('56').appendChild(newPiece);
    AIPositions[13] = 56;
    console.log(AIPositions[13]);
}


//Function that creates the board
function setupBoard() {
    //recognise the board div as a variable
    var maindiv = document.getElementById('mainBoard');

    //Iterate over all the squares
    for (var acrossSquares = 1; acrossSquares <= 8; acrossSquares++) {
        for (var downSquares = 1; downSquares <= 8; downSquares++) {
            //Variable for the id
            var name = String(acrossSquares) + String(downSquares);
            //Create the square div
            var newDiv = document.createElement('div');
            //Give it an id and a class name
            newDiv.id = name;
            newDiv.className = "innerBoxes";
            //Append it
            maindiv.appendChild(newDiv);
            //If its an even number, give it white, if its odd give it black
            if ((acrossSquares + downSquares) % 2 == 0) {
                newDiv.style.backgroundColor = "#ffffcc";
            } else {
                newDiv.style.backgroundColor = "#404040";
                newDiv.className += " playableBox"
            }
        }
    }

    //Add pieces to the board
    addPieces();

}
