"use strict";

//variable that holds the positions of the players and enemies
var playerPositions = [];
var enemyPositions = [];
//variable that holds all the player pieces that are "valid" - have valid moves. This is used for highlighting
var validPlayerPieces = [];

//If there are no mandatory moves, then any move is legal.
var anyMoveIsLegal = true;

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
                //This is on the far side of the board (enemy side), therefore we are inserting red player pieces
                //Create the piece as a div
                var newPiece = document.createElement('div');
                //Give the piece an id and class
                newPiece.id = "enemy" + String(pieceNumber);
                newPiece.className = "enemySoldier piece";
                //Append it to the square
                innerBox.appendChild(newPiece);
                //Push it to the array containing all the enemy pieces
                enemyPositions.push(Number(innerBox.id));
            } else if (parseInt(innerBox.id) > 60) {
                //Same thing as above, just for player pieces
                var newPiece = document.createElement('div');
                newPiece.id = "player" + String(pieceNumber);
                newPiece.className = "playerSoldier piece";
                innerBox.appendChild(newPiece);
                playerPositions.push(Number(innerBox.id));
            }
        }
    }
    //Just a test object, will be commented out soon
    var newPiece = document.createElement('div');
    newPiece.className = "enemySoldier piece";
    document.getElementById('56').appendChild(newPiece);
    enemyPositions[13] = 56;
    console.log(enemyPositions[13]);
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

//This function is called when the game is started by the user. playerStarting is a bool that represents whether the game is to be started by the AI or the player
function startGame(playerStarting) {
    if (playerStarting) {
        playerMove();
    } else {
        //AI is starting TODO: add method to link to AI from here
    }
}

function playerMove() {
    //Check for mandatory moves
    for (var i = 0; i < playerPositions.length; i++) {
        //prevent variable hoisting
        (function() {
            var isKing = 1;
            if (document.getElementById(String(playerPositions[i])).classList.contains("playerKing")) {
                //if the piece is a king, then it can go backwards. thus isKing is made -1 so that the for loop will iterate over all 4 possible positions not just 2
                isKing = -1;
            }
            //var that holds valid moves FOR THIS PIECE - purpose is for it to be passed onclick
            var validMoves = [];
            var validPiece = document.getElementById(String(playerPositions[i])).firstChild;
            var hasMoves = false;
            //Iterate forward and back
            for (var i1 = isKing; i1 < 2; i1 += 2) {
                //Iterate left and right
                for (var i2 = 9; i2 < 12; i2 += 2) {
                    var pieceToCapture = checkPosition(playerPositions[i], -i1 * i2);
                    if (enemyPositions.indexOf(pieceToCapture) != -1) {
                        //there is an enemy in that square
                        var landingSquare = checkPosition(pieceToCapture, -i1 * i2);
                        if (enemyPositions.indexOf(landingSquare) == -1 && playerPositions.indexOf(landingSquare) == -1 && landingSquare != -1) {
                            //the landing square is free
                            anyMoveIsLegal = false;
                            hasMoves = true;
                            validPiece.classList.add("valid");
                            validMoves.push(landingSquare);
                            validPlayerPieces.push(String(playerPositions[i]));
                            console.log(landingSquare);
                        }
                    }
                }
            }
            if (hasMoves) {
                //give the piece an onclick if it has moves.
                console.log(validMoves.length);
                //pass an array showing the possible positions as well as the piece's id
                $("#" + String(playerPositions[i])).on('click', function() {
                    movePiece(validMoves, this)
                });
                //validPiece.addEventListener("click", function() {movePiece(validMoves, this)});
            }

        }());
    }
}

function checkPosition(playerPos, change) {
    var newTotal = playerPos + change;
    var playerPosFirstNumber = Number(String(playerPos).charAt(0));
    var newTotalFirstNumber = Number(String(newTotal).charAt(0));
    var difference;
    if (change > 0) {
        difference = 1;
    } else {
        difference = -1;
    }
    if ((playerPosFirstNumber + difference) == newTotalFirstNumber && newTotal % 10 < 9) {
        //Number is acceptable
        return newTotal;
    } else {
        return -1;
    }
}

//recieved when a valid piece is clicked - recieves the possible positions and the id
function movePiece(squaresToHighlight, caller) {
    cleanUp('landingSpace');
    console.log("clicked");
    for (var squares = 0; squares < squaresToHighlight.length; squares++) {
        (function() {
            var squareToChange = document.getElementById(String(squaresToHighlight[squares]));
            squareToChange.classList.add('landingSpace');
            //onclick, pass the id of the piece that needs to be moved, as well as the square its going to move to
            var landingSquare = squaresToHighlight[squares];
            $('#' + squaresToHighlight[squares]).on("click", function() {
                commitMove(caller, landingSquare)
            });
            //squareToChange.addEventListener("click", commitMove.bind(caller, landingSquare));
        }());

    }
}

function commitMove(pieceToBeMoved, squareToMoveTo) {
    //console.log(squareToMoveTo);
    //console.log(pieceToBeMoved);
    var piecePosition = Number(pieceToBeMoved.id);
    //Change the number in the array
    console.log(pieceToBeMoved.id);
    var arrayPosition = playerPositions.indexOf(piecePosition);
    playerPositions[arrayPosition] = squareToMoveTo;
    //Move the actual div
    document.getElementById(String(squareToMoveTo)).appendChild(pieceToBeMoved.firstChild);
    //Capture a piece
    if (Math.abs(piecePosition - squareToMoveTo) > 11) {
        //The piece has taken a double jump
        //The captured piece is located in the average between the new pieces
        var capturedPiecePosition = (piecePosition + squareToMoveTo) / 2;
        //remove the piece from array
        enemyPositions[enemyPositions.indexOf(capturedPiecePosition)] = 0;
        //remove the piece from view
        var capturedSquare = document.getElementById(String(capturedPiecePosition));
        capturedSquare.removeChild(capturedSquare.firstChild);
    }
    cleanUp("valid");
    cleanUp("landingSpace");
}

//function that cleans up all the current highlighting and the event listener
function cleanUp(classToClean) {
    //get everything that needs to be cleaned
    var elements = $('.' + classToClean);
    if (classToClean == 'valid') {
        elements.parent().off("click");
    } else {
        elements.off("click");
    }
    //clean off the classes
    elements.removeClass(classToClean);
    /*
    while (elements.length) {
      elements[0].classList.remove(classToClean);
      if (clickListener) {
        elements[0].removeEventListener("click", commitMove);
      }
    }
    */
}
