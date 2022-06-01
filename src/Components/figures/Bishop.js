import Figure from './Figure';

export default class Bishop extends Figure {
  constructor (player) {
    super(
      player,
      (player === 1)
        ? 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg'
    );
  }
  
  getPossibleMoves(squares, squarePosition) {
    const {row, col} = squarePosition;
    const possibleMoves = [];

    for (let i = row + 1, j = col + 1; i < squares.length; i++, j++) {
      if (j >= squares.length) {
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
      if (j >= squares.length) {
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

    for (let i = row + 1, j = col - 1; i < squares.length; i++, j--) {
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

    return possibleMoves;
  }

  getAttackedFigures(squares, squarePosition) {
    const {row, col} = squarePosition;
    const possibleMoves = [];

    for (let i = row - 1, j = col + 1; i >= 0; i--, j++) {
      if (j === squares.length) {
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

    for (let i = row + 1, j = col + 1; i < squares.length; i++, j++) {
      if (j === squares.length) {
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

    for (let i = row + 1, j = col - 1; i < squares.length; i++, j--) {
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

    return possibleMoves;
  }
}
