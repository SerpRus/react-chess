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

  checkOpponentFigureForAttack(squares, rowStep, colStep) {
    return (squares[rowStep][colStep] instanceof Figure) &&
      squares[rowStep][colStep].player !== this.player
  }

  isStartPosition(squarePosition) {
    return this.startPositions[this.player].find(
      position => position[0] === squarePosition.row && position[1] === squarePosition.col
    )
  }

  checkFegureAhead(squares, rowStep, colStep) {
    return !(squares[rowStep][colStep] instanceof Figure)
  }

  

  getPossibleMoves(squares, squarePosition) {
    const {row, col} = squarePosition;
    const step = {
      top: row - 1,
      topDouble: row - 2,
      right: col + 1,
      bottom: row + 1,
      bottomDouble: row + 2,
      left: col - 1,
    }
    const possibleMoves = [];

    if (this.player === 1) {
      if (this.checkOpponentFigureForAttack(squares, step.bottom, step.left)) {
        possibleMoves.push([step.bottom, step.left]);
      }

      if (this.checkOpponentFigureForAttack(squares, step.bottom, step.right)) {
        possibleMoves.push([step.bottom, step.right]);
      }

      if (this.checkFegureAhead(squares, step.bottom, col)) {
        possibleMoves.push([step.bottom, col]);
      } else {
        return possibleMoves;
      }

      if (this.isStartPosition(squarePosition)) {
        if (this.checkFegureAhead(squares, step.bottomDouble, col)) {
          possibleMoves.push([step.bottomDouble, col]);
        }
      }

      return possibleMoves;
    }

    // Если 2-й игрок
    if (this.checkOpponentFigureForAttack(squares, step.top, step.left)) {
      possibleMoves.push([step.top, step.left]);
    }

    if (this.checkOpponentFigureForAttack(squares, step.top, step.right)) {
      possibleMoves.push([step.top, step.right]);
    }

    if (this.checkFegureAhead(squares, step.top, col)) {
      possibleMoves.push([step.top, col]);
    } else {
      return possibleMoves;
    }

    if (this.isStartPosition(squarePosition)) {
      if (this.checkFegureAhead(squares, step.topDouble, col)) {
        possibleMoves.push([step.topDouble, col]);
      }
    }

    return possibleMoves;
  }

  getAttackedFigures(squares, squarePosition) {
    const {row, col} = squarePosition;
    const attackedFigures = [];
    const step = {
      top: row - 1,
      right: col + 1,
      bottom: row + 1,
      left: col - 1,
    }

    if (this.player === 1) {
      if (this.checkOpponentFigureForAttack(squares, step.bottom, step.left)) {
        attackedFigures.push([step.bottom, step.left]);
      }

      if (this.checkOpponentFigureForAttack(squares, step.bottom, step.right)) {
        attackedFigures.push([step.bottom, step.right]);
      }

      return attackedFigures;
    }

    // Если 2-й игрок
    if (this.checkOpponentFigureForAttack(squares, step.top, step.left)) {
      attackedFigures.push([step.top, step.left]);
    }

    if (this.checkOpponentFigureForAttack(squares, step.top, step.right)) {
      attackedFigures.push([step.top, step.right]);
    }

    return attackedFigures;
  }
}