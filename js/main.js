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
				newDiv.style.backgroundColor = 	"white";
			} else {
				newDiv.style.backgroundColor = "black";
			}
		}
	}

}