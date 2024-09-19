import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/auth/admin-login', loginValues).then(
      result => {
        if (result?.data?.loginStatus) {
          setError('')
          navigate("/dashboard")
        } else {
          setError(result?.data?.Error)
        }
      }
    ).catch(err => console.log(err, "Error in login"))
  }
  return (
    <div className="login-page">
      <div className="left-section">
        <img src="/Image/bgImg.png" alt="Hundi" className="hundi-image" />
      </div>
      <div className="right-section">
        
        <div className="login-container">
        <div className='text-danger error-txt'>
        {error && error}
      </div>
          <h2>Login</h2>
          <p>Please login to Get Started</p>
          <form onSubmit={handleSubmit}>
            <label className="label-group ">Email</label>
            <div className="input-group">
              <input type="text" placeholder="Enter your email here"
                onChange={(e) => setLoginValues({ ...loginValues, email: e.target.value }, setError(''))} />
            </div>
            <label className="label-group">Password</label>
            <div className="input-group">
              <input type="password" placeholder="Enter your password here"
                onChange={(e) => setLoginValues({ ...loginValues, password: e.target.value }, setError(''))} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

