import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import LogoHamBerger from "../../components/childComponents/logo/LogoHamBerger";
import PieChart from "../../components/static/chart/PieChart";
import DomainCard from "../../components/static/domain-card/DomainCard.jsx";
import SideNavbar from "../../components/static/side-nav-bar/SideNavbar";
import styles from "./dashboardPage.module.css";
// import LineChart from "../../components/static/chart/LineChart";


const URL = import.meta.env.VITE_API_URI || "";


const DashboardPage = () => {
  const [Close, setClose] = useState(true);
  const [data, setData] = useState([]);
  const [randomIndexes, setRandomIndexes] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${URL}/Domain/all`);
      setData(data);
      const randomIndexesArray = data.map(() => Math.floor(Math.random() * data.length));
      setRandomIndexes(randomIndexesArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hamburgerToggle = () => {
    const newVal = !Close;
    setClose(newVal);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div>
          <SideNavbar hamburgerToggle={hamburgerToggle} Close={Close} />
          <LogoHamBerger hamburgerToggle={hamburgerToggle} />
        </div>
        <div>
          <FaUserCircle size={30} color="blue" />
        </div>
      </div>
      
  
      <div className={styles.bodySection}>
        {/* chart section */}
      <div>
        {/* line + pie chart */}
            <PieChart data={data}/>  
      </div>
            {/* domain list of card section */}
            <h2 style={{paddingTop:'3rem',paddingBottom:'1rem'}}>List of Domains</h2>
        <div className={styles.domainCard}>
          {data.length > 0 &&
            data.map((element, index) => (
              <DomainCard
                key={element.id}
                element={element}
                randomIndex={randomIndexes[index]} 
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
