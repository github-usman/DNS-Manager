import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login/LoginPage.jsx";
import WelcomePage from "./pages/welcome/WelcomePage.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import { DnsProvider } from "./context-api/DnsContext.jsx";
import DNSRecords from "./components/static/dns-record-list/DNSRecords.jsx";

function App() {
  return (
    <DnsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/dns-records/:domainName" element={<DNSRecords />} />
          <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </DnsProvider>
  );
}

export default App;

{
  /* <>
      <TopGradientDesign />
      <div className='bg-container'>
        <div className='main-container'>
          <BrowserRouter>
            <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <Routes>
              <Route path='/' element={<Home isModalOpen={isModalOpen} />}>
                <Route path='about' element={<About />} />
                <Route path='squad' element={<Squad />} />
                <Route path='lfc-tv' element={<LfcTv />} />
              </Route>
              <Route path='lucknow-fc' element={<LucknowFc />} />
              <Route path='department' element={<Department />} />
              <Route path='team' element={<Team />} />
              <Route path='academy' element={<Academy />} />
              <Route path='trainning' element={<Trainning />} />
              <Route path='media' element={<Media />} />
              <Route path='match' element={<Match />} />
              <Route path='gallery' element={<Gallery />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </> */
}
