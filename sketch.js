let font;
let board;
let tileSize;
let tableWidth;
let moving = false;

let gameOverMessage = null;

let whiteTurn = Math.random() > 0.5; //decide 1st turn randomly

function preload() {
  font = loadFont('assets/8-BITWONDER.TTF');
}

function setup() {
  if(windowHeight < 1.5*windowWidth) {
    tileSize = windowHeight / 6;
  } else {
    tileSize = windowWidth / 4;
  }

  tableWidth = tileSize*4;
  tableHeight = tileSize*6;

  console.log(tileSize);

  //createCanvas(4 * tileSize, 4 * tileSize + 2*sidelineSize);
  createCanvas(windowWidth, windowHeight);
  board = new Board();
  board.newGame();
}

function draw() {
  background(0);
  //background(153, 0, 51);
  drawGrid(4, 4, tileSize, tileSize);
  board.draw();

  gameOverMessage = board.gameIsOver();

  if(gameOverMessage){
    //tint
    fill(0, 0, 0, 150);
    noStroke();
    rect(0, 0, windowWidth, windowHeight);

    fill(0);
    stroke(255);
    rect(windowWidth/2 - 110, windowHeight/2 - 50, 220, 100);

    fill(255);
    noStroke();

    textSize(18);
    textFont(font);
    textAlign(CENTER);
    text(gameOverMessage, windowWidth/2, windowHeight/2 - 20);
  }

  //Draw "YOUR TURN" text
  fill(0);
  noStroke();
  textSize(18);
  textFont(font);
  textAlign(CENTER);
  if(whiteTurn) {
    push();
    translate(windowWidth/2, windowHeight/2 - 3*tileSize + 10);
    rotate(PI);
    text("YOUR TURN", 0, 0);
    pop();
  } else {
    text("YOUR TURN", windowWidth/2, windowHeight/2 + 3*tileSize - 10);
  }
}

function drawGrid(x, y, tileSize, sidelineSize) {
  //draw sidelines
  fill(153, 0, 51);
  noStroke();
  rect((windowWidth - tableWidth) / 2, (windowHeight - tableHeight) / 2, tableWidth, tableHeight);

  //draw table
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      if ((i + j) % 2 == 1) {
        fill(0);
      } else {
        fill(240);
      }
      noStroke();
      rect(windowWidth/2 + (i - x/2) * tileSize, windowHeight/2 + (j - y/2) * tileSize, tileSize, tileSize);
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
    if(mouseY < (windowHeight/2 - 2*tileSize) && whiteTurn) { //white sideline
      const piece = board.getWhiteSidelinePiece()
      if(piece) {
        piece.isMoving = true;
      }
    } else if(mouseY > (windowHeight/2 + 2*tileSize) && !whiteTurn) { //blackSideline
      const piece = board.getBlackSidelinePiece()
      if(piece) {
        piece.isMoving = true;
      }
    } else { //game
      const x = floor((mouseX - windowWidth/2 + 2*tileSize) / tileSize);
      const y = floor((mouseY - windowHeight/2 + 2*tileSize) / tileSize);

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
    const newPosition = createVector(floor((mouseX - windowWidth/2 + 2*tileSize) / tileSize), floor((mouseY - windowHeight/2 + 2*tileSize) / tileSize));
    if(piece.validMove(newPosition.x, newPosition.y)) {
      piece.matrixPosition = newPosition;
      piece.isInPlay = true;

      whiteTurn = !whiteTurn; //toggle who's turn it is
    } else {
      console.error('invalid')
    }

  }
}
