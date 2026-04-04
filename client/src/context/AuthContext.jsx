import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await api.get('/auth/me');
          if (response.data.success) {
            setUser(response.data.data);
          } else {
            Cookies.remove('token');
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          Cookies.remove('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token, userData) => {
    Cookies.set('token', token, { expires: 7 });
    setUser(userData);
  };

  const logoutUser = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
