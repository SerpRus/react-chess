import React, {Component} from 'react';
import './Game.css';
import figureInitialization from './figureInitialization/figureInitialization';
import Board from './Components/Board/Board';
import Turn from './Components/Turn/Turn';
import Message from './Components/Message/Message';
import Figure from './Components/figures/Figure';
import King from './Components/figures/King';

export default class Game extends Component {
  constructor() {
    super();

    this.state =  {
      squares: figureInitialization(),
      currentPlayer: 1,
      turn: 'white',
      selectedSquare: null,
      selectedSquarePosition: null,
      message: '',
      possibleMoves: [],
      winner: null,
    }
  }

  paintGreen(squares, row, col) {
    if (squares[row][col]) {
      squares[row][col].style = {
        ...squares[row][col].style,
        backgroundColor: 'green',
      }
    } else {
      squares[row][col] = {
        style: {
          backgroundColor: 'green',
        }
      }
    }
  }

  clearColor(squares, row, col) {
    if (squares[row][col]) {
      if (squares[row][col].player) {
        squares[row][col].style = {
          ...squares[row][col].style,
          backgroundColor: '',
        }
      } else {
        squares[row][col] = null;
      }
    }
  }

  selectionPossibleMoves(possibleMoves, squares) {
    for (let i = 0; i < possibleMoves.length; i++) {
      const row = possibleMoves[i][0];
      const col = possibleMoves[i][1];
      this.paintGreen(squares, row, col);
    }
  }

  clearPossibleMoves(possibleMoves, squares) {
    for (let i = 0; i < possibleMoves.length; i++) {
      const row = possibleMoves[i][0];
      const col = possibleMoves[i][1];

      this.clearColor(squares, row, col);
    }
  }

  isKing(square, currentPlayer) {
    return square instanceof King && square.player === currentPlayer;
  }

  isOpponentFigure(square, currentPlayer) {
    return square instanceof Figure && square.player !== currentPlayer;
  }

  getKingPosition(squares, currentPlayer) {
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares[i].length; j++) {
        if (this.isKing(squares[i][j], currentPlayer)) {
          return [i, j];
        }
      }
    }
  }

  getAttacksPositions(squares, currentPlayer) {
    let attackedFigures = [];
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares[i].length; j++) {
        if (this.isOpponentFigure(squares[i][j], currentPlayer)) {
          const attackedFiguresArr = squares[i][j].getAttackedFigures(squares, {row: i, col: j});  
          attackedFigures.push(...attackedFiguresArr);
        }
      }
    }

    return attackedFigures;
  }

  isKingUnderAttack(attackedFigures, kingPosition) {
   return attackedFigures.find(attackedFigure => {
      return attackedFigure[0] === kingPosition[0] && attackedFigure[1] === kingPosition[1]
    });
  }

  getOpponentsFigures(squares, opponentPlayer) {
    const opponentsFigures = [];
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares[i].length; j++) {
        if (squares[i][j] instanceof Figure && squares[i][j].player === opponentPlayer) {
          opponentsFigures.push([i, j]);
        }
      }
    }
    return opponentsFigures;
  }

  isCheckmate(squares, currentPlayer) {
    const opponentPlayer = (currentPlayer === 1) ? 2 : 1;

    const opponentFigures = this.getOpponentsFigures(squares, opponentPlayer);
    for (let i = 0; i < opponentFigures.length; i++) {
      const squarePosition = {
        row: opponentFigures[i][0],
        col: opponentFigures[i][1],
      };
      const opponentFigure = squares[squarePosition.row][squarePosition.col];
      const possibleMoves = opponentFigure.getPossibleMoves(squares, squarePosition);

      for (let j = 0; j < possibleMoves.length; j++) {
        const row = possibleMoves[j][0];
        const col = possibleMoves[j][1];
        const possiblePosition = {
          row: row,
          col: col,
        }

        // if (i === 0 && j === 0) {
          const oldFigure = opponentFigure;
          const target = squares[possiblePosition.row][possiblePosition.col];
          
          squares[possiblePosition.row][possiblePosition.col] = opponentFigure;
          squares[squarePosition.row][squarePosition.col] = null;
          const kingOpponentPosition = this.getKingPosition(squares, opponentPlayer);

          const attacksPositions = this.getAttacksPositions(squares, opponentPlayer);
          const isKingUnderAttack = this.isKingUnderAttack(attacksPositions, kingOpponentPosition);

          squares[possiblePosition.row][possiblePosition.col] = target;
          squares[squarePosition.row][squarePosition.col] = oldFigure;
          if (!isKingUnderAttack) { 
            return false;
          } 
      }
    }

    return true;
  }

  handleClick(row, col) {
    if (this.state.winner) {
      return;
    }

    const squares = [...this.state.squares];
    const {currentPlayer, selectedSquarePosition, selectedSquare} = this.state;
    const squarePosition = {
      row: row,
      col: col,
    }
    let possibleMoves = [...this.state.possibleMoves];
    let currentSquare = squares[row][col];
    let oldFigure;

    // Если фигура не выбрана
    if (!selectedSquare) {
      // Если выбрано пустое место, или фигура принадлежит оппоненту
      if (!currentSquare || currentSquare.player !== currentPlayer) {
        this.setState({
          message: `Wrong selection. Choose player ${this.state.player} pieces.`,
        });

        return;
      }

      // Если выбрана верная фигура
      possibleMoves = currentSquare.getPossibleMoves(squares, squarePosition);
      this.selectionPossibleMoves(possibleMoves, squares);

      this.setState({
        selectedSquare: currentSquare,
        selectedSquarePosition: [row, col],
        message: 'Choose destination for the selected piece',
        possibleMoves: possibleMoves,
      });

      currentSquare.style = {
        ...currentSquare.style,
        backgroundColor: 'rgb(111, 143, 114)',
      }

      return;
    }

    // Если выбрана фигура, и новая позиция является фигурой того же игрока
    if (currentSquare && currentSquare.player === currentPlayer) {
      selectedSquare.style = {
        ...selectedSquare.style,
        backgroundColor: '',
      }

      this.clearPossibleMoves(this.state.possibleMoves, squares);

      this.setState({
        selectedSquare: null,
        message: 'Вы выбрали некорректную позицию. Выберите свою фигуру.',
        possibleMoves: [],
      });

      return;
    }

    // Если фигура выбрана и новая позиция пустое место или фигура оппонента
    if (possibleMoves.find(
      position => (
        squarePosition.row === position[0] &&
        squarePosition.col === position[1])
    )) {

      oldFigure = squares[squarePosition.row][squarePosition.col];

      squares[squarePosition.row][squarePosition.col]
        = squares[selectedSquarePosition[0]][selectedSquarePosition[1]];
      squares[selectedSquarePosition[0]][selectedSquarePosition[1]] = null;

      const attacksPositions = this.getAttacksPositions(squares, currentPlayer);
      const kingPosition = this.getKingPosition(squares, currentPlayer);
      const isKingUnderAttack = this.isKingUnderAttack(attacksPositions, kingPosition);

      // 
      const attacksOpponentPositions = this.getAttacksPositions(squares, (currentPlayer) === 1 ? 2 : 1);
      const kingOpponentPosition = this.getKingPosition(squares, (currentPlayer) === 1 ? 2 : 1);
      const isKingOpponentUnderAttack = this.isKingUnderAttack(attacksOpponentPositions, kingOpponentPosition);
      this.clearPossibleMoves(this.state.possibleMoves, squares);
      if (isKingOpponentUnderAttack) {
        const checkMate = this.isCheckmate(squares, currentPlayer);

        if (checkMate) {
          this.setState({
            message: `МАТ! Победил ${currentPlayer} игрок!`,
            winner: currentPlayer,
          });
          return;
        }
      }

      if (!isKingUnderAttack) {
        this.setState({
          squares: squares,
        });

        selectedSquare.style = {
          ...selectedSquare.style,
          backgroundColor: '',
        }

        this.setState({
          selectedSquare: null,
          selectedSquarePosition: null,
          message: (isKingOpponentUnderAttack) ? 'ШАХ!' : '',
          possibleMoves: [],
          currentPlayer: (this.state.currentPlayer === 1) ? 2 : 1,
          turn: (this.state.turn === 1) ? 'dark' : 'white',
        });

        return;
      }

      squares[selectedSquarePosition[0]][selectedSquarePosition[1]]
      = squares[squarePosition.row][squarePosition.col];
      
      if (this.isOpponentFigure(oldFigure, currentPlayer)) {
        squares[squarePosition.row][squarePosition.col] = oldFigure;
        oldFigure.style = {
          ...oldFigure.style,
          backgroundColor: '',
        }
      } else {
        squares[squarePosition.row][squarePosition.col] = null;
      }

      this.setState({
        squares: squares,
      });

      this.setState({
        selectedSquare: null,
        selectedSquarePosition: null,
        message: 'ШАХ!',
        possibleMoves: [],
      });
    }
  }

  render() {
    const squares = [...this.state.squares];
    const {message, currentPlayer} = this.state;

    return (
      <div className="game">
        <Board
          squares={squares}
          onClick={(row, col) => this.handleClick(row, col)}
        />

        <Message
          message={message}
        />

        <Turn
          currentTurn={(currentPlayer === 1) ? 'white' : 'dark'}
        />
      </div>
    );
  }
}
