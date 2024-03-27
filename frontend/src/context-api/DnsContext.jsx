import React, { createContext, useState} from 'react';

const DnsContext = createContext();

const DnsProvider = ({ children }) => {
    const [hostedZoneId, setHostedZoneId] = useState(null);
    const [createPageBtn, setCreatePageBtn] = useState(false);


    return (
        <DnsContext.Provider value={{ hostedZoneId, setHostedZoneId,createPageBtn,setCreatePageBtn}}>
            {children}
        </DnsContext.Provider>
    );
};

export { DnsProvider, DnsContext };