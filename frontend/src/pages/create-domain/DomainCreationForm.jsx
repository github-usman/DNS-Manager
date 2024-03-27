import React, { useContext, useState } from 'react';
import styles from "./domainCreationForm.module.css";
import { DnsContext } from '../../context-api/DnsContext';
const URL = import.meta.env.VITE_API_URI || "";
function DomainCreationForm() {
    const [domainName, setDomainName] = useState('');
    const {createPageBtn} = useContext(DnsContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${URL}/domain/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([{ Name: domainName }])
            });

            if (response.ok) {
                alert('created');
                // Handle success scenario, e.g., show a success message
            } else {
                alert('Failed to create domain');
                // Handle failure scenario, e.g., show an error message
            }
        } catch (error) {
            alert('Error occurred:', error);
            // Handle error scenario, e.g., show an error message
        }
    };

    return (
        <div className={styles.container} style={{display:`${createPageBtn === true ?'flex':'none'}`}}>
            <h1 style={{alignSelf:'start'}}>Domain Creation Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="domainName">Domain Name:</label><br />
                <input
                    className={styles['input']}
                    type="text"
                    id="domainName"
                    placeholder='Enter domain name'
                    value={domainName}
                    onChange={(event) => setDomainName(event.target.value)}
                    required
                /><br /><br />
                <button className={styles.btn} type="submit">Create</button>
            </form>
        </div>
    );
}

export default DomainCreationForm;
