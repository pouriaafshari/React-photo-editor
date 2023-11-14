import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

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

function Login() {
  return(<div>Login</div>)
}
function Editor() {
  return(<div>Editor</div>)
}
