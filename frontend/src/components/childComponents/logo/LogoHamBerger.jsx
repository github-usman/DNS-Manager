import React from 'react';
import styles from './logoHamBerger.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
const LogoHamBerger = ({ hamburgerToggle }) => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.Hamburger} onClick={hamburgerToggle}>
        <RxHamburgerMenu />
      </div>
      <Link to="/dashboard">DNS-Manager</Link>
    </div>
  );
};

export default LogoHamBerger;
