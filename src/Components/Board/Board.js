import './Board.css';

import Square from '../Square/Square';

const Board = ({squares, onClick}) => {
  const renderSquare = (row, col, style) => {
    return (
      <Square
        key={`${row}${col}`}
        row={row}
        col={col}
        bgStyle={style}
        style={(squares[row][col]) ? squares[row][col].style : null}
        onClick={(row, col) => onClick(row, col)}
      />
    );
  }

  const renderRow = (row) => {
    const boardRow = [];

    for (let col = 0; col < squares.length; col++) {
      const style = (
        (row % 2 === 0 && col % 2 === 0) ||
        (row % 2 !== 0 && col % 2 !== 0)
      ) 
        ? 'white'
        : 'dark';

      boardRow.push(renderSquare(row, col, style)); 
    }

    return (
      <div className='board__row' key={row + 1}>
        {/* <div className='square'>{row + 1}</div> */}
        <div className='square'>{row}</div>
        {boardRow}
      </div>
    );
  };

  const renderRowNumbers = () => {
    // const charA = 'A';
    // const charCodeA = charA.charCodeAt(0);
    const numbersRow = [];

    for (let x = 0; x < squares.length; x++) {
      // numbersRow.push(<div className='square' key={x + 1}>{String.fromCharCode(x + charCodeA)}</div>);
      numbersRow.push(<div className='square' key={x + 1}>{x}</div>);
    }

    board.push(
      <div className='board__row' key={`${squares.length}_0`}>
        <div className='square'></div>
        {numbersRow}
      </div>
    );
  };

  const board = [];
  
  for (let row = 0; row < squares.length; row++) {
    board.push(renderRow(row));

    if (row === squares.length - 1) {
      renderRowNumbers();
    }
  }

  return (
    <div className='board'>
      {board}
    </div>
  );
};

export default Board;