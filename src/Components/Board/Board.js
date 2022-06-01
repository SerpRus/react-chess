import React, {Component} from 'react';
import './Board.css';
import Square from '../Square/Square';

export default class Board extends Component {
  renderSquare(row, col, style) {
    return (
      <Square
        key={`${row}${col}`}
        row={row}
        col={col}
        bgStyle={style}
        style={(this.props.squares[row][col]) ? this.props.squares[row][col].style : null}
        onClick={(row, col) => this.props.onClick(row, col)}
      />
    );
  }

  render() {
    const board = [];
    const squares = this.props.squares;
    const charA = 'A';
    const charCodeA = charA.charCodeAt(0);

    for (let i = 0; i < squares.length; i++) {
      const boardRow = [];

      for (let j = 0; j < squares[i].length; j++) {
        const style = ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) ? 'white' : 'dark';
        boardRow.push(this.renderSquare(i, j, style));
      }

      board.push(
        <div className='board__row' key={i + 1}>
          {/* <div className='square'>{i + 1}</div> */}
          <div className='square'>{i}</div>
          {boardRow}
        </div>
      );

      if (i === squares.length - 1) {
        const numbersRow = [];

        for (let x = 0; x < squares.length; x++) {
          // numbersRow.push(<div className='square' key={x + 1}>{String.fromCharCode(x + charCodeA)}</div>);
          numbersRow.push(<div className='square' key={x + 1}>{x}</div>);
        }

        board.push(
          <div className='board__row' key={`${i}_0`}>
            <div className='square'></div>
            {numbersRow}
          </div>
        )
      }
    }

    return (
      <div className='board'>
        {board}
      </div>
    );
  }
}