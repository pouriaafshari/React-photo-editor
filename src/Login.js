import React, { useState, useEffect } from "react";
import "./Login.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; 
const LoginUrl = 'https://photo-editor-d8if.onrender.com/login';
const SignupUrl = 'https://photo-editor-d8if.onrender.com/signup';
const serverAuthUrl = 'https://photo-editor-d8if.onrender.com/auth'
//const serverAuthUrl = 'http://localhost:3000/auth'

export default function Login({ LoggedIn }) {
  const [isSignUp, setSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setFormValid] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("")

  const handleSwitchToggle = () => {
    setSignUp(!isSignUp);
  };

  useEffect(() => {
    // Implement form validation rules here
    const isUsernameValid = /^[a-zA-Z]+$/u.test(username);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 8;
    const isConfirmPasswordValid = isSignUp ? password === confirmPassword : true;

    // Enable/disable the submit button based on validation
    if (isSignUp){
      setFormValid(isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid);
    }
    else {
      setFormValid(isUsernameValid && isPasswordValid);
    }
  }, [isSignUp, username, email, password, confirmPassword]);

  useEffect(() => {
    const authenticateToken = async () => {
      const storedAccessToken = Cookies.get('accessToken');

      if (storedAccessToken) {
        try {
          console.log(storedAccessToken);
          const response = await fetch(serverAuthUrl, {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
            },
          });

          const responseBody = await response.text();

          if (responseBody === "Token is valid") {
            LoggedIn();
            navigate('/editor');
          } else {
            // Handle server error or authentication failure
            console.error('Server error or authentication failure:', response.statusText);
          }
        } catch (error) {
          console.error('Error sending GET request:', error);
        }
      } else {
        console.log("token not found or not valid.")
      }
    };

    authenticateToken();
  }, [navigate]);

  const handleLogin = () => {
    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value;
    setFormValid(false)

    if (isSignUp) {
      // Call signup function
      const email = document.getElementById('email').value;
      handleSignUp(username, password, email);
    } else {
      // Call login function
      LoginCheck(username, password);
    }
  };

  async function LoginCheck(username, password) {
    try {
      const response = await fetch(LoginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Login response:', data);

      if (data.Accesstoken) {
        Cookies.set('accessToken', data.Accesstoken);
        LoggedIn();
        navigate('/editor');
      }
      else {
        setMessage("*User not found or Wrong pass word*")
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  }

  async function handleSignUp(username, password, email) {
    try {
      const response = await fetch(SignupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Login response:', data);

      if (data.Accesstoken) {
        console.log(data.Accesstoken);
        Cookies.set('accessToken', data.Accesstoken);
        LoggedIn();
        navigate('/editor');
      }
      else {
        setMessage("*Username is taken*")
      }
      
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  }

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
            <input
              id="username"
              placeholder="Username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              id="email"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="login-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="password-helper">*Password must be at least 8 characters long*</div>
        </> :
        <>
            <input
              id="username"
              placeholder="Username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </>}
        <br />
        <p id="message">{message}</p>
        <button className={isSignUp ? "signup-button" : "login-button"} onClick={handleLogin} disabled={!isFormValid}>
          {isSignUp ? "Sign Up" : "Login"}
        </button>
        <br />
        <button className="google-login">Login with Google</button>
      </div>
    </div>
  );
}
