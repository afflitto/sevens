class Board {
  constructor() {
    this.pieces = []; //pieces on the board
  }

  newGame() {
    //re-init array
    this.pieces = [];

    //7 white pieces
    for(let i = 0; i < 7; i++) {
      this.pieces.push(new Piece(true, false));
    }
    //7 black pieces
    for(let i = 0; i < 7; i++) {
      this.pieces.push(new Piece(false, false));
    }
  }

  getPieceAt(x, y) {
    return this.pieces.filter(piece => piece.isInPlay && piece.matrixPosition.x == x && piece.matrixPosition.y == y)[0];
  }

  getMoving() {
    return this.pieces.filter(piece => piece.isMoving)[0];
  }

  draw() {
    ellipseMode(CENTER);

    const whiteSideline = this.pieces.filter(piece => !piece.isInPlay && piece.white && !piece.isMoving && !piece.taken);
    whiteSideline.forEach((piece, index) => {
      fill(255);
      stroke(0);
      ellipse((index * tileSize * 4)/7 + (tileSize * 4 / 7 / 2) + windowWidth/2 - tileSize * 2, windowHeight/2 - tileSize*2.5,  tileSize*0.35);
    });

    const blackSideline = this.pieces.filter(piece => !piece.isInPlay && !piece.white && !piece.isMoving && !piece.taken);
    blackSideline.forEach((piece, index) => {
      fill(0);
      stroke(255);
      ellipse((index * tileSize * 4)/7 + (tileSize * 4 / 7 / 2) + windowWidth/2 - tileSize * 2, windowHeight/2 + tileSize*2.5,  35);
    });

    const whiteInPlay = this.pieces.filter(piece => piece.isInPlay && piece.white && !piece.isMoving);
    whiteInPlay.forEach(piece => {
      fill(255);
      stroke(0);
      ellipse(windowWidth/2 + piece.matrixPosition.x * tileSize - 1.5*tileSize, windowHeight/2 + piece.matrixPosition.y * tileSize - 1.5*tileSize, tileSize*0.5)
    });

    const blackInPlay = this.pieces.filter(piece => piece.isInPlay && !piece.white && !piece.isMoving);
    blackInPlay.forEach(piece => {
      fill(0);
      stroke(255);
      ellipse(windowWidth/2 + piece.matrixPosition.x * tileSize - 1.5*tileSize, windowHeight/2 + piece.matrixPosition.y * tileSize - 1.5*tileSize, tileSize*0.5)
    });

    const movingPieces = this.pieces.filter(piece => piece.isMoving);
    movingPieces.forEach(piece => {
      if(piece.white) {
        fill(255);
        stroke(0);
      } else {
        fill(0);
        stroke(255);
      }
      ellipse(mouseX, mouseY, tileSize * 0.6);
    })
  }

  getWhiteSidelinePiece() {
    return this.pieces.filter(piece => !piece.isInPlay && piece.white && !piece.taken)[0];
  }

  getBlackSidelinePiece() {
    return this.pieces.filter(piece => !piece.isInPlay && !piece.white && !piece.taken)[0];
  }

  gameIsOver() {
    if(this.pieces.filter(piece => piece.white && !piece.taken).length == 0) {
      return "Game over\n\nBlack wins";
    }
    if(this.pieces.filter(piece => !piece.white && !piece.taken).length == 0) {
      return "Game over\n\nWhite wins";
    }

    const numWhiteRows = [0, 0, 0, 0];
    const numBlackRows = [0, 0, 0, 0];
    const numWhiteCols = [0, 0, 0, 0];
    const numBlackCols = [0, 0, 0, 0];
    const numWhiteDiags = [0, 0]; //negative diag, positive diag
    const numBlackDiags = [0, 0];

    this.pieces.forEach(piece => {
      if(piece.matrixPosition && piece.isInPlay && !piece.taken) {
        if(piece.white) {
          numWhiteRows[piece.matrixPosition.y]++;
          numWhiteCols[piece.matrixPosition.x]++;
          if(piece.matrixPosition.x == piece.matrixPosition.y) {
            numWhiteDiags[0]++;
          }
          if(piece.matrixPosition.x == 3 - piece.matrixPosition.y) {
            numWhiteDiags[1]++;
          }
        } else {
          numBlackRows[piece.matrixPosition.y]++;
          numBlackCols[piece.matrixPosition.x]++;
          if(piece.matrixPosition.x == piece.matrixPosition.y) {
            numBlackDiags[0]++;
          }
          if(piece.matrixPosition.x == 3 - piece.matrixPosition.y) {
            numBlackDiags[1]++;
          }
        }
      }
    });

    const reducer = (acc, val) => acc = acc || val == 4;
    if(numWhiteRows.reduce(reducer, false) || numWhiteCols.reduce(reducer, false) || numWhiteDiags.reduce(reducer, false)) {
      return "Game over\n\nWhite wins";
    }

    if(numBlackRows.reduce(reducer, false) || numBlackCols.reduce(reducer, false) || numBlackDiags.reduce(reducer, false)) {
      return "Game over\n\nBlack wins";
    }
  }
}
