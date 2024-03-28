import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/login/LoginPage.jsx';
import WelcomePage from './pages/welcome/WelcomePage.jsx';
import DashboardPage from './pages/dashboard-domain/DashboardPage.jsx';
import { DnsContext, DnsProvider } from './context-api/DnsContext.jsx';
import DNSRecordPage from './pages/dashboard-dns-record/DNSRecordsPage.jsx';
import NewUser from './pages/login/NewUser.jsx';
import { useContext, useEffect, useState } from 'react';

function App() {
  // using sessionStorage 

 const { isLoggedLogin}=useContext(DnsContext);

  useEffect(() => {
    sessionStorage.setItem('isLoggedLogin', JSON.stringify(isLoggedLogin));
  }, [isLoggedLogin]);

  const isLoggedIn = () => {
    return isLoggedLogin;
  };
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Protected routes */}
          <Route path="/dashboard" element={isLoggedIn() ? <DashboardPage /> : <Navigate to="/login" />}/>
          <Route path="/dns-records/:domainName" element={isLoggedIn() ? <DNSRecordPage /> : <Navigate to="/login"/>}/>
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
  );
}

export default App;
