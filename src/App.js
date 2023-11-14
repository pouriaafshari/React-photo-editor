import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './Loading';
import Editor from './Editor';
import Login from './Login';
import './App.css';

// Create an AuthContext
const AuthContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const ProtectedRoute = ({ children }) => {
    if (!loggedIn) {
      return <Navigate to="/React-photo-editor/" />;
    }

    return children;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/React-photo-editor/" element={<Login />} />
          <Route path="/React-photo-editor/editor" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
