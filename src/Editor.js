import React, { useState, useEffect } from 'react';
import Slider from './Slider';
import SidebarItem from './SidebarItem';

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
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {min: 0, max: 100},
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {min: 0, max: 100},
    unit: '%'
  },
  {
    name: 'Hue rotate',
    property: 'hue-rotate',
    value: 0,
    range: {min: 0, max: 360},
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {min: 0, max: 40},
    unit: 'px'
  }
]

const Free = ["brigtness", "contrast", "sturate"]

function App() {
  const [selectedindex, setselectedindex] = useState(0);
  const [options, setoptions] = useState(DEFAULT_OPTIONS); 
  const [URL, setURL] = useState("https://i.pinimg.com/originals/37/6c/78/376c788b791d6c11dc5f58d8e5e0f027.jpg");
  function GetImageStyle()
  {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return { filter: filters.join(' ') }
  }

  function handleApply()
  {
    const canv = document.getElementById("cv")
    const image = document.getElementById("img")
    canv.width = image.naturalWidth;
    canv.height = image.naturalHeight;
    var ctx = canv.getContext("2d")
    ctx.filter = GetImageStyle().filter

    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)

    var ctx = canv.getContext
  }

  function getImageURL()
  {
    setoptions(DEFAULT_OPTIONS);

    const inputUrl = document.querySelector('.input-url');
    setURL(inputUrl.value);
  }

  return (
    <div className="container">
      <div className="image">
        <input type='url' className='input-url' placeholder='Enter URL'/>
        <button className='OKbutton' onClick={getImageURL}>OK</button>
        <br />
        <img src={URL} id='img' style={GetImageStyle()}/>
        <br />
        <button onClick={handleApply} className='apply-button'>Apply</button>
        <br />
        <canvas id="cv"></canvas>
      </div>
      <div className="sidebar">
        {options.map((options, index) => {
          return(<SidebarItem
            key={index}
            name={options.name}
            active = {selectedindex === index}
            handleClick={()=>{setselectedindex(index)}}
            premium={(index>1)? true: false}
          />)
        })}
        <button className='PrimeButton'>Get Premium</button>
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
