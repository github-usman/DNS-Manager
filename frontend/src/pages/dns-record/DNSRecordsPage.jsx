import React, { useContext, useEffect, useState } from 'react';
import { DnsContext } from '../../context-api/DnsContext';
import axios from 'axios';
import styles from './dnsRecordsPage.module.css';
import SideNavbar from '../../components/childComponents/side-nav-bar/SideNavbar';
import LogoHamBerger from '../../components/childComponents/logo/LogoHamBerger';
import { FaUserCircle } from 'react-icons/fa';
import RecordsCard from '../../components/dns-records/dns-record-list/RecordsCard';
import DNSCreationForm from '../../components/dns-records/create-methods/DNSCreationForm';
// import { useLocation } from 'react-router-dom';
const URL = import.meta.env.VITE_API_URI || '';

const DNSRecords = () => {
  const [Close, setClose] = useState(true);
  const { hostedZoneId } = useContext(DnsContext);
  let convertHostedZoneId = hostedZoneId.slice(12);
  const [dnsRecords, setDnsRecords] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${URL}/dns-records/all`, {
        params: {
          HostedZoneId: convertHostedZoneId,
        },
      });
      console.log(data, '=====data');
      setDnsRecords(data.ResourceRecordSets);
      console.log(dnsRecords, 'list of DNS records from frontend');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    // console.log(dnsRecords, "value ans value");
  }, [hostedZoneId]);

  const hamburgerToggle = () => {
    const newVal = !Close;
    setClose(newVal);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo} >
          <SideNavbar hamburgerToggle={hamburgerToggle} Close={Close} />
          <LogoHamBerger hamburgerToggle={hamburgerToggle} />
        </div>
        <div>
          <FaUserCircle size={30} color="blue" />
        </div>
      </div>

      {/* dns list  */}
      <div className={styles.bodySection} style={{ marginLeft: !Close && "0", transition: 'all 0.4s' }}>
      <DNSCreationForm  HostedZoneId={convertHostedZoneId}/>
        <h1 style={{ textAlign: 'center' }}>List of DNS Records </h1>
        {/* schema */}
        <div className={styles.schema}>
          <p className={styles.schemaCellLeft} style={{ width: '22%' }}>
            Name
          </p>
          <p className={styles.schemaCell} style={{ width: '5%' }}>
            {' '}
            Type
          </p>
          <p className={styles.schemaCell} style={{ width: '8%' }}>
            {' '}
            TTL
          </p>
          <p className={styles.schemaCellRight}>Sub-Domain</p>
        </div>
        {dnsRecords.length > 0 ? (
          <div className={styles.RecordsTable}>
            {dnsRecords.map((details, index) => {
              return (
                <div key={index}>
                  <RecordsCard details={details} />
                </div>
              );
            })}
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default DNSRecords;
