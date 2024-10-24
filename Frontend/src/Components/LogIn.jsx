import React, { useState } from 'react';
import { handleSuccess, handleError } from '../utils'; // Ensure utils is correctly imported
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './LogIn.css';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email, password };

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      console.log(email);
      console.log(password);
      // Destructure the response data
      const { success, message, token, username } = data;

      if (response.ok) {
        if (success && token) {
          handleSuccess(message);

          // Store the token and user info in local storage
          localStorage.setItem("token", token);
          localStorage.setItem("loggedInUser", username);

          setTimeout(() => {
            navigate('/');
          }, 1000); 
        } else {
          handleError(error); // Handle specific errors such as "Invalid email" or "Invalid password"
        }
      } else {
        handleError(message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      handleError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-heading">Log In</h1>
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="labels">Email</label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="labels">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => {
                if (!e.target.value) setError('Password is required');
              }}
            />
          </div>
          <div className="remember-forgot-container">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="remember"> Remember Me</label>
            </div>
            <Link to="#" className="forgot">Forgot Password?</Link>
          </div>
          <button type="submit" className="log-in-btn">Log In</button>
          <div className="social-container">
            <button className="social-btn">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WwgH7Nl5_AW9nDCnR2Ozb_AU3rkIbSJdAg&s" alt="Google" className="social-icon" />
              Google
            </button>
            <button className="social-btn">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s" alt="Facebook" className="social-icon" />
              Facebook
            </button>
          </div>
          <div className="text-center">
            <Link to="/signup" className="link-button">Don't have an account? Sign up</Link>
          </div>
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default LogIn;
