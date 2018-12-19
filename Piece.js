class Piece {
  constructor(isWhite, isInPlay) {
    this.matrixPosition = null;
    this.pixelPosition = null;

    this.taken = false;
    this.white = isWhite;
    this.isMoving = false;
    this.value = 0;

    this.isInPlay = isInPlay;
  }

  validMove(x, y) {
    if(x < 0 || x > 3 || y < 0 || y > 3) { //out of bounds
      return false
    }

    if(board.getPieceAt(x, y)) { //position contains piece
      return false;
    } else { //position is open
      if(!this.isInPlay) { //coming from sideline
        return true;
      } else { //already on board
        const oldX = this.matrixPosition.x;
        const oldY = this.matrixPosition.y;

        if(abs(oldX - x) <= 1 && abs(oldY - y) <= 1) { //normal move
          return true;
        } else if(abs(oldX - x) == 2 && oldY == y) { //horizontal jump
          const jumped = board.getPieceAt((oldX + x)/2, y);
          if(jumped && jumped.white != this.white) {
            jumped.matrixPosition = null;
            jumped.isInPlay = false;
            jumped.taken = true;
            return true;
          }
          return false;
        } else if(abs(oldY - y) == 2 && oldX == x) { //vertical jump
          const jumped = board.getPieceAt(x, (oldY + y)/2);
          console.log(jumped)
          if(jumped && jumped.white != this.white) {
            jumped.matrixPosition = null;
            jumped.isInPlay = false;
            jumped.taken = true;
            return true;
          }
          return false;
        } else if(abs(oldX - x) == 2 && abs(oldY - y) == 2) { //diagonal jump
          const jumped = board.getPieceAt((oldX + x)/2, (oldY + y)/2);
          if(jumped && jumped.white != this.white) {
            jumped.matrixPosition = null;
            jumped.isInPlay = false;
            jumped.taken = true;
            return true;
          }
          return false;
        }
      }
    }
    return false;
  }
}
