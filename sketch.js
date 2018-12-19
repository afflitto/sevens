const tileSize = 100;
const sidelineSize = 100;

let font;
let board;
let moving = false;

let gameOverMessage = null;

let whiteTurn = Math.random() > 0.5; //decide 1st turn randomly

function preload() {
  font = loadFont('assets/8-BITWONDER.TTF');
}

function setup() {
  createCanvas(4 * tileSize, 4 * tileSize + 2*sidelineSize);
  board = new Board();
  board.newGame();
}

function draw() {
  background(153, 0, 51);
  drawGrid(4, 4, tileSize, sidelineSize);
  board.draw();

  gameOverMessage = board.gameIsOver();

  if(gameOverMessage){
    //tint
    fill(0, 0, 0, 150);
    rect(0, 0, 4 * tileSize, 4* tileSize + 2 * sidelineSize);

    fill(0);
    stroke(255);
    rect(90, 250, 220, 100);

    fill(255);
    noStroke();

    textSize(18);
    textFont(font);
    textAlign(CENTER);
    text(gameOverMessage, 200, 280);
  }
}

function drawGrid(x, y, tileSize, sidelineSize) {
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
  if(gameOverMessage) {
    board.newGame();
  } else {
    if(mouseY < sidelineSize && whiteTurn) { //white sideline
      const piece = board.getWhiteSidelinePiece()
      if(piece) {
        piece.isMoving = true;
      }
    } else if(mouseY > 4*tileSize + sidelineSize && !whiteTurn) { //blackSideline
      const piece = board.getBlackSidelinePiece()
      if(piece) {
        piece.isMoving = true;
      }
    } else { //game
      const x = floor(mouseX / tileSize);
      const y = floor((mouseY - sidelineSize) / tileSize);

      const piece = board.getPieceAt(x, y);
      if(piece && piece.white == whiteTurn) {
        piece.isMoving = true;
      }
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

      whiteTurn = !whiteTurn; //toggle who's turn it is
    } else {
      console.error('invalid')
    }

  }
}
