import Figure from './Figure';

export default class Knight extends Figure {
  constructor (player) {
    super(
      player,
      (player === 1)
        ? 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg'
    );

    this.routes = {
      verticalTopRight: 'verticalTopRight',
      horizontalTopRight: 'horizontalTopRight',
      verticalBottomRight: 'verticalBottomRight',
      horizontalBottomRight: 'horizontalBottomRight',
      verticalTopLeft: 'verticalTopLeft',
      horizontalTopLeft: 'horizontalTopLeft',
      verticalBottomLeft: 'verticalBottomLeft',
      horizontalBottomLeft: 'horizontalBottomLeft',
    }
  }

  getStep(route) {
    let rowStep;
    let colStep;

    switch (route) {
      case this.routes.verticalTopRight:
        rowStep = -2;
        colStep = 1;
        break;
      case this.routes.horizontalTopRight:
        rowStep = -1;
        colStep = 2;
        break;
      case this.routes.verticalBottomRight:
        rowStep = 2;
        colStep = 1;
        break;
      case this.routes.horizontalBottomRight:
        rowStep = 1;
        colStep = 2;
        break;
      case this.routes.verticalTopLeft:
        rowStep = -2;
        colStep = -1;
        break;
      case this.routes.horizontalTopLeft:
        rowStep = -1;
        colStep = -2;
        break;
      case this.routes.verticalBottomLeft:
        rowStep = 2;
        colStep = -1;
        break;
      case this.routes.horizontalBottomLeft:
        rowStep = 1;
        colStep = -2;
        break;
      default:
        break;
    }

    return {
      rowStep: rowStep,
      colStep: colStep,
    };
  }

  checkStep(squares, row, col, route, possibleMoves) {
    const rowStep = this.getStep(route).rowStep;
    const colStep = this.getStep(route).colStep;

    if (squares[row + rowStep] !== undefined && squares[row + rowStep][col + colStep] !== undefined) {
      if (!squares[row + rowStep][col + colStep] || (squares[row + rowStep][col + colStep] && squares[row + rowStep][col + colStep].player !== this.player)) {
        possibleMoves.push([row + rowStep, col + colStep]);
      }
    }

    return possibleMoves;
  }

  getPossibleMoves(squares, squarePosition) {
    const {row, col} = squarePosition;
    let possibleMoves = [];

    for (let route in this.routes) {
      possibleMoves = this.checkStep(squares, row, col, route, possibleMoves);
    }

    return possibleMoves;
  }

  getAttackedFigures(squares, squarePosition) {
    return this.getPossibleMoves(squares, squarePosition);
  }
}
