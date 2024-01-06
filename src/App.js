import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Login from './Login'
import Editor from './Editor'

export default function App() {

  const [currentUser, setCurrentUser] = useState(false);

  const LoggedIn = () => {
    setCurrentUser(true)
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/React-photo-editor" />;
    }
  
    return children;
  };

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/React-photo-editor" element={<Login LoggedIn={LoggedIn}/>} />
          <Route
            path="/React-photo-editor/editor"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

