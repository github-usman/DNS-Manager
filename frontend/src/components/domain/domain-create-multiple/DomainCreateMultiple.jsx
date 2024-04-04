import React, { useContext, useState } from 'react';
import styles from './domainCreateMultiple.module.css';
import toast from 'react-hot-toast';
import { DnsContext } from '../../../context-api/DnsContext';
import { csvToJson } from '../../../utils/csvToJson';
const URL = import.meta.env.VITE_API_URI || '';

function DomainCreateMultiple({ handleActiveMethods }) {
    const { setNeedReload } = useContext(DnsContext);
    const [domainName, setDomainName] = useState('');
    const [csvData, setCsvData] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newDomainName = JSON.parse(domainName);
            const response = await fetch(`${URL}/domain/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDomainName),
            });
            console.log('resoponse after creat', response);
            if (response.ok) {
                setNeedReload(true);
                toast.success(`All Domains Created successfully`);
                setDomainName('');
            } else {
                toast.error('Failed to creation domain');
                console.log(newDomainName, 'DOMAIN NAME')
            }
        } catch (error) {
            toast.error('Error occurred: ' + error);
        }
       
    };


    // Function to handle reading file contents and setting domainName
    const handleJsonFileChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const fileContent = event.target.result;
            setDomainName(fileContent);
        };

        reader.readAsText(file);
    };

    // Function to handle reading CSV file contents and converting to JSON
    const handleCsvFileChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            const fileContent = event.target.result;
            // Convert CSV data to JSON
            const jsonData = await csvToJson(fileContent);
            // Convert JSON array to string
            const jsonString = JSON.stringify(jsonData, null, 2);
            setDomainName(jsonString);
        };

        reader.readAsText(file);
    };
    return (
        <div style={{ width: '100%' }}>
            <form onSubmit={handleSubmit} className={styles.form} >
                <label htmlFor="domainName">Enter your Multiple Domain Names</label>
                <br />
                <br />
                <textarea className={styles.jsonInputArea}
                    id="domainName"
                    value={domainName}
                    onChange={(event) => setDomainName(event.target.value)} // do not change the literals these are the designs in page also 
                    placeholder={`
                  // please  Enter your Valid domains here in following format
                                [
                                       {
                                          "Name" :"example.app"
                                        },
                                        {
                                         "Name" :"usman.example.app"
                                       },
                                       {
                                         "Name" :"ansari.example.in"
                                       }
                                ]`}
                    style={{ width: '100%' }}
                    rows={15}
                    required></textarea>
                <br />
                <div className={styles.jsonContainer}>
                    <div>
                        <label htmlFor="jsonFile" className={styles.fileInputLabel}>
                            Select JSON file
                        </label>
                        <input type="file" id="jsonFile" accept=".json" className={styles.fileInput} onChange={handleJsonFileChange} />
                    </div>
                    <div>
                        <label htmlFor="csvFile" className={styles.fileInputLabel}>
                            Select CSV file
                        </label>
                        <input type="file" id="csvFile" accept=".csv" className={styles.fileInput} onChange={handleCsvFileChange} />
                    </div>
                </div>


                <div className={styles.btnContainer}>
                    <button className={styles.btn} type="submit"> Create Hosted domain </button>
                    <button className={styles.btnActive} onClick={() => handleActiveMethods('singleDomain')}>Single Records</button>
                </div>
            </form>

        </div>
    );
}

export default DomainCreateMultiple;
