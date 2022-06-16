import Figure from './Figure';

export default class Bishop extends Figure {
  constructor (player) {
    super(
      player,
      (player === 1)
        ? 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg'
    );
    this.routes = {
      topRight: 'topRight',
      topLeft: 'topLeft',
      bottomRight: 'bottomRight',
      bottomLeft: 'bottomLeft',
    }
  }

  getStep(route) {
    let rowStep;
    let colStep;

    switch (route) {
      case this.routes.topRight:
        rowStep = -1;
        colStep = 1;
        break;
      case this.routes.topLeft:
        rowStep = -1;
        colStep = -1;
        break;
      case this.routes.bottomRight:
        rowStep = 1;
        colStep = 1;
        break;
      case this.routes.bottomLeft:
        rowStep = 1;
        colStep = -1;
        break;
      default:
        break;
    }

    return {
      rowStep: rowStep,
      colStep: colStep,
    };
  }

  diagonalCheck(squares, row, col, route, possibleMoves) {

    const rowStep = this.getStep(route).rowStep;
    const colStep = this.getStep(route).colStep;

    for (let i = row + rowStep, j = col + colStep; i < squares.length; i += rowStep, j += colStep) {
      if (colStep > 0) {
        if (j >= squares.length) {
          break;
        }
      } 

      if (rowStep > 0) {
        if (i >= squares.length) {
          break;
        }
      }

      if (colStep < 0) {
        if (j < 0) {
          break;
        }
      } 
      if (rowStep < 0) {
        if (i < 0) {
          break;
        }
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

  diagonalAttackCheck(squares, row, col, route, possibleMoves) {
    const rowStep = this.getStep(route).rowStep;
    const colStep = this.getStep(route).colStep;

    for (let i = row + rowStep, j = col + colStep; i < squares.length; i += rowStep, j += colStep) {
      if (colStep > 0) {
        if (j >= squares.length) {
          break;
        }
      } 

      if (rowStep > 0) {
        if (i >= squares.length) {
          break;
        }
      }

      if (colStep < 0) {
        if (j < 0) {
          break;
        }
      } 

      if (rowStep < 0) {
        if (i < 0) {
          break;
        }
      }

      if (this.checkYourFigure(squares, i, j)) {
        break;
      }

      if (this.checkOpponentFigure(squares, i, j)) {
        possibleMoves.push([i, j]);
        break;
      }
    }

    return possibleMoves;
  }

  checkYourFigure(squares, row, col) {
    return (squares[row][col] instanceof Figure) && squares[row][col].player === this.player;
  }

  checkOpponentFigure(squares, row, col) {
    return (squares[row][col] instanceof Figure) && squares[row][col].player !== this.player;
  }
  
  
  getPossibleMoves(squares, squarePosition) {
    const {row, col} = squarePosition;
    let possibleMoves = [];

    for (let route in this.routes) {
      possibleMoves = this.diagonalCheck(
        squares, row, col, route, possibleMoves
      );
    }

    return possibleMoves;
  }

  getAttackedFigures(squares, squarePosition) {
    const {row, col} = squarePosition;
    let possibleMoves = [];

    for (let route in this.routes) {
      possibleMoves = this.diagonalAttackCheck(
        squares, row, col, route, possibleMoves
      );
    }

    return possibleMoves;
  }
}
