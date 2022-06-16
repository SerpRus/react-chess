import Figure from './Figure';

export default class King extends Figure {
  constructor (player) {
    super(
      player,
      (player === 1)
        ? 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg'
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
