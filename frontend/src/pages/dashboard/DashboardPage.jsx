import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import LogoHamBerger from '../../components/childComponents/logo/LogoHamBerger';
import PieChart from '../../components/static/chart/PieChart';
import DomainCard from '../../components/static/domain-card/DomainCard.jsx';
import SideNavbar from '../../components/static/side-nav-bar/SideNavbar';
import styles from './dashboardPage.module.css';
import DomainCreationForm from '../create-domain/DomainCreationForm.jsx';
import { DnsContext } from '../../context-api/DnsContext.jsx';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
// import LineChart from "../../components/static/chart/LineChart";

const URL = import.meta.env.VITE_API_URI || '';

const DashboardPage = () => {
  const [Close, setClose] = useState(true);
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [randomIndexes, setRandomIndexes] = useState([]);
  const { needReload, setNeedReload, createPageBtn, setCreatePageBtn } =
    useContext(DnsContext);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${URL}/Domain/all`);
      setData(data);
      const randomIndexesArray = data.map(() =>
        Math.floor(Math.random() * data.length),
      );
      setRandomIndexes(randomIndexesArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    setNeedReload(false);
    
  }, [needReload]);

  const hamburgerToggle = () => {
    const newVal = !Close;
    setClose(newVal);
  };

  // toggle new Domain page

  const handlePageCreate = () => {
    const revertOfCreate = !createPageBtn;
    setCreatePageBtn(revertOfCreate);
  };
  // filter LOGIC---------------------------
  // const [filteredData, setFilteredData] = useState([...data]);
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilterValue(selectedValue);
    let newData = [...data];
    if (selectedValue === "maxRecord") {
      newData.sort((a, b) => a.ResourceRecordSetCount - b.ResourceRecordSetCount);
     }else if (selectedValue === "minRecord") {
      newData.sort((a, b) => b.ResourceRecordSetCount - a.ResourceRecordSetCount);
     }else if (selectedValue === "increasing") {
      newData.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (selectedValue === "decreasing") {
      newData.sort((a, b) => b.Name.localeCompare(a.Name));
    }
    setData(newData);
    setFilterValue(true);
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
        <DomainCreationForm />

        <div>
          {/* line + pie chart */}
          <PieChart data={data} />
        </div>
        {/* domain list of card section */}
        <div
          style={{
            paddingTop: '3rem',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h2>List of Domains</h2>

          {/* filter methods */}
          <select
            id="filterOptions"
            onChange={handleFilterChange}
            className={styles.dropDownHead}
          >
            <option className={styles.dropdownList} value="" disabled selected hidden>Sort By</option>
            <option className={styles.dropdownList} value="maxRecord">Records Increasing</option>
            <option className={styles.dropdownList} value="minRecord">Records Decreasing</option>
            <option className={styles.dropdownList} value="increasing">Increasing</option>
            <option className={styles.dropdownList} value="decreasing">Decreasing</option>
          </select>


          <div className={styles['li']} onClick={handlePageCreate}>
            <button className={styles.icons}>
              <MdOutlineCreateNewFolder />
              Create New Hosted Zone
            </button>
          </div>
        </div>

        {/* grid of domain */}
        {data.length > 0 ? (
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
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
