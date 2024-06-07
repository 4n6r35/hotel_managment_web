import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER, // Reemplaza con tu base URL
  // baseURL: 'http://localhost:4500/', // Reemplaza con tu base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;