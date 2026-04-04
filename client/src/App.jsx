import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BuilderPage from './pages/BuilderPage';
import PublicViewPage from './pages/PublicViewPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="full-screen-loader">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <LandingPage />} 
        />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/builder/:projectId" 
          element={
            <ProtectedRoute>
              <BuilderPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/share/:shareId" element={<PublicViewPage />} />
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
