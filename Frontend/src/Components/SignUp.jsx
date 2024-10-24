import React, { useState } from 'react';
import { handleSuccess, handleError } from '../utils'; // Ensure utils is correctly imported
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './SignUp.css';

function SignUp() {
  const [role, setRole] = useState('Agro Scientist');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  
  const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { username, email, password, role };
  
    // Simple validation for username
    if (username.trim() === '') {
      setUsernameError('Username is required');
      return;
    } else {
      setUsernameError(''); // Clear error if valid
    }
  
    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log(data);
      const { success, message ,error} = data;
      console.log(response.ok);
      if (response.ok && success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate('/login');
          }, 2000); 
        } 
        else {
          // handleError(error || 'Signup failed!');
          handleError(error);
        }
    } catch (error) {
      console.error('Error:', error);
      handleError('An error occurred. Please try again later.'); 
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="sign-up-heading">Get Started</h1>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="signup-label">Username</label>
            <input
              type="text"
              id="name"
              className="signup-input"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            {usernameError && <span className="error-text">{usernameError}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="signup-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="signup-input"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="signup-label">Password</label>
            <input
              type="password"
              id="password"
              className="signup-input"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="option" className="signup-label">Select your role</label>
            <select
              id="option"
              className="signup-select"
              value={role}
              onChange={(e) => setRole(e.target.value)} // Set role on change
            >
              <option value="Agro Scientist">Agro Scientist</option>
              <option value="Farmer">Farmer</option>
              <option value="Student">Student</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <ToastContainer />
        <p className="or-text">or</p>
        <div className="social-buttons">
          <button className="social-btn" style={{ backgroundColor: '#f0f0f0' }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WwgH7Nl5_AW9nDCnR2Ozb_AU3rkIbSJdAg&s" alt="Google" className="social-icon" />
            Google
          </button>
          <button className="social-btn" style={{ backgroundColor: '#f0f0f0' }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s" alt="Facebook" className="social-icon" />
            Facebook
          </button>
        </div>
        <div className="text-center">
          <Link to="/login" className="link-button">Have an account? Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;