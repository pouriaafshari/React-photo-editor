import React, { useState } from 'react';
import Slider from './Slider';
import SidebarItem from './SidebarItem';
import './App.css';

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {min: 0, max: 200},
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {min: 0, max: 200},
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {min: 0, max: 200},
    unit: '%'
  }
]

function App() {
  const [selectedindex, setselectedindex] = useState(0);
  const [options, setoptions] = useState(DEFAULT_OPTIONS); 
 
  function GetImageStyle()
  {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return { filter: filters.join(' ') }
  }

  function handleDownload()
  {
    const canv = document.getElementById("cv")
    const image = document.getElementById("img")
    canv.width = image.naturalWidth;
    canv.height = image.naturalHeight;
    var ctx = canv.getContext("2d")
    ctx.filter = "brightness(20%)"

    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)

    var ctx = canv.getContext
  }

  return (
    <div className="container">
      <div className="image" style={GetImageStyle()}>
        <img src='https://i.pinimg.com/originals/37/6c/78/376c788b791d6c11dc5f58d8e5e0f027.jpg' id='img'/>
        <canvas id="cv"></canvas>
        <button onClick={handleDownload}>Download</button>
      </div>
      <div className="sidebar">
        {options.map((options, index) => {
          return(<SidebarItem
            key={index}
            name={options.name}
            active = {selectedindex === index}
            handleClick={()=>{setselectedindex(index)}}
          />)
        })}
      </div>
      <Slider
        minVal={options[selectedindex].range.min}
        maxVal={options[selectedindex].range.max}
        Val={options[selectedindex].value}
        handleSlider={({target})=>{ 
          setoptions(prevOptions => {
            const newOptions = [...prevOptions]
            newOptions[selectedindex].value = target.value
            return newOptions
          });
        }}
      />
    </div>
  );
}

export default App;
