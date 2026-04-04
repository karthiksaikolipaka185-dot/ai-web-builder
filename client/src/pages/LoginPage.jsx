import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import authService from '../services/authService';
import '../styles/login.css';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { user, login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isSignUp) {
        data = await authService.register(formData.name, formData.email, formData.password);
        showToast('Registration successful!', 'success');
      } else {
        data = await authService.emailLogin(formData.email, formData.password);
        showToast('Login successful!', 'success');
      }

      // Backend returns login data with token and user info inside it or just token.
      // Based on our auth service, it returns token. We might need a profile fetch or update login logic.
      // Assuming 'data' contains { token, user } or similar.
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (error) {
      showToast(error.response?.data?.message || 'Authentication failed', 'error');
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p>{isSignUp ? 'Join KksBuild to start building' : 'Sign in to continue your projects'}</p>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="form-group">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                name="name" 
                className="auth-input"
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email" 
              className="auth-input"
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password" 
              className="auth-input"
              value={formData.password} 
              onChange={handleChange} 
              required 
              minLength={6}
            />
          </div>
          <button type="submit" className="btn-auth">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="auth-toggle">
          <span>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </span>
          <span onClick={() => setIsSignUp(!isSignUp)} className="auth-toggle-link">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
