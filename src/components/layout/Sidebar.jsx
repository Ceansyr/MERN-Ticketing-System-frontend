import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';
import navigate from '../../utils/navigation';
import { removeToken } from '../../api/authApi';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/contact-center', icon: 'contactCenter', label: 'Contact Center' },
    { path: '/analytics', icon: 'analytics', label: 'Analytics' },
    { path: '/chatbot', icon: 'chatbot', label: 'Chatbot Settings' },
    { path: '/teams', icon: 'teams', label: 'Teams' },
    { path: '/settings', icon: 'settings', label: 'Settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    removeToken();
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="app-logo"></div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div 
            key={item.path} 
            className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
          >
            <div className={`nav-icon ${item.icon}-icon`}></div>
            {currentPath === item.path && (
              <span className="nav-label">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar" onClick={handleLogout}></div>
        </div>
      </div>

      {showLogoutPopup && (
        <div className="logout-popup-overlay">
          <div className="logout-popup">
            <h3>Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="logout-buttons">
              <button className="cancel-button" onClick={cancelLogout}>Cancel</button>
              <button className="confirm-button" onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;