import React from 'react'
import './App.css'

import Slider from './Slider'

function App() {
  return (
    <div className='container'>
      <div className='main-image' />
      <div className='sidebar'>
        sidebar
      </div>
      <Slider />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          //setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
}

export default App;
