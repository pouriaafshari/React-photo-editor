import react from 'react';

function Slider({minVal, maxVal, Val, handleSlider}) {
    console.log(maxVal)
  return (
    <div className="slider-container">
        <input
            type="range"
            className="slider"
            min={minVal}
            max={maxVal}
            value={Val}
            onChange={handleSlider}
        />
    </div>
  );
}

export default Slider;
