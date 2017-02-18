var playerPositions = [];
var enemyPositions = [];
var validPlayerPieces = [];
var anyMoveIsLegal = true;

function addPieces() {
  var innerBoxes = document.getElementsByClassName('innerBoxes');

  var playerPieceIndex = 0;
  var enemyPieceIndex = 0;

  for (var pieceNumber = 0; pieceNumber < 64; pieceNumber++) {
    var innerBox = innerBoxes[pieceNumber];
    if (innerBox.className.includes("playableBox")) {
      //This is where you want to put a soldier
      if (parseInt(innerBox.id) < 40) {
        //This is on the far side of the board (enemy side), therefore we are inserting red player pieces
        var newPiece = document.createElement('div');
        newPiece.id = "enemy" + String(pieceNumber);
        newPiece.className = "enemySoldier piece";
        innerBox.appendChild(newPiece);
        enemyPositions[enemyPieceIndex] = Number(innerBox.id);
        console.log(enemyPositions[enemyPieceIndex]);
        enemyPieceIndex++;
      } else if (parseInt(innerBox.id) > 60) {
        var newPiece = document.createElement('div');
        newPiece.id = "player" + String(pieceNumber);
        newPiece.className = "playerSoldier piece";
        innerBox.appendChild(newPiece);
        playerPositions[playerPieceIndex] = Number(innerBox.id);
        playerPieceIndex++;
      }
    }
  }
  var newPiece = document.createElement('div');
  newPiece.className = "enemySoldier piece";
  document.getElementById('56').appendChild(newPiece);
  enemyPositions[13] = 56;
  console.log(enemyPositions[13]);
}

function setupBoard() {

  var maindiv = document.getElementById('mainBoard');

  for (var acrossSquares = 1; acrossSquares <= 8; acrossSquares++) {
    for (var downSquares = 1; downSquares <= 8; downSquares++) {
      var name = String(acrossSquares) + String(downSquares);
      var newDiv = document.createElement('div');
      newDiv.id = name;
      newDiv.className = "innerBoxes";
      maindiv.appendChild(newDiv);
      if ((acrossSquares + downSquares) % 2 == 0) {
        newDiv.style.backgroundColor = "#ffffcc";
      } else {
        newDiv.style.backgroundColor = "#404040";
        newDiv.className += " playableBox"
      }
    }
  }

  addPieces();

}

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
    (function () {
      var isKing = 1;
      if (document.getElementById(String(playerPositions[i])).classList.contains("playerKing")) {
        isKing = -1;
      }
      //var that holds valid moves FOR THIS PIECE - purpose is for it to be passed onclick
      var validMoves = [];
      var validPiece = document.getElementById(String(playerPositions[i])).firstChild;
      var hasMoves = false;
      for (var i1 = isKing; i1 < 2; i1 += 2) {
        for (var i2 = 9; i2 < 12; i2 += 2) {
          var pieceToCapture = checkPosition(playerPositions[i], -i1 * i2);
          if(enemyPositions.indexOf(pieceToCapture) != -1) {
            //there is an enemy in that square
            var landingSquare = checkPosition(pieceToCapture, -i1 * i2);
            if(enemyPositions.indexOf(landingSquare) == -1 && playerPositions.indexOf(landingSquare) == -1) {
              //the landing square is free
              anyMoveIsLegal = false;
              hasMoves = true;
              validPiece.classList.add("valid");
              validMoves.push(landingSquare);
              validPlayerPieces.push(String(playerPositions[i]));
            }
          }
        }
      }
      if (hasMoves) {
        console.log(validMoves.length);
        validPiece.addEventListener("click", function () {movePiece(validMoves, this)});
      }

    }());
  }
}

function checkPosition(playerPos, change) {
  var newTotal = playerPos + change;
  playerPosFirstNumber = Number(String(playerPos).charAt(0));
  newTotalFirstNumber = Number(String(newTotal).charAt(0));
  var difference;
  if (change > 0) {
    difference = 1;
  } else {
    difference = -1;
  }
  if ((playerPosFirstNumber + difference) == newTotalFirstNumber && newTotal % 10 < 9) {
    //Number is accetable
    return newTotal;
  } else {
    return -1;
  }
}

function movePiece(squaresToHighlight, caller) {
  console.log(squaresToHighlight.length);
  for (var squares = 0; squares < squaresToHighlight.length; squares++) {
    (function () {
      var squareToChange = document.getElementById(String(squaresToHighlight[squares]));
      squareToChange.classList.add('landingSpace');
      squareToChange.setAttribute('onclick', 'commitMove(caller, squaresToHighlight[squares])');
    }());
  }
}
