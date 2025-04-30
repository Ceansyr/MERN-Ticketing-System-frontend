import React from 'react';

const TabButton = ({ label, isActive, icon, onClick }) => (
  <button 
    className={`tab-button ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {icon && <span className={`tab-icon ${icon}`}></span>}
    {label}
  </button>
);

export default TabButton;