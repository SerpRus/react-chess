import React, {Component} from 'react';

import './Game.css';

import figureInitialization from './figureInitialization/figureInitialization';

import Board from './Components/Board/Board';
import Turn from './Components/Turn/Turn';
import Message from './Components/Message/Message';
import TransformShapes from './Components/TransformShapes/TransformShapes';
import LostFigures from './Components/LostFigures/LostFigures';

import Figure from './Components/figures/Figure';
import King from './Components/figures/King';
import Queen from './Components/figures/Queen';
import Knight from './Components/figures/Knight';
import Bishop from './Components/figures/Bishop';
import Rook from './Components/figures/Rook';
import Pawn from './Components/figures/Pawn';

export default class Game extends Component {
  constructor() {
    super();

    this.state =  {
      squares: figureInitialization(),
      currentPlayer: 1,
      turn: 'white',
      selectedSquare: null,
      selectedSquarePosition: null,
      newPos: {
        row: null,
        col: null,
      },
      message: '',
      possibleMoves: [],
      winner: null,
      isTransformShape: false,
      lostFigures1: [],
      lostFigures2: [],
    }

    this.startPositionsKingsAndRooks = {
      king1: [0, 3],
      rook1Left: [0, 0],
      rook1Right: [0, 7],
      king2: [7, 3],
      rook2Left: [7, 0],
      rook2Right: [7, 7],
    }

    this.isMovededFigures = {
      king1: false,
      rook1Left: false,
      rook1Right: false,
      king2: false,
      rook2Left: false,
      rook2Right: false,
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
      return attackedFigure[0] === kingPosition[0] && attackedFigure[1] === kingPosition[1];
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
  
  transformShapeClick(squares, newFigure, pawnPos, player) {
    switch (newFigure) {
      case 'Knight':
        squares[pawnPos.row][pawnPos.col] = new Knight(player);
        break;
      case 'Bishop':
        squares[pawnPos.row][pawnPos.col] = new Bishop(player);
        break;
      case 'Rook':
        squares[pawnPos.row][pawnPos.col] = new Rook(player);
        break;
      case 'Queen':
        squares[pawnPos.row][pawnPos.col] = new Queen(player);
        break;
      default:
        break;
    }

    this.setState({
      squares: squares,
      isTransformShape: false,
      selectedSquare: null,
      selectedSquarePosition: null,
      possibleMoves: [],
      currentPlayer: (this.state.currentPlayer === 1) ? 2 : 1,
      turn: (this.state.turn === 1) ? 'dark' : 'white',
    });
  }

  handleClick(row, col) {
    const {winner, isTransformShape} = this.state;

    // Если есть победитель, или нужно выбрать новую фигуру ничего не делаем.
    if (winner || isTransformShape) {
      return;
    }

    const {currentPlayer, selectedSquarePosition, selectedSquare, squares} = this.state;
    const squarePosition = {
      row: row,
      col: col,
    }
    let possibleMoves = [...this.state.possibleMoves];
    let currentSquare = squares[row][col];
    let oldSquare;

    // Если фигура не выбрана
    if (!selectedSquare) {
      // Если выбрано пустое место, или фигура принадлежит оппоненту
      if (!currentSquare || currentSquare.player !== currentPlayer) {
        this.setState({
          message: `Неправильный выбор. Выберите фигуру ${currentPlayer} игрока.`,
        });

        return;
      }

      // Если выбрана верная фигура
      possibleMoves = currentSquare.getPossibleMoves(squares, squarePosition);

      // Если выбран король
      if (currentSquare instanceof King) {
        // Если король и ладьи не перемещались
        if (
          (!this.isMovededFigures[`king${currentPlayer}`] &&
          !this.isMovededFigures[`rook${currentPlayer}Left`]) ||
          (!this.isMovededFigures[`king${currentPlayer}`] &&
          !this.isMovededFigures[`rook${currentPlayer}Right`])
        ) {
          // Если текущая позиция короля не стартовая, то король перемещался и следовательно ракировка невозможна
          if (
            row !== this.startPositionsKingsAndRooks[`king${currentPlayer}`][0] ||
            col !== this.startPositionsKingsAndRooks[`king${currentPlayer}`][1]
          ) {
            this.isMovededFigures[`king${currentPlayer}`] = true;
          } else {
            // Если ладья слева не перемещалась
            if (!this.isMovededFigures[`rook${currentPlayer}Left`]) {
              // Если 2 клетки слева от короля не заняты другими фигурма
              if (
                !(squares[row][col - 1] instanceof Figure) &&
                !(squares[row][col - 2] instanceof Figure)
              ) {
                const opponentFigures = this.getOpponentsFigures(squares, (currentPlayer === 1) ? 2 : 1);
                let isBrokenField = false;

                for (let i = 0; i < opponentFigures.length; i++) {
                  const squarePosition = {
                    row: opponentFigures[i][0],
                    col: opponentFigures[i][1],
                  };
                  const opponentFigure = squares[squarePosition.row][squarePosition.col];
                  const possibleMoves = opponentFigure.getPossibleMoves(squares, squarePosition);

                  for (let i = 0; i < possibleMoves.length; i++) {
                    // Если одна из двух клеток слева от короля под атакой, то король при рокеровке будет проходить через битое поле
                    if (
                      (row === possibleMoves[i][0] && col - 1 === possibleMoves[i][1]) ||
                      (row === possibleMoves[i][0] && col - 2 === possibleMoves[i][1])
                    ) {
                      isBrokenField = true;
                      break;
                    }
                  }
                }

                // Если есть нет битового поля, добавляем ход для ракировки
                if (!isBrokenField) {
                  possibleMoves.push([row, col - 2]);
                }
              }
            }
  
            // Если 2 клетки справа от короля не заняты другими фигурма
            if (!this.isMovededFigures[`rook${currentPlayer}Right`]) {
              if (
                !(squares[row][col + 1] instanceof Figure) &&
                !(squares[row][col + 2] instanceof Figure) &&
                !(squares[row][col + 3] instanceof Figure)
              ) {
                const opponentFigures = this.getOpponentsFigures(squares, (currentPlayer === 1) ? 2 : 1);
                let isBrokenField = false;

                for (let i = 0; i < opponentFigures.length; i++) {
                  const squarePosition = {
                    row: opponentFigures[i][0],
                    col: opponentFigures[i][1],
                  };
                  const opponentFigure = squares[squarePosition.row][squarePosition.col];
                  const possibleMoves = opponentFigure.getPossibleMoves(squares, squarePosition);

                  for (let i = 0; i < possibleMoves.length; i++) {
                    // Если одна из двух клеток слева от короля под атакой, то король при рокеровке будет проходить через битое поле
                    if (
                      (row === possibleMoves[i][0] && col + 1 === possibleMoves[i][1]) ||
                      (row === possibleMoves[i][0] && col + 2 === possibleMoves[i][1])
                    ) {
                      isBrokenField = true;
                      break;
                    }
                  }
                }
                // Если есть нет битового поля, добавляем ход для ракировки
                if (!isBrokenField) {
                  possibleMoves.push([row, col + 2]);
                }
              }
            }
          }
        }   
      }

      if (currentSquare instanceof Pawn) {
        if (currentPlayer === 1 && row === 4) {
          if (
            squares[squarePosition.row][squarePosition.col - 1] instanceof Pawn &&
            squares[squarePosition.row][squarePosition.col - 1].player !== currentPlayer
          ) {
            possibleMoves.push([row + 1, col - 1]);
          }

          if (
            squares[squarePosition.row][squarePosition.col + 1] instanceof Pawn &&
            squares[squarePosition.row][squarePosition.col + 1].player !== currentPlayer
          ) {
            possibleMoves.push([row + 1, col + 1]);
          }
        } else {
          if (
            squares[squarePosition.row][squarePosition.col - 1] instanceof Pawn &&
            squares[squarePosition.row][squarePosition.col - 1].player !== currentPlayer
          ) {
            possibleMoves.push([row - 1, col - 1]);
          }

          if (
            squares[squarePosition.row][squarePosition.col + 1] instanceof Pawn &&
            squares[squarePosition.row][squarePosition.col + 1].player !== currentPlayer
          ) {
            possibleMoves.push([row - 1, col + 1]);
          }
        }
      }

      this.selectionPossibleMoves(possibleMoves, squares);

      this.setState({
        selectedSquare: currentSquare,
        selectedSquarePosition: [row, col],
        message: 'Выберите место назначения для выбранной фигуры',
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
      const selectedFigure = squares[selectedSquarePosition[0]][selectedSquarePosition[1]]

      if (
        (!this.isMovededFigures[`king${currentPlayer}`] &&
        !this.isMovededFigures[`rook${currentPlayer}Left`]) ||
        (!this.isMovededFigures[`king${currentPlayer}`] &&
        !this.isMovededFigures[`rook${currentPlayer}Right`])
      ) {
        const kingPos = {
          row: this.startPositionsKingsAndRooks[`king${currentPlayer}`][0],
          col: this.startPositionsKingsAndRooks[`king${currentPlayer}`][1],
        };
        const rookLeftPos = {
          row: this.startPositionsKingsAndRooks[`rook${currentPlayer}Left`][0],
          col: this.startPositionsKingsAndRooks[`rook${currentPlayer}Left`][1],
        };
        const rookRightPos = {
          row: this.startPositionsKingsAndRooks[`rook${currentPlayer}Right`][0],
          col: this.startPositionsKingsAndRooks[`rook${currentPlayer}Right`][1],
        };

        if (selectedFigure instanceof Rook) {
          if (selectedSquarePosition[0] === rookLeftPos.row && selectedSquarePosition[1] === rookLeftPos.col) {
            this.isMovededFigures[`rook${currentPlayer}Left`] = true;
          } else {
            this.isMovededFigures[`rook${currentPlayer}Right`] = true;
          }
        }

        if (selectedFigure instanceof King) {
          if (selectedSquarePosition[0] === kingPos.row && selectedSquarePosition[1] === kingPos.col) {
            if (row === rookLeftPos.row && col === rookLeftPos.col + 1) {
              squares[row][1] = selectedFigure;
              squares[row][2] = squares[row][0];
              squares[selectedSquarePosition[0]][selectedSquarePosition[1]] = null;
              squares[row][0] = null;

              this.clearPossibleMoves(this.state.possibleMoves, squares);

              this.setState({
                squares: squares,
                selectedSquare: null,
                selectedSquarePosition: null,
                possibleMoves: [],
                currentPlayer: (this.state.currentPlayer === 1) ? 2 : 1,
                turn: (this.state.turn === 1) ? 'dark' : 'white',
              });
  
              return;
            }


            if (row === rookRightPos.row && col === rookRightPos.col - 2) {
              squares[row][5] = selectedFigure;
              squares[row][4] = squares[row][7];
              squares[selectedSquarePosition[0]][selectedSquarePosition[1]] = null;
              squares[row][7] = null;

              this.clearPossibleMoves(this.state.possibleMoves, squares);

              this.setState({
                squares: squares,
                selectedSquare: null,
                selectedSquarePosition: null,
                possibleMoves: [],
                currentPlayer: (this.state.currentPlayer === 1) ? 2 : 1,
                turn: (this.state.turn === 1) ? 'dark' : 'white',
              });
  
              return;
            }
          }
        }
      }

      if (selectedFigure instanceof Pawn) {
        if (currentPlayer === 1) {
          if (row === selectedSquarePosition[0] + 1 && col === selectedSquarePosition[1] - 1) {
            squares[row - 1][col] = null;
          }

          if (row === selectedSquarePosition[0] + 1 && col === selectedSquarePosition[1] + 1) {
            squares[row - 1][col] = null;
          }

          if (row === 7) {
            this.setState({
              isTransformShape: true,
              newPos: {
                row: row,
                col: col,
              },
              message: '',
            });

            squares[row][col] = selectedFigure;
            squares[selectedSquarePosition[0]][selectedSquarePosition[1]] = null;

            this.clearPossibleMoves(this.state.possibleMoves, squares);
            return;
          }
        }

        if (currentPlayer === 2) {
          if (row === selectedSquarePosition[0] - 1 && col === selectedSquarePosition[1] - 1) {
            squares[row + 1][col] = null;
          }

          if (row === selectedSquarePosition[0] - 1 && col === selectedSquarePosition[1] + 1) {
            squares[row + 1][col] = null;
          }

          if (row === 0) {
            this.setState({
              isTransformShape: true,
              newPos: {
                row: row,
                col: col,
              }
            });

            squares[row][col] = selectedFigure;
            squares[selectedSquarePosition[0]][selectedSquarePosition[1]] = null;

            this.clearPossibleMoves(this.state.possibleMoves, squares);
            return;
          }
        }
      }

      oldSquare = squares[row][col];

      if (oldSquare instanceof Figure) {
        console.log(true);
        const lostFigures = this.state[`lostFigures${this.state.currentPlayer}`];
        lostFigures.push(oldSquare);
        this.setState({
          lostFigures: lostFigures,
        });
      }
      
      squares[row][col] = selectedFigure;
      squares[selectedSquarePosition[0]][selectedSquarePosition[1]] = null;

      const attacksPositions = this.getAttacksPositions(squares, currentPlayer);
      const kingPosition = this.getKingPosition(squares, currentPlayer);
      const isKingUnderAttack = this.isKingUnderAttack(attacksPositions, kingPosition);

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
      = squares[row][col];
      
      if (this.isOpponentFigure(oldSquare, currentPlayer)) {
        squares[row][col] = oldSquare;
        oldSquare.style = {
          ...oldSquare.style,
          backgroundColor: '',
        }
      } else {
        squares[row][col] = null;
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
    // const squares = [...this.state.squares];
    const {message, currentPlayer, squares, lostFigures1, lostFigures2, isTransformShape, newPos} = this.state;

    return (
      <div className='game'>
        <div className='game__board'>
          <Board
            squares={squares}
            onClick={(row, col) => this.handleClick(row, col)}
          />

          <div className='game__lost-figures'>
            <LostFigures
              lostFigures={lostFigures1}
            />
            <LostFigures
              lostFigures={lostFigures2}
            />
          </div> 
        </div>
        
        <TransformShapes
          player={currentPlayer}
          isShow={isTransformShape}
          onClick={(newFigure) => {
            this.transformShapeClick(squares, newFigure, newPos, currentPlayer)
          }}
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
