import React from 'react';
import './styles.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="left-section">
        <img src="/Image/bgImg.png" alt="Hundi" className="hundi-image" />
      </div>
      <div className="right-section">
        <div className="login-container">
          <h2>Login</h2>
          <p>Please login to Get Started</p>
          <form>
            <label className="label-group ">Email</label>
            <div className="input-group">
              <input type="text" placeholder="Enter your email here" />
            </div>
            <label className="label-group">Password</label>
            <div className="input-group">
              <input type="password" placeholder="Enter your password here" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
