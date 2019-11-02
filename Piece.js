class Piece {
  constructor(isWhite, isInPlay, matrixPosition, taken) {
    if(matrixPosition) {
      this.matrixPosition = createVector(matrixPosition.x, matrixPosition.y);
    } else {
      this.matrixPosition = null;
    }
    this.taken = taken || false;
    this.white = isWhite;
    this.isMoving = false;
    this.isInPlay = isInPlay;
  }

  validMove(x, y) {
    if(this.taken) {
      return false;
    }

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
          if(jumped && jumped.white != this.white) {
            console.log('jumped')
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

  validJump() {
    if(matrixPosition) {
      const x = this.matrixPosition.x;
      const y = this.matrixPosition.y;

      if(x <= 1 && y <= 1) {
        if(!board.getPieceAt(x+2, y) && board.getPieceAt(x+1, y).white != this.white) {
          return true
        } else if(!board.getPieceAt(x, y+2) && board.getPieceAt(x, y+1).white != this.white) {
          return true
        } else if(!board.getPieceAt(x+2, y+2) && board.getPieceAt(x+1, y+1).white != this.white) {
          return true
        }
      } else if(x <= 1 && y >= 2) {
        if(!board.getPieceAt(x+2, y) && board.getPieceAt(x+1, y).white != this.white) {
          return true
        } else if(!board.getPieceAt(x, y-2) && board.getPieceAt(x, y-1).white != this.white) {
          return true
        } else if(!board.getPieceAt(x+2, y-2) && board.getPieceAt(x+1, y-1).white != this.white) {
          return true
        }
      } else if(x >= 2  && y <= 1) {
        if(!board.getPieceAt(x-2, y) && board.getPieceAt(x-1, y).white != this.white) {
          return true
        } else if(!board.getPieceAt(x, y+2) && board.getPieceAt(x, y+1).white != this.white) {
          return true
        } else if(!board.getPieceAt(x-2, y+2) && board.getPieceAt(x-1, y+1).white != this.white) {
          return true
        }
      } else if(x >= 2  && y >= 2) {
        if(!board.getPieceAt(x-2, y) && board.getPieceAt(x-1, y).white != this.white) {
          return true
        } else if(!board.getPieceAt(x, y-2) && board.getPieceAt(x, y-1).white != this.white) {
          return true
        } else if(!board.getPieceAt(x-2, y-2) && board.getPieceAt(x-1, y-1).white != this.white) {
          return true
        }
      }
    }
    return false;
  }
}
