import React from 'react';
import styles from './sideNavbar.module.css'; 
import { FiHome } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { PiFolderSimpleUser } from "react-icons/pi";
import { MdFeedback } from "react-icons/md";
import { Link } from 'react-router-dom';
import LogoHamBerger from '../../childComponents/logo/LogoHamBerger.jsx';
const SideNavbar = ({ hamburgerToggle, Close }) => {
  return (
    <div className={Close ? styles.sideNavbar : styles.noSideNavbar}>
      <ul>

        <div ><LogoHamBerger hamburgerToggle={hamburgerToggle} /></div>
        <li><Link to='/dashboard'><FiHome className={styles.icons} />Home</Link></li>
        <li><Link ><MdFeedback className={styles.icons} />Feedback</Link></li>
        <li><Link> <PiFolderSimpleUser className={styles.icons} />About</Link></li>
      </ul>
      <ul>
        <li><Link><LuLogOut className={styles.icons} />Logout</Link></li>
      </ul>
    </div>
  );
}

export default SideNavbar;
