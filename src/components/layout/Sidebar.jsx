import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';
import navigate from '../../utils/navigation';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
          <div className="user-avatar"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;