import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import SettingsContainer from '../components/settings/SettingsContainer';
import '../styles/Dashboard.css';
import '../styles/Settings.css';

const Settings = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Settings</h1>
        </header>
        
        <SettingsContainer />
      </main>
    </div>
  );
};

export default Settings;