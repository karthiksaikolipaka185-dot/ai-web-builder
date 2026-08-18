import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getHeaders = () => {
  const token = Cookies.get('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Add a request interceptor to automatically add the Authorization header
api.interceptors.request.use(
  (config) => {
    const headers = getHeaders();
    config.headers = { ...config.headers, ...headers };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
