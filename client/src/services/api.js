import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://ai-web-builder-1-8bm9.onrender.com/api',
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
