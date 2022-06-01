import './Turn.css';

function Turn(props) {
  return (
    <div className="turn">
      Turn
      <div className={`turn__square turn__square--${props.currentTurn}`}></div>
    </div>
  );
}

export default Turn;