var playerPositions = [];
var enemyPositions = [];
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
    var possPosition1 = checkPosition(playerPositions[i], -9);
    var possPosition2 = checkPosition(playerPositions[i], -11);
    console.log(possPosition1);
    if (enemyPositions.indexOf(possPosition1) != -1) {
      //there is an enemy piece in that square
      var jumpLandSpace = checkPosition(possPosition1, -9);
      if (playerPositions.indexOf(jumpLandSpace) == -1 && enemyPositions.indexOf(jumpLandSpace) == -1) {
        //its empty, therefore mandatory move
        anyMoveIsLegal = false;
        alert();
        document.getElementById(String(jumpLandSpace)).style.backgroundColor = "red";
      }
    }

    if (enemyPositions.indexOf(possPosition2) != -1) {
      //there is an enemy piece in that square
      var jumpLandSpace = checkPosition(possPosition2, -11);
      if (playerPositions.indexOf(jumpLandSpace) == -1 && enemyPositions.indexOf(jumpLandSpace) == -1) {
        //its empty, therefore mandatory move
        anyMoveIsLegal = false;
        alert();
        document.getElementById(String(jumpLandSpace)).style.backgroundColor = "red";
      }
    }
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
