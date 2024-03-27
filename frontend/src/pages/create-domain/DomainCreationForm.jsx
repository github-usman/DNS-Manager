import React, { useContext, useState } from 'react';
import styles from './domainCreationForm.module.css';
import { DnsContext } from '../../context-api/DnsContext';
import toast from 'react-hot-toast';
const URL = import.meta.env.VITE_API_URI || '';

function DomainCreationForm() {
  const { setNeedReload } = useContext(DnsContext);
  const [domainName, setDomainName] = useState('');
  const { createPageBtn } = useContext(DnsContext);

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
        // Handle success scenario, e.g., show a success message
      } else {
        toast.error('Failed to creation domain');
      }
    } catch (error) {
      toast.error('Error occurred: ' + error);
    }
    setDomainName('');
  };

  return (
    <div
      className={styles.container}
      style={{ display: `${createPageBtn === true ? 'flex' : 'none'}` }}
    >
      <h2 style={{ alignSelf: 'start' }}>
        Domain Creation or Create New Hosted Zone
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="domainName">Domain Name:</label>
        <br />
        <input
          className={styles['input']}
          type="text"
          id="domainName"
          placeholder="Enter domain name"
          value={domainName}
          onChange={(event) => setDomainName(event.target.value)}
          required
        />
        <br />
        <br />
        <button className={styles.btn} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default DomainCreationForm;
