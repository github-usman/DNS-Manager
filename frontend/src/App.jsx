import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login/LoginPage.jsx";
import WelcomePage from "./pages/welcome/WelcomePage.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import { DnsProvider } from "./context-api/DnsContext.jsx";
import DNSRecordPage from "./pages/dns-record/DNSRecordsPage.jsx";

function App() {
  return (
    <DnsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dns-records/:domainName" element={<DNSRecordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </DnsProvider>
  );
}

export default App;
