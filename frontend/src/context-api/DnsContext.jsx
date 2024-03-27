import React, { createContext, useState} from 'react';

const DnsContext = createContext();

const DnsProvider = ({ children }) => {
    const [hostedZoneId, setHostedZoneId] = useState(null);
    const [domainName, setDomainName] = useState('');

    return (
        <DnsContext.Provider value={{ hostedZoneId, setHostedZoneId,domainName,setDomainName}}>
            {children}
        </DnsContext.Provider>
    );
};

export { DnsProvider, DnsContext };