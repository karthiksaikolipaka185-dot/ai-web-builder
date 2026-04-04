import api from './api';
import Cookies from 'js-cookie';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 });
    }
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: () => {
    Cookies.remove('token');
  },
  getToken: () => {
    return Cookies.get('token');
  },
};

export default authService;
