import Figure from './Figure';

export default class Queen extends Figure {
  constructor (player) {
    super(
      player,
      (player === 1)
        ? 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg'
    );
  }

  getPossibleMoves(squares, squarePosition) {
    const {row, col} = squarePosition;
    const possibleMoves = [];

    for (let i = row + 1, j = col + 1; i < 8; i++, j++) {
      if (j >= 8) {
        break;
      }

      if (!(squares[i][j] instanceof Figure)) {
        possibleMoves.push([i, j]);
      } else if (squares[i][j].player !== squares[row][col].player) {
        possibleMoves.push([i, j]);
  
        break;
      } else {
        break;
      }
    }

    for (let i = row - 1, j = col - 1; i >= 0; i--, j--) {
      if (j < 0) {
        break;
      }
      
      if (!(squares[i][j] instanceof Figure)) {
        possibleMoves.push([i, j]);
      } else if (squares[i][j].player !== squares[row][col].player) {
        possibleMoves.push([i, j]);
  
        break;
      } else {
        break;
      }
    }

    for (let i = row - 1, j = col + 1; i >= 0; i--, j++) {
      if (j >= 8) {
        break;
      }
      
      if (!(squares[i][j] instanceof Figure)) {
        possibleMoves.push([i, j]);
      } else if (squares[i][j].player !== squares[row][col].player) {
        possibleMoves.push([i, j]);
  
        break;
      } else {
        break;
      }
    }

    for (let i = row + 1, j = col - 1; i < 8; i++, j--) {
      if (j < 0) {
        break;
      }
      
      if (!squares[i][j]) {
        possibleMoves.push([i, j]);
      } else if (squares[i][j].player !== squares[row][col].player) {
        possibleMoves.push([i, j]);
  
        break;
      } else {
        break;
      }
    }

    for (let i = col + 1; i < 8; i++) {
      if (!(squares[row][i] instanceof Figure)) {
        possibleMoves.push([row, i]);
      } else if (squares[row][i].player !== squares[row][col].player) {
        possibleMoves.push([row, i]);

        break;
      } else {
        break;
      }
    }

    for (let i = col - 1; i >= 0; i--) {
      if (!(squares[row][i] instanceof Figure)) {
        possibleMoves.push([row, i]);
      } else if (squares[row][i].player !== squares[row][col].player) {
        possibleMoves.push([row, i]);

        break;
      } else {
        break;
      }
    }

    for (let i = row + 1; i < 8; i++) {
      if (!(squares[i][col] instanceof Figure)) {
        possibleMoves.push([i, col]);
      } else if (squares[i][col].player !== squares[row][col].player) {
        possibleMoves.push([i, col]);

        break;
      } else {
        break;
      }
    }

    for (let i = row - 1; i >= 0; i--) {
      if (!(squares[i][col] instanceof Figure)) {
        possibleMoves.push([i, col]);
      } else if (squares[i][col].player !== squares[row][col].player) {
        possibleMoves.push([i, col]);
        break;
      } else {
        break;
      }
    }

    return possibleMoves;
  }

  getAttackedFigures(squares, squarePosition) {
    const {row, col} = squarePosition;
    const possibleMoves = [];

    for (let i = row + 1, j = col + 1; i < 8; i++, j++) {
      if (j >= 8) {
        break;
      }

      if (squares[i][j] instanceof Figure && squares[i][j].player === this.player) {
        break;
      }

      if (squares[i][j] instanceof Figure && squares[i][j].player !== this.player) {
        possibleMoves.push([i, j]);
        break;
      }
    }

    for (let i = row - 1, j = col - 1; i >= 0; i--, j--) {
      if (j < 0) {
        break;
      }

      if (squares[i][j] instanceof Figure && squares[i][j].player === this.player) {
        break;
      }
      
      if (squares[i][j] instanceof Figure && squares[i][j].player !== this.player) {
        possibleMoves.push([i, j]);
        break;
      }
    }

    for (let i = row - 1, j = col + 1; i >= 0; i--, j++) {
      if (j >= 8) {
        break;
      }

      if (squares[i][j] instanceof Figure && squares[i][j].player === this.player) {
        break;
      }
      
      if (squares[i][j] instanceof Figure && squares[i][j].player !== this.player) {
        possibleMoves.push([i, j]);
        break;
      }
    }

    for (let i = row + 1, j = col - 1; i < 8; i++, j--) {
      if (j < 0) {
        break;
      }

      if (squares[i][j] instanceof Figure && squares[i][j].player === this.player) {
        break;
      }
      
      if (squares[i][j] instanceof Figure && squares[i][j].player !== this.player) {
        possibleMoves.push([i, j]);
        break;
      }
    }

    for (let i = col + 1; i < 8; i++) {
      if (squares[row][i] instanceof Figure && squares[row][i].player === this.player) {
        break;
      }
      if (squares[row][i] instanceof Figure && squares[row][i].player !== this.player) {
        possibleMoves.push([row, i]);
        break;
      }
    }

    for (let i = col - 1; i >= 0; i--) {
      if (squares[row][i] instanceof Figure && squares[row][i].player === this.player) {
        break;
      }
      if (squares[row][i] instanceof Figure && squares[row][i].player !== this.player) {
        possibleMoves.push([row, i]);
        break;
      }
    }

    for (let i = row + 1; i < 8; i++) {
      if (squares[i][col] instanceof Figure && squares[i][col].player === this.player) {
        break;
      }
      if (squares[i][col] instanceof Figure && squares[i][col].player !== this.player) {
        possibleMoves.push([i, col]);
        break;
      }
    }

    for (let i = row - 1; i >= 0; i--) {
      if (squares[i][col] instanceof Figure && squares[i][col].player === this.player) {
        break;
      }
      if (squares[i][col] instanceof Figure && squares[i][col].player !== this.player) {
        possibleMoves.push([i, col]);
        break;
      }
    }

    // console.log('Queen: ', possibleMoves);
    return possibleMoves;
  }
}