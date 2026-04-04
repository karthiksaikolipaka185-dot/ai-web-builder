import api from './api';

const authService = {
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data.data;
  },
  emailLogin: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data.data;
  },
};

export default authService;
