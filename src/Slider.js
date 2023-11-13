import react from 'react';

function Slider({minVal, maxVal, Val, handleSlider}) {
    console.log(maxVal)
  return (
    <div className="slider-container">
        <input
            type="range"
            className="slider2"
            min={minVal}
            max={maxVal}
            value={Val}
            onChange={handleSlider} 
        />
        <p className='slider-value'>{Val}</p>
    </div>
  );
}

export default Slider;
