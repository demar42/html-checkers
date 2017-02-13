function addPieces() {
  var innerBoxes = document.getElementsByClassName('innerBoxes');

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
      } else if (parseInt(innerBox.id) > 60) {
        var newPiece = document.createElement('div');
        newPiece.id = "player" + String(pieceNumber);
        newPiece.className = "playerSoldier piece";
				innerBox.appendChild(newPiece);
      }
    }
  }
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
