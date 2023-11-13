// Login.jsx

import React, { useState } from "react";
import "./Login.css"; // Import your CSS file
import { Link } from "react-router-dom";

export default function Login() {
  const [isSignUp, setSignUp] = useState(false);

  const handleSwitchToggle = () => {
    setSignUp(!isSignUp);
  };

  return (
    <div className="login-container">
      <h3>Photo Editor</h3>
      <div className="switch-container">
        <label className="switch">
          <input type="checkbox" checked={isSignUp} onChange={handleSwitchToggle}/>
          <span className="slider round"></span>
        </label>
      </div>
      <div className="input-container">
        {isSignUp ? 
        <>
            <input placeholder="Username" className="login-input"/>
            <br />
            <input placeholder="Email" className="login-input"/>
            <br />
            <input type="password" placeholder="Password" className="login-input"/>
            <br />
            <input type="password" placeholder="Confirm Password" className="login-input"/>
            <div className="password-helper">*Password must be at least 8 characters long*</div>
        </> :
        <>
            <input placeholder="Username" className="login-input"/>
            <br />
            <input type="password" placeholder="Password" className="login-input"/>
        </>}
        <br />
        <Link to="/editor">
          <button className={isSignUp?"signup-button":"login-button"}>
              {isSignUp?"Sign Up":"Login"}
          </button>
        </Link>
        <br />
        <button className="google-login">Login with Google</button>
      </div>
    </div>
  );
}
