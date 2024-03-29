import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/login/LoginPage.jsx';
import WelcomePage from './pages/welcome/WelcomePage.jsx';
import DashboardPage from './pages/dashboard-domain/DashboardPage.jsx';
import { DnsProvider } from './context-api/DnsContext.jsx';
import DNSRecordPage from './pages/dashboard-dns-record/DNSRecordsPage.jsx';
import NewUser from './pages/login/NewUser.jsx';

function App() {
  return (
    <DnsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dns-records/:domainName" element={<DNSRecordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/newUser" element={<NewUser />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </DnsProvider>
  );
}

export default App;
