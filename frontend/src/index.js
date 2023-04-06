import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { FiltersContextProvider } from './context/FiltersContext';
import { TicketContextProvider } from './context/TicketContext';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <FiltersContextProvider>
      <TicketContextProvider>
        <App />
      </TicketContextProvider>
    </FiltersContextProvider>
  </AuthContextProvider>,
  // </React.StrictMode>
);
