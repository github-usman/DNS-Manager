import React, { createContext, useState } from 'react';

const DnsContext = createContext();

const DnsProvider = ({ children }) => {
  const [hostedZoneId, setHostedZoneId] = useState(null);
  const [domainCreatePage, setDomainCreatePage] = useState(true);
  const [needReload, setNeedReload] = useState(false);


  // login
  const [isLoggedLogin, setIsLoggedLogin] = useState(() => {
    const storedIsLoggedLogin = sessionStorage.getItem('isLoggedLogin');
    return storedIsLoggedLogin ? JSON.parse(storedIsLoggedLogin) : false;
  });

  return (
    <DnsContext.Provider
      value={{
        hostedZoneId,
        setHostedZoneId,
        domainCreatePage,
        setDomainCreatePage,
        needReload,
        setNeedReload,
        isLoggedLogin,
        setIsLoggedLogin
      }}
    >
      {children}
    </DnsContext.Provider>
  );
};

export { DnsProvider, DnsContext };
