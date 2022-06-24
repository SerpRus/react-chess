import './Square.css';

const Square = ({bgStyle, style, onClick, row, col}) => {
  return (
    <button
      className={`square square--${bgStyle}`}
      type='button'
      style={style}
      onClick={() => onClick(row, col)}
    >
    </button>
  );
};

export default Square;