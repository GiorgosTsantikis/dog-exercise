import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import App from './App.jsx'
import axios from 'axios';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import { ThemeContext,ThemeProvider } from './context/ThemeContext.jsx';

axios.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
  <ThemeProvider >
  <App />

  </ThemeProvider>
    </BrowserRouter>
  
)
