// Login.js

import React, { useState } from 'react';
import styles from './loginPage.module.css';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <>
      <h2
        style={{
          backgroundColor: 'yellow',
          padding: '3rem',
          textAlign: 'center',
        }}
      >
        Please Skip Login page by click on Skip Button I'm working on this page
      </h2>
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
          <Link to="/dashboard">
            <button className={styles['btnSkip']}>Skip</button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
