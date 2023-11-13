import React, { useState, useEffect } from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Slider from './Slider';
import SidebarItem from './SidebarItem';
import Loading from './Loading';
import Editor from './Editor'
import Login from './Login';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/editor",
      element: <Editor />,
    }
  ]);

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  return (
    <div className="container">
      {loading? <Loading /> 
      : <RouterProvider router={router} />}
    </div>
   );
}

export default App;
