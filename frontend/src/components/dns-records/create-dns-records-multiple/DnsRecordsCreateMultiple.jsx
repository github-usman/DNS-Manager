import React, { useContext, useState } from 'react';
import styles from './dnsRecordsCreateMultiple.module.css';
import toast from 'react-hot-toast';
import { DnsContext } from '../../../context-api/DnsContext';
import { csvToJson } from '../../../utils/csvToJson';
const URL = import.meta.env.VITE_API_URI || '';

function DnsRecordsCreateMultiple({ handleActiveMethods, HostedZoneId }) {
    const { setNeedReload } = useContext(DnsContext);
    const [domainName, setDomainName] = useState('');
    const [csvData, setCsvData] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newDomainName = JSON.parse(domainName);
            const response = await fetch(`${URL}/dns-records/create-multi?HostedZoneId=${HostedZoneId}`, {
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
                // Handle success scenario, e.g., show a success message
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
                <label htmlFor="domainName">Enter your Multiple DNS Records</label>
                <br />
                <br />
                <textarea className={styles.jsonInputArea}
                    id="domainName"
                    value={domainName}
                    onChange={(event) => setDomainName(event.target.value)} // do not change the literals these are the designs in page also 
                    placeholder={`
                  // please  Enter your Valid dns Records here in following format
                                [
                                    {
                                        "Name": "ipv7.loveyou.com.",
                                        "Type": "AAAA",
                                        "TTL": 3600,
                                        "ResourceRecords": [
                                            {
                                                "Value": "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
                                            }
                                        ]
                                     },
                                     {
                                        "Name": "ipv.loveyou.com.",
                                        "Type": "AAAA",
                                        "TTL": 3600,
                                        "ResourceRecords": [
                                            {
                                                "Value": "2001:0db8:85a3:0000:0000:8a2e:0370:7338"
                                            }
                                        ]
                                     }
                                ]`}
                    style={{ width: '100%' }}
                    rows={25}
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
                    <button className={styles.btn} type="submit"> Create Records </button>
                    <button className={styles.btnActive} onClick={() => handleActiveMethods('singleDomain')}>Single Records</button>
                </div>
            </form>

        </div>
    );
}

export default DnsRecordsCreateMultiple;
