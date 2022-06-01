import Figure from './Figure';

export default class Pawn extends Figure {
  constructor (player) {
    super(
      player,
      (player === 1)
        ? 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg'
    );
    this.startPositions = {
      '1': [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7]],
      '2': [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7]],
    }
  }

  getPossibleMoves(squares, squarePosition) {
    const {row, col} = squarePosition;
    const possibleMoves = [];

    if (this.player === 1) {
      if (this.startPositions[this.player].find(
        position => position[0] === row && position[1] === col
      )) {
        if ((squares[row + 1][col - 1] instanceof Figure) && squares[row + 1][col - 1].player !== this.player) {
          possibleMoves.push([row + 1, col -1]);
        }

        if ((squares[row + 1][col + 1] instanceof Figure) && squares[row + 1][col + 1].player !== this.player) {
          possibleMoves.push([row + 1, col + 1]);
        }

        if (!(squares[row + 1][col] instanceof Figure)) {
          possibleMoves.push([row + 1, col]);
        } else {
          return possibleMoves;
        }

        if (!(squares[row + 2][col] instanceof Figure)) {
          possibleMoves.push([row + 2, col]);
        } else {
          return possibleMoves;
        }
      } else {
        if ((squares[row + 1][col - 1] instanceof Figure) && squares[row + 1][col - 1].player !== this.player) {
          possibleMoves.push([row + 1, col -1]);
        }

        if ((squares[row + 1][col + 1] instanceof Figure) && squares[row + 1][col + 1].player !== this.player) {
          possibleMoves.push([row + 1, col + 1]);
        }

        if (!(squares[row + 1][col] instanceof Figure)) {
          possibleMoves.push([row + 1, col]);
        } else {
          return possibleMoves;
        }
      }
    } else {
      if (this.startPositions[this.player].find(
        position => position[0] === row && position[1] === col
      )) {
        if ((squares[row - 1][col - 1] instanceof Figure) && squares[row - 1][col - 1].player !== this.player) {
          possibleMoves.push([row - 1, col -1]);
        }

        if ((squares[row - 1][col + 1] instanceof Figure) && squares[row - 1][col + 1].player !== this.player) {
          possibleMoves.push([row - 1, col + 1]);
        }

        if (!(squares[row - 1][col] instanceof Figure)) {
          possibleMoves.push([row - 1, col]);
        } else {
          return possibleMoves;
        }

        if (!(squares[row - 2][col] instanceof Figure)) {
          possibleMoves.push([row - 2, col]);
        } else {
          return possibleMoves;
        }
      } else {
        if ((squares[row - 1][col - 1] instanceof Figure) && squares[row - 1][col - 1].player !== this.player) {
          possibleMoves.push([row - 1, col -1]);
        }

        if ((squares[row - 1][col + 1] instanceof Figure) && squares[row - 1][col + 1].player !== this.player) {
          possibleMoves.push([row - 1, col + 1]);
        }

        if (!(squares[row - 1][col] instanceof Figure)) {
          possibleMoves.push([row - 1, col]);
        } else {
          return possibleMoves;
        }
      }
    }

    // console.log(possibleMoves);

    return possibleMoves;
  }

  getAttackedFigures(squares, squarePosition) {
    const {row, col} = squarePosition;
    const possibleMoves = [];

    if (this.player === 1) {
      if (squares[row + 1][col - 1] instanceof Figure && squares[row + 1][col - 1].player !== this.player) {
        console.log(squares[row + 1][col - 1].player);
        possibleMoves.push([row + 1, col -1]);
      }

      if (squares[row + 1][col + 1] instanceof Figure && squares[row + 1][col + 1].player !== this.player) {
        possibleMoves.push([row + 1, col + 1]);
      }
    } else {
      if (squares[row - 1][col - 1] instanceof Figure && squares[row - 1][col - 1].player !== this.player) {
        possibleMoves.push([row - 1, col - 1]);
      }

      if (squares[row - 1][col + 1] instanceof Figure && squares[row - 1][col + 1].player !== this.player) {
        possibleMoves.push([row - 1, col + 1]);
      }
    }

    return possibleMoves;
  }
}