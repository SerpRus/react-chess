import './TransformShapes.css';

const TransformShapes = props => {
  return (
    <div className={`transform-shapes ${props.isShow ? 'show' : ''}`}>
      <h2>Select new figure</h2>
      <div className='transform-shapes__content'>
        <button
          className={`transform-shapes__item transform-shapes__item--knight player-${props.player}`}
          data-figure='Knight'
          onClick={e => props.onClick(e.target.dataset.figure)}
        >
        </button>
        <button 
          className={`transform-shapes__item transform-shapes__item--bishop player-${props.player}`}
          data-figure='Bishop'
          onClick={e => props.onClick(e.target.dataset.figure)}
        >
        </button>
        <button 
          className={`transform-shapes__item transform-shapes__item--rook player-${props.player}`}
          data-figure='Rook'
          onClick={e => props.onClick(e.target.dataset.figure)}
        >
        </button>
        <button 
          className={`transform-shapes__item transform-shapes__item--queen player-${props.player}`}
          data-figure='Queen'
          onClick={e => props.onClick(e.target.dataset.figure)}
        >
        </button>
      </div>
    </div>
    
  );
}

export default TransformShapes;