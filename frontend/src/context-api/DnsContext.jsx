import React, { createContext, useState } from 'react';

const DnsContext = createContext();

const DnsProvider = ({ children }) => {
  const [hostedZoneId, setHostedZoneId] = useState(null);
  const [createPageBtn, setCreatePageBtn] = useState(false);
  const [needReload, setNeedReload] = useState(false);

  return (
    <DnsContext.Provider
      value={{
        hostedZoneId,
        setHostedZoneId,
        createPageBtn,
        setCreatePageBtn,
        needReload,
        setNeedReload,
      }}
    >
      {children}
    </DnsContext.Provider>
  );
};

export { DnsProvider, DnsContext };
