import React, { useContext, useState } from 'react';
import styles from './domainCreateSingle.module.css';
import toast from 'react-hot-toast';
import { DnsContext } from '../../../context-api/DnsContext';
const URL = import.meta.env.VITE_API_URI || '';

function DomainCreateSingle({ handleActiveMethods }) {
  const { setNeedReload } = useContext(DnsContext);
  const [domainName, setDomainName] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${URL}/domain/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ Name: domainName }]),
      });
      console.log('resoponse after creat', response);
      if (response.ok) {
        setNeedReload(true);
        toast.success(`${domainName} created successfully`);
        setDomainName('');
      } else {
        toast.error('Failed to creation domain');
        console.log(domainName, 'DOMAIN NAME')
      }
    } catch (error) {
      toast.error('Error occurred: ' + error);
    }

  };


  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="domainName">Domain Name:</label>
        <br />
        <input
          className={styles['input']}
          type="text"
          id="domainName"
          placeholder="Enter domain name like usman.app.com"
          value={domainName}
          onChange={(event) => setDomainName(event.target.value)}
          required
        />
        <br />
        <br />
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

export default DomainCreateSingle;
