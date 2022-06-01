import Figure from './Figure';

export default class Rook extends Figure {
  constructor (player) {
    super(
      player,
      (player === 1) 
        ? 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg'
    );
  }

  getPossibleMoves(squares, squarePosition) {
    const {row, col} = squarePosition;
    const possibleMoves = [];

    for (let i = col + 1; i < 8; i++) {
      if (!squares[row][i]) {
        possibleMoves.push([row, i]);
      } else if (squares[row][i].player !== squares[row][col].player) {
        possibleMoves.push([row, i]);

        break;
      } else {
        break;
      }
    }

    for (let i = col - 1; i >= 0; i--) {
      if (!squares[row][i]) {
        possibleMoves.push([row, i]);
      } else if (squares[row][i].player !== squares[row][col].player) {
        possibleMoves.push([row, i]);

        break;
      } else {
        break;
      }
    }

    for (let i = row + 1; i < 8; i++) {
      if (!squares[i][col]) {
        possibleMoves.push([i, col]);
      } else if (squares[i][col].player !== squares[row][col].player) {
        possibleMoves.push([i, col]);

        break;
      } else {
        break;
      }
    }

    for (let i = row - 1; i >= 0; i--) {
      if (!squares[i][col]) {
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

    for (let i = row - 1; i >= 0; i--) {
      if (squares[i][col] instanceof Figure && squares[i][col].player === this.player) {
        break;
      }

      if (squares[i][col] instanceof Figure && squares[i][col].player !== this.player) {
        possibleMoves.push([i, col]);
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

    for (let i = col - 1; i >= 0; i--) {
      if (squares[row][i] instanceof Figure && squares[row][i].player === this.player) {
        break;
      }

      if (squares[row][i] instanceof Figure && squares[row][i].player !== this.player) {
        possibleMoves.push([row, i]);
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

    return possibleMoves;
  }
}