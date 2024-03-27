import React, { useContext } from 'react';
import styles from './sideNavbar.module.css'; 
import { FiHome } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { PiFolderSimpleUser } from "react-icons/pi";
import { MdFeedback } from "react-icons/md";
import { Link } from 'react-router-dom';
import LogoHamBerger from '../../childComponents/logo/LogoHamBerger.jsx';
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { DnsContext } from '../../../context-api/DnsContext.jsx';
const SideNavbar = ({ hamburgerToggle, Close }) => {

  const {createPageBtn, setCreatePageBtn} = useContext(DnsContext);

  const handlePageCreate = ()=>{
    const revertOfCreate = !createPageBtn
    setCreatePageBtn(revertOfCreate);
    
  }
  return (
    <div className={Close ? styles.sideNavbar : styles.noSideNavbar}>
      <ul>

        <div ><LogoHamBerger hamburgerToggle={hamburgerToggle} /></div>
        <div className={styles['li']}><Link to='/dashboard'><FiHome className={styles.icons} />Home</Link></div>
        <div className={styles['li']} onClick={handlePageCreate}><Link ><MdOutlineCreateNewFolder  className={styles.icons} />Create Hosted Zone</Link></div>
        <div className={styles['li']}><Link ><MdFeedback className={styles.icons} />Feedback</Link></div>
        <div className={styles['li']}><Link> <PiFolderSimpleUser className={styles.icons} />About</Link></div>
      </ul>
      <ul>
        <div className={styles['li']}><Link to={'/'}> <PiFolderSimpleUser className={styles.icons} />Logout</Link></div>
      </ul>
    </div>
  );
}

export default SideNavbar;
