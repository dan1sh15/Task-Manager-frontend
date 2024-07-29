import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; 
import AppContextProvider from './context/AppContext';
import {Toaster} from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Router>
        <AppContextProvider>
          <App />
          <Toaster />
        </AppContextProvider>
      </Router>
);
