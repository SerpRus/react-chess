import './LostFigures.css'

const LostFigures = props => {
  return (
    <div className='lost-figures'>
      {renderLostFigures(props.lostFigures)}
    </div>
  );
};

const renderLostFigures = lostFigures => {
  const lostFiguresArr = lostFigures.map((lostFigure, key) => {
    return (
      <div 
        key={key}
        className='lost-figure__item'
        style={{
          backgroundImage: lostFigure.style.backgroundImage,
          
        }}
      >
      </div>
    );
  });

  return lostFiguresArr;
}

export default LostFigures;