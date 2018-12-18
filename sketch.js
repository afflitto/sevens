const tileSize = 100;
const sidelineSize = 100;

let board

function setup() {
  createCanvas(4 * tileSize, 4 * tileSize + 2*sidelineSize);
  board = new Board();
  board.newGame();
}

function draw() {
  background(100);
  showGrid(4, 4, tileSize, sidelineSize);
  board.draw();
}

function showGrid(x, y, tileSize, sidelineSize) {
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      if ((i + j) % 2 == 1) {
        fill(0);
      } else {
        fill(240);
      }
      noStroke();
      rect(i * tileSize, sidelineSize + j * tileSize, tileSize, tileSize);
    }
  }
}

function keyPressed() {
  //nothing
}

function mousePressed() {
  var x = floor(mouseX / tileSize);
  var y = floor(mouseY / tileSize);
  if (!test.isDone()) {
    if (!moving) {
      movingPiece = test.getPieceAt(x, y);
      if (movingPiece != null && movingPiece.white == whitesMove) {

        movingPiece.movingThisPiece = true;
      } else {
        return;
      }
    } else {
      if (movingPiece.canMove(x, y, test)) {
        movingPiece.move(x, y, test);
        movingPiece.movingThisPiece = false;
        whitesMove = !whitesMove;
      } else {
        movingPiece.movingThisPiece = false;

      }
    }
    moving = !moving;
  }
}
