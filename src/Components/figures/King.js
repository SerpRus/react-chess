import Figure from './Figure';

export default class King extends Figure {
  constructor (player) {
    super(
      player,
      (player === 1)
        ? 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg'
    );
  }

  getPossibleMoves(squares, squarePosition) {
    const {row, col} = squarePosition;
    const possibleMoves = [];

    if (squares[row - 1] !== undefined) {
      if (!squares[row - 1][col] || (squares[row - 1][col] && squares[row - 1][col].player !== this.player)) {
        possibleMoves.push([row - 1, col]);
      }
    }

    if (squares[row - 1] !== undefined && squares[row - 1][col + 1] !== undefined) {
      if (!squares[row - 1][col + 1] || (squares[row - 1][col + 1] && squares[row - 1][col + 1].player !== this.player)) {
        possibleMoves.push([row - 1, col + 1]);
      }
    }

    if (squares[row][col + 1] !== undefined) {
      if (!squares[row][col + 1] || (squares[row][col + 1] && squares[row][col + 1].player !== this.player)) {
        possibleMoves.push([row, col + 1]);
      }
    }

    if (squares[row + 1] !== undefined && squares[row + 1][col + 1] !== undefined) {
      if (!squares[row + 1][col + 1] || (squares[row + 1][col + 1] && squares[row + 1][col + 1].player !== this.player)) {
        possibleMoves.push([row + 1, col + 1]);
      }
    }

    if (squares[row + 1] !== undefined) {
      if (!squares[row + 1][col] || (squares[row + 1][col] && squares[row + 1][col].player !== this.player)) {
        possibleMoves.push([row + 1, col]);
      }
    }

    if (squares[row + 1] !== undefined && squares[row + 1][col - 1] !== undefined) {
      if (!squares[row + 1][col - 1] || (squares[row + 1][col - 1] && squares[row + 1][col - 1].player !== this.player)) {
        possibleMoves.push([row + 1, col - 1]);
      }
    }

    if (squares[row][col - 1] !== undefined) {
      if (!squares[row][col - 1] || (squares[row][col - 1] && squares[row][col - 1].player !== this.player)) {
        possibleMoves.push([row, col - 1]);
      }
    }

    if (squares[row - 1] !== undefined && squares[row - 1][col - 1] !== undefined) {
      if (!squares[row - 1][col - 1] || (squares[row - 1][col - 1] && squares[row - 1][col - 1].player !== this.player)) {
        possibleMoves.push([row - 1, col - 1]);
      }
    }



    return possibleMoves;
  }

  getAttackedFigures(squares, squarePosition) {
    const {row, col} = squarePosition;
    const possibleMoves = [];

    if (squares[row - 1] !== undefined) {
      if (squares[row - 1][col] instanceof Figure && squares[row - 1][col].player !== this.player) {
        possibleMoves.push([row - 1, col]);
      }
    }

    if (squares[row - 1] !== undefined && squares[row - 1][col + 1] !== undefined) {
      if (squares[row - 1][col + 1] instanceof Figure && squares[row - 1][col + 1].player !== this.player) {
        possibleMoves.push([row - 1, col + 1]);
      }
    }

    if (squares[row][col + 1] !== undefined) {
      if (squares[row][col + 1] instanceof Figure && squares[row][col + 1].player !== this.player) {
        possibleMoves.push([row, col + 1]);
      }
    }

    if (squares[row + 1] !== undefined && squares[row + 1][col + 1] !== undefined) {
      if (squares[row + 1][col + 1] instanceof Figure && squares[row + 1][col + 1].player !== this.player) {
        possibleMoves.push([row + 1, col + 1]);
      }
    }

    if (squares[row + 1] !== undefined) {
      if (squares[row + 1][col] instanceof Figure && squares[row + 1][col].player !== this.player) {
        possibleMoves.push([row + 1, col]);
      }
    }

    if (squares[row + 1] !== undefined && squares[row + 1][col - 1] !== undefined) {
      if (squares[row + 1][col - 1] instanceof Figure && squares[row + 1][col - 1].player !== this.player) {
        possibleMoves.push([row + 1, col - 1]);
      }
    }

    if (squares[row][col - 1] !== undefined) {
      if (squares[row][col - 1] instanceof Figure && squares[row][col - 1].player !== this.player) {
        possibleMoves.push([row, col - 1]);
      }
    }

    if (squares[row - 1] !== undefined && squares[row - 1][col - 1] !== undefined) {
      if (squares[row - 1][col - 1] instanceof Figure && squares[row - 1][col - 1].player !== this.player) {
        possibleMoves.push([row - 1, col - 1]);
      }
    }

    return possibleMoves;
  }
}
