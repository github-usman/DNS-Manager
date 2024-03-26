import React from 'react';
import styles from  './sideNavbar.module.css'; // Import your CSS file for styling
import { FiHome } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiFolderSimpleUser } from "react-icons/pi";
import { MdFeedback } from "react-icons/md";
import { Link } from 'react-router-dom';
const SideNavbar = () => {
  return (
    <div className={styles.sideNavbar}>
      <ul>

        <div className={styles.logoContainer}><div className={styles.Hamburger}><RxHamburgerMenu /></div><Link to='/'>DNS-Manager</Link></div>
        <li><Link to='/dashboard'><FiHome className={styles.icons}/>Home</Link></li>
        <li><Link ><MdFeedback className={styles.icons}/>Feedback</Link></li>
        <li><Link> <PiFolderSimpleUser className={styles.icons}/>About</Link></li>
      </ul>
      <ul>
         <li><Link><LuLogOut className={styles.icons}/>Logout</Link></li>
      </ul>
    </div>
  );
}

export default SideNavbar;
