import './TransformShapes.css';

const TransformShapes = ({player, isShow, onClick}) => {
  return (
    <div className={`transform-shapes ${isShow ? 'show' : ''}`}>
      <h2>Выберите новую фигуру</h2>
      <div className='transform-shapes__content'>
        <button
          className={`transform-shapes__item transform-shapes__item--knight player-${player}`}
          data-figure='Knight'
          onClick={e => onClick(e.target.dataset.figure)}
        >
        </button>
        <button 
          className={`transform-shapes__item transform-shapes__item--bishop player-${player}`}
          data-figure='Bishop'
          onClick={e => onClick(e.target.dataset.figure)}
        >
        </button>
        <button 
          className={`transform-shapes__item transform-shapes__item--rook player-${player}`}
          data-figure='Rook'
          onClick={e => onClick(e.target.dataset.figure)}
        >
        </button>
        <button 
          className={`transform-shapes__item transform-shapes__item--queen player-${player}`}
          data-figure='Queen'
          onClick={e => onClick(e.target.dataset.figure)}
        >
        </button>
      </div>
    </div>
    
  );
}

export default TransformShapes;