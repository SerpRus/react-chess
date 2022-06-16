import Figure from './Figure';

export default class Queen extends Figure {
  constructor (player) {
    super(
      player,
      (player === 1)
        ? 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg'
    );

    this.routes = {
      top: 'top',
      topRight: 'topRight',
      right: 'right',
      bottomRight: 'bottomRight',
      bottom: 'bottom',
      bottomLeft: 'bottomLeft',
      left: 'left',
      topLeft: 'topLeft',
    }
  }

  getStep(route) {
    let rowStep;
    let colStep;

    switch (route) {
      case this.routes.top:
        rowStep = -1;
        colStep = 0;
        break;
      case this.routes.topRight:
        rowStep = -1;
        colStep = 1;
        break;
      case this.routes.right:
        rowStep = 0;
        colStep = 1;
        break;
      case this.routes.bottomRight:
        rowStep = 1;
        colStep = 1;
        break;
      case this.routes.bottom:
        rowStep = 1;
        colStep = 0;
        break;
      case this.routes.bottomLeft:
        rowStep = 1;
        colStep = -1;
        break;
      case this.routes.left:
        rowStep = 0;
        colStep = -1;
        break;
      case this.routes.topLeft:
        rowStep = -1;
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

  checkYourFigure(squares, row, col) {
    return (squares[row][col] instanceof Figure) && squares[row][col].player === this.player;
  }

  checkOpponentFigure(squares, row, col) {
    return (squares[row][col] instanceof Figure) && squares[row][col].player !== this.player;
  }

  checkLine(squares, row, col, route, possibleMoves) {
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

  checkAttackLine(squares, row, col, route, possibleMoves) {
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

  getPossibleMoves(squares, squarePosition) {
    const {row, col} = squarePosition;
    let possibleMoves = [];

    for (let route in this.routes) {
      possibleMoves = this.checkLine(
        squares, row, col, route, possibleMoves
      );
    }

    return possibleMoves;
  }

  getAttackedFigures(squares, squarePosition) {
    const {row, col} = squarePosition;
    let possibleMoves = [];

    for (let route in this.routes) {
      possibleMoves = this.checkAttackLine(
        squares, row, col, route, possibleMoves
      );
    }

    return possibleMoves;
  }
}