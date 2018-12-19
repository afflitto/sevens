const tileSize = 100;
const sidelineSize = 100;

let board;

let moving = false;

function setup() {
  createCanvas(4 * tileSize, 4 * tileSize + 2*sidelineSize);
  board = new Board();
  board.newGame();
}

function draw() {
  background(100);
  showGrid(4, 4, tileSize, sidelineSize);
  board.draw();

  if(board.gameIsOver()){
    console.log(board.gameIsOver());
  }
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
  if(mouseY < sidelineSize) { //white sideline
    const piece = board.getWhiteSidelinePiece()
    if(piece) {
      piece.isMoving = true;
    }
  } else if(mouseY > 4*tileSize + sidelineSize) { //blackSideline
    const piece = board.getBlackSidelinePiece()
    if(piece) {
      piece.isMoving = true;
    }
  } else { //game
    const x = floor(mouseX / tileSize);
    const y = floor((mouseY - sidelineSize) / tileSize);

    console.log(x, y)

    const piece = board.getPieceAt(x, y);
    if(piece) {
      piece.isMoving = true;
    }
  }
}

function mouseReleased() {
  const piece = board.getMoving();
  if(piece){
    piece.isMoving = false;
    const newPosition = createVector(floor(mouseX / tileSize), floor((mouseY - sidelineSize) / tileSize));
    if(piece.validMove(newPosition.x, newPosition.y)) {
      piece.matrixPosition = newPosition;
      piece.isInPlay = true;
    } else {
      console.error('invalid')
    }

  }
}
