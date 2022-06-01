import Figure from './Figure';

export default class Knight extends Figure {
  constructor (player) {
    super(
      player,
      (player === 1)
        ? 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg'
    );
  }

  getPossibleMoves(squares, squarePosition) {
    const {row, col} = squarePosition;
    const possibleMoves = [];

    if (squares[row - 2] !== undefined && squares[row - 2][col + 1] !== undefined) {
      if (!squares[row - 2][col + 1] || (squares[row - 2][col + 1] && squares[row - 2][col + 1].player !== this.player)) {
        possibleMoves.push([row - 2, col + 1]);
      }
    }

    if (squares[row - 1] !== undefined && squares[row - 1][col + 2] !== undefined) {
      if (!squares[row - 1][col + 2] || (squares[row - 1][col + 2] && squares[row - 1][col + 2].player !== this.player)) {
        possibleMoves.push([row - 1, col + 2]);
      }
    }

    if (squares[row + 1] !== undefined && squares[row + 1][col + 2] !== undefined) {
      if (!squares[row + 1][col + 2] || (squares[row + 1][col + 2] && squares[row + 1][col + 2].player !== this.player)) {
        possibleMoves.push([row + 1, col + 2]);
      }
    }

    if (squares[row + 2] !== undefined && squares[row + 2][col + 1] !== undefined) {
      if (!squares[row + 2][col + 1] || (squares[row + 2][col + 1] && squares[row + 2][col + 1].player !== this.player)) {
        possibleMoves.push([row + 2, col + 1]);
      }
    }



    // 
    if (squares[row - 2] !== undefined && squares[row - 2][col - 1] !== undefined) {
      if (!squares[row - 2][col - 1] || (squares[row - 2][col - 1] && squares[row - 2][col - 1].player !== this.player)) {
        possibleMoves.push([row - 2, col - 1]);
      }
    }

    if (squares[row - 1] !== undefined && squares[row - 1][col - 2] !== undefined) {
      if (!squares[row - 1][col - 2] || (squares[row - 1][col - 2] && squares[row - 1][col - 2].player !== this.player)) {
        possibleMoves.push([row - 1, col - 2]);
      }
    }

    if (squares[row + 1] !== undefined && squares[row + 1][col - 2] !== undefined) {
      if (!squares[row + 1][col - 2] || (squares[row + 1][col - 2] && squares[row + 1][col - 2].player !== this.player)) {
        possibleMoves.push([row + 1, col - 2]);
      }
    }

    if (squares[row + 2] !== undefined && squares[row + 2][col - 1] !== undefined) {
      if (!squares[row + 2][col - 1] || (squares[row + 2][col - 1] && squares[row + 2][col - 1].player !== this.player)) {
        possibleMoves.push([row + 2, col - 1]);
      }
    }

    return possibleMoves;
  }

  getAttackedFigures(squares, squarePosition) {
    const {row, col} = squarePosition;
    const possibleMoves = [];

    if (squares[row - 2] !== undefined && squares[row - 2][col + 1] !== undefined) {
      if (squares[row - 2][col + 1] instanceof Figure && squares[row - 2][col + 1].player !== this.player) {
        possibleMoves.push([row - 2, col + 1]);
      }
    }
    

    if (squares[row - 1] !== undefined && squares[row - 1][col + 2] !== undefined) {
      if (squares[row - 1][col + 2] instanceof Figure && squares[row - 1][col + 2].player !== this.player) {
        possibleMoves.push([row - 1, col + 2]);
      }
    }
    

    if (squares[row + 1] !== undefined && squares[row + 1][col + 2] !== undefined) {
      if (squares[row + 1][col + 2] instanceof Figure && squares[row + 1][col + 2].player !== this.player) {
        possibleMoves.push([row + 1, col + 2]);
      }
    }

    if (squares[row + 2] !== undefined && squares[row + 2][col + 1] !== undefined) {
      if (squares[row + 2][col + 1] instanceof Figure && squares[row + 2][col + 1].player !== this.player) {
        possibleMoves.push([row + 2, col + 1]);
      }
    }

    if (squares[row + 2] !== undefined && squares[row + 2][col - 1] !== undefined) {
      if (squares[row + 2][col - 1] instanceof Figure && squares[row + 2][col - 1].player !== this.player) {
        possibleMoves.push([row + 2, col - 1]);
      }
    }

    if (squares[row + 1] !== undefined && squares[row + 1][col - 2] !== undefined) {
      if (squares[row + 1][col - 2] instanceof Figure && squares[row + 1][col - 2].player !== this.player) {
        possibleMoves.push([row + 1, col - 2]);
      }
    }

    if (squares[row - 1] !== undefined && squares[row - 1][col - 2] !== undefined) {
      if (squares[row - 1][col - 2] instanceof Figure && squares[row - 1][col - 2].player !== this.player) {
        possibleMoves.push([row - 1, col - 2]);
      }
    }

    if (squares[row - 2] !== undefined && squares[row - 1][col - 1] !== undefined) {
      if (squares[row - 2][col - 1] instanceof Figure && squares[row - 2][col - 1].player !== this.player) {
        possibleMoves.push([row - 2, col - 1]);
      }
    }

    // console.log('Knight: ', possibleMoves);
    return possibleMoves;
  }
}
