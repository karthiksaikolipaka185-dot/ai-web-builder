import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    showToast('Logged out successfully', 'success');
    navigate('/login');
  };

  if (!user) return null;

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">KksBuild</Link>
      </div>
      <div className="navbar-links">
        <Link 
          to="/dashboard" 
          className={location.pathname === '/dashboard' ? 'active' : ''}
        >
          My Projects
        </Link>
      </div>
      <div className="navbar-user">
        <div className="user-avatar">{userInitial}</div>
        <span className="username">{user.name}</span>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
