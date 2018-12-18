class Board {
  constructor() {
    this.pieces = []; //pieces on the board
  }

  newGame() {
    //7 white pieces
    for(let i = 0; i < 7; i++) {
      this.pieces.push(new Piece(true, false));
    }
    //7 black pieces
    for(let i = 0; i < 7; i++) {
      this.pieces.push(new Piece(false, false));
    }
  }

  draw() {
    ellipseMode(CENTER);

    const whiteSideline = this.pieces.filter(piece => !piece.isInPlay && piece.white);
    whiteSideline.forEach((piece, index) => {
      fill(255);
      stroke(0);
      ellipse((index * tileSize * 4)/7 + 29, sidelineSize/2,  35);
    });

    const blackSideline = this.pieces.filter(piece => !piece.isInPlay && !piece.white);
    blackSideline.forEach((piece, index) => {
      fill(0);
      stroke(255);
      ellipse((index * tileSize * 4)/7 + 29, 500 + sidelineSize/2,  35);
    });

    const whiteInPlay = this.pieces.filter(piece => piece.isInPlay && piece.white);
    whiteInPlay.forEach(piece => {
      fill(255);
      stroke(0);
      ellipse(piece.matrixPosition.x * tileSize + tileSize / 2, sidelineSize +  piece.matrixPosition.y * tileSize + tileSize / 2)
    });
  }

}
