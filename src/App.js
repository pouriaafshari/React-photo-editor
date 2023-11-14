import React, { useState, useEffect, useContext, createContext } from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Loading from './Loading';
import Editor from './Editor'
import Login from './Login';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const Loggedin = useContext(false);

  const ProtectedRoute = ({children}) => {
    if (!Loggedin) {
      return <Navigate to="/" />
    }

    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/editor",
      element: <ProtectedRoute><Editor /></ProtectedRoute>,
    }
  ]);

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  return (
    <div className="container">
      {loading? <Loading /> :
      <RouterProvider router={router} />}
    </div>
   );
}

export default App;
