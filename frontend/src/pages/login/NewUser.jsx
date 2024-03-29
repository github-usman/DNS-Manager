// Login.js

import React, { useState } from 'react';
import styles from './loginPage.module.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const passClient = import.meta.env.VITE_API_URI_PASS || '';
const userClient = import.meta.env.VITE_API_URI_USER || '';
function NewUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setTimeout(() => {
      if (username === userClient && password === passClient) {
        toast.success('Welcome! Admin');
        location('/dashboard');
      } else {
        toast.error('Wrong Credentials');
      }
    }, 1000); 
  };
   const handleTryOther = (event) => {
    event.preventDefault();
    location('/login');
    toast.success("Please Login")
  
  };

  return (
    <>
      <div className={styles['login-container']}>
        <form className={styles['login-form']} onSubmit={handleSubmit}>
          <h2>Please Enter you AWS Credentials to use Route53</h2>
          <div className={styles['form-group']}>
            <label className={styles['lablel']} htmlFor="username">
              Aws Acess Key ID
            </label>
            <input
              className={styles['input']}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter you Access kye like AKIAxxMTWNMQ2NRUPOG"
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label className={styles['lablel']} htmlFor="password">
            Secret Access Key
            </label>
            <input
              className={styles['input']}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your SECRET ACCESS KEY  like uL3lleW+r+Dg+sdserUSDF+/pGEKY+57l"
              required
            />
          </div>
          <button className={styles['btn']} type="submit">
            Login
          </button>
          <p style={{fontSize:'14px',cursor:'pointer',paddingTop:'2rem',textAlign:'right',color:'blue'}} onClick={handleTryOther}>Login With Existing Admin</p>
        </form>
      </div>
    </>
  );
}

export default NewUser;
