import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Login from './Login'
import Editor from './Editor'

export default function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

