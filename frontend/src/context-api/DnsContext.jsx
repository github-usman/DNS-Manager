import React, { createContext, useState } from 'react';

const DnsContext = createContext();

const DnsProvider = ({ children }) => {
  const [hostedZoneId, setHostedZoneId] = useState(null);
  const [domainCreatePage, setDomainCreatePage] = useState(true);
  const [needReload, setNeedReload] = useState(false);

  return (
    <DnsContext.Provider
      value={{
        hostedZoneId,
        setHostedZoneId,
        domainCreatePage,
        setDomainCreatePage,
        needReload,
        setNeedReload,
      }}
    >
      {children}
    </DnsContext.Provider>
  );
};

export { DnsProvider, DnsContext };
