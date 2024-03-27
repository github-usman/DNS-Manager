import React, { useContext, useEffect, useState } from 'react'
import { DnsContext } from '../../../context-api/DnsContext';
import axios from 'axios';
// import { useLocation } from 'react-router-dom';
const URL = import.meta.env.VITE_API_URI || "";

const DNSRecords = () => {
    const {hostedZoneId} = useContext(DnsContext);
    let convertHostedZoneId = hostedZoneId.slice(12);
    const [dnsRecords, setDnsRecords] = useState([]);
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${URL}/dns-records/all`, {
                params: {
                    HostedZoneId:convertHostedZoneId
                }
            });
            console.log(data,'=====data')
            setDnsRecords(data.ResourceRecordSets);
            console.log(dnsRecords, 'list of DNS records from frontend');
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(dnsRecords,'value ans value')
    }, [hostedZoneId]);

    return (
        <div>
            <h1>welcome to dns records</h1>
            {
                dnsRecords.map((e,index)=>{
                    return <div key={index}>
                        <p>{e.Name}</p>
                    </div>
                })
            }
        </div>
    )
}

export default DNSRecords