// Login.js

import React, { useContext, useState } from 'react';
import styles from './loginPage.module.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DnsContext } from '../../context-api/DnsContext';
const passClient = import.meta.env.VITE_API_URI_PASS || '';
const userClient = import.meta.env.VITE_API_URI_USER || '';
function Login() {
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('Admin@123!@#');
  const location = useNavigate();
  const { setIsLoggedLogin } = useContext(DnsContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    setTimeout(() => {
      if (username === userClient && password === passClient) {
        setIsLoggedLogin(true);
        toast.success('Welcome! Admin');
        location('/dashboard');
      } else {
        toast.error('Wrong Credentials');
      }
    }, 1000); 
  };
   const handleTryOther = (event) => {
    event.preventDefault();
    location('/newUser');
      toast.success("Please Enter your Credentials")
  };

  return (
    <>
      <div className={styles['login-container']}>
        <form className={styles['login-form']} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className={styles['form-group']}>
            <label className={styles['lablel']} htmlFor="username">
              Username
            </label>
            <input
              className={styles['input']}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label className={styles['lablel']} htmlFor="password">
              Password
            </label>
            <input
              className={styles['input']}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button className={styles['btn']} type="submit">
            Login
          </button>
          <p style={{fontSize:'14px',cursor:'pointer',paddingTop:'2rem',textAlign:'right',color:'blue'}} onClick={handleTryOther}>Try with your AWS credentials</p>
        </form>
      </div>
    </>
  );
}

export default Login;
