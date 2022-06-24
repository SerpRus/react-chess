import './Turn.css';

function Turn({currentTurn}) {
  return (
    <div className="turn">
      <div className="turn__content">
        Ход
        <div className={`turn__square turn__square--${currentTurn}`}></div>
      </div>
    </div>
  );
}

export default Turn;