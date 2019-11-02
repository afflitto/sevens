function calculateScore(board) {
  const whitePieces = board.pieces.filter(piece => piece.white);
  const blackPieces = board.pieces.filter(piece => !piece.white);
  let score = 0;

  //point for each taken black pieces
  blackPieces.forEach(piece => {
    if(piece.matrixPosition) {
      const x = piece.matrixPosition.x;
      const y = piece.matrixPosition.y;

      if((x == 0 && y == 0) || (x == 0 && y == 3) || (x == 3 && y == 0) || (x == 3 && y == 3)) {
        score -= 3;
      }
      if((x == 1 && y == 0) || (x == 2 && y == 0) || (x == 1 && y == 3) || (x == 2 && y == 3) || (x == 0 && y == 1) || (x == 0 && y == 2) || (x == 3 && y == 1) || (x == 3 && y == 2)) {
        score -= 2;
      }
    }

    if(piece.taken) {
      score++;
    }
  });

  whitePieces.forEach(piece => {
    if(piece.matrixPosition) {
      const x = piece.matrixPosition.x;
      const y = piece.matrixPosition.y;

      if((x == 0 && y == 0) || (x == 0 && y == 3) || (x == 3 && y == 0) || (x == 3 && y == 3)) {
        score += 3;
      }
      if((x == 1 && y == 0) || (x == 2 && y == 0) || (x == 1 && y == 3) || (x == 2 && y == 3) || (x == 0 && y == 1) || (x == 0 && y == 2) || (x == 3 && y == 1) || (x == 3 && y == 2)) {
        score += 2;
      }
    }

    if(piece.taken){
      score--;
    }

  });

  //game won
  const gameIsOver = board.gameIsOver();

  if(gameIsOver && gameIsOver.includes('White')){
    score += 100;
  }

  //game lost
  if(gameIsOver && gameIsOver.includes('Black')){
    score -= 100;
  }

  return score;
}

function makeBestMove(board){
  let scores = [];

  const whitePieces = board.pieces.filter(piece => piece.white && !piece.taken);

  whitePieces.forEach(piece => {
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 4; j++) {
        const clonedBoard = board.clone();
        if(piece.validMove(i, j)){
          let clonedPiece;
          if(piece.isInPlay) {
            const x = piece.matrixPosition.x;
            const y = piece.matrixPosition.y;

            clonedPiece = clonedBoard.getPieceAt(x, y);
          } else {
            clonedPiece = clonedBoard.pieces.filter(piece => piece.white && !piece.taken && !piece.isInPlay)[0];
          }
          const origin = clonedPiece.matrixPosition;
          if(clonedPiece) {
            clonedPiece.matrixPosition = createVector(i, j);
          }

          scores.push({score: calculateScore(clonedBoard), origin: origin, destination: createVector(i, j)});
        }
      }
    }
  })
  const highestScore = scores.reduce((acc, val) => acc = (val.score > acc.score ? val : acc));
  console.log(scores);
  if(highestScore.origin) {
    board.getPieceAt(highestScore.origin).matrixPosition = highestScore.destination;
  } else {
    const piece = board.getWhiteSidelinePiece();
    piece.matrixPosition = highestScore.destination;
    piece.isInPlay = true;
  }
}
