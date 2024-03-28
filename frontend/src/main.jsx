import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { DnsProvider } from './context-api/DnsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DnsProvider>
       <App />
    </DnsProvider>
  </React.StrictMode>,
);
