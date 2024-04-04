import React, { useContext, useState } from 'react';
import styles from './dnsCreateSingle.module.css';
import toast from 'react-hot-toast';
import { DnsContext } from '../../../context-api/DnsContext';
const URL = import.meta.env.VITE_API_URI || '';

function DnsCreateSingle({ handleActiveMethods, HostedZoneId }) {
  const { setNeedReload } = useContext(DnsContext);
  {/* "Name": "ipv7.loveyou.com.",
        "Type": "AAAA",
        "TTL": 3600,
        "ResourceRecords": [
            {
                "Value": "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
            } 
          ]*/}

  const [domainName, setDomainName] = useState('');
  const [Type, setType] = useState('');
  const [TTL, SetTTL] = useState('');
  const [ResourceRecords, setResourceRecords] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const parsedResourceRecords = JSON.parse(ResourceRecords);
      const response = await fetch(`${URL}/dns-records/create-multi?HostedZoneId=${HostedZoneId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ Name: domainName,Type:Type,TTL:TTL,ResourceRecords:parsedResourceRecords}]),
      });
      console.log('resoponse after creat', response);
      if (response.ok) {
        setNeedReload(true);
        toast.success(`${domainName} created successfully`);
        setDomainName('');  //empty when success
        setType('')
        SetTTL('')
        setResourceRecords('')
      } else {
        toast.error('Failed to creation domain');
        console.log(domainName, 'DOMAIN NAME')
      }
    } catch (error) {
      toast.error('Error occurred: ' + error);
    }
    
  };


  return (
    <div style={{ width: "100%", margin: "1rem auto" }}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="domainName">Dns Records Values:</label>
        <input
          className={styles['input']}
          type="text"
          id="domainName"
          placeholder="Enter domain name like usman.app.com"
          value={domainName}
          onChange={(event) => setDomainName(event.target.value)}
          required
        />
        <label htmlFor="domainName">Dns Records Type:</label>
        <input
          className={styles['input']}
          type="text"
          id="Type"
          placeholder="Enter domain Types like AAAA"
          value={Type}
          onChange={(event) => setType(event.target.value)}
          required
        />
        <label htmlFor="domainName">Dns Records TTL:</label>
        <input
          className={styles['input']}
          type="text"
          id="TTL"
          placeholder="Enter dns records TTL value like 3600"
          value={TTL}
          onChange={(event) => SetTTL(event.target.value)}
          required
        />
        <label htmlFor="domainName">Dns Records ResourceRecords :</label>
        <textarea
          className={styles['input']}
          type="text"
          id="ResourceRecords"
          placeholder={`

            [
              {
                  "Value": "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
              }
            ]

            `}
          style={{ width: '100%' }}
          rows={8}
          value={ResourceRecords}
          onChange={(event) => setResourceRecords(event.target.value)}
          required
        />
        <div className={styles.btnContainer}>
          <button className={styles.btn} type="submit">
            Create
          </button>
          <button className={styles.btnActive} onClick={() => handleActiveMethods('multipleDomain')}>Multiple Records</button>
        </div>
      </form>


    </div>
  );
}

export default DnsCreateSingle;
