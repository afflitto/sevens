class Piece {
  constructor(isWhite, isInPlay) {
    this.matrixPosition = null;
    this.pixelPosition = null;

    this.taken = false;
    this.white = isWhite;
    this.movingThisPiece = false;
    this.value = 0;

    this.isInPlay = isInPlay;
  }
}
