import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ColorPicker from '../components/chatbot/ColorPicker';
import WelcomeMessages from '../components/chatbot/WelcomeMessages';
import IntroductionFormSettings from '../components/chatbot/IntroductionFormSettings';
import TimerSettings from '../components/chatbot/TimerSettings';
import PreviewPanel from '../components/chatbot/PreviewPanel';
import { useChatbotSettings } from '../hooks/useChatbotSettings';
import '../styles/Dashboard.css';
import '../styles/ChatbotSettings.css';

const ChatbotSettings = () => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const {
    settings,
    loading,
    saved,
    updateSetting,
    updateNestedSetting,
    handleWelcomeMessages,
    saveSettings
  } = useChatbotSettings();

  // Handler for timer changes
  const handleTimerChange = (unit, value) => {
    updateNestedSetting('missedChatTimer', unit, parseInt(value, 10) || 0);
  };

  // Handler for form field toggles
  const handleFormFieldToggle = (field, value) => {
    updateNestedSetting('introductionForm', field, value);
  };

  // Handler for button text change
  const handleButtonTextChange = (value) => {
    updateNestedSetting('introductionForm', 'buttonText', value);
  };
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="chatbot-settings-container">
        <header className="settings-header">
          <h1>Chatbot Settings</h1>
          <div className="header-actions">
            <button 
              className={`save-button ${saved ? 'saved' : ''}`}
              onClick={saveSettings}
              disabled={loading}
              aria-label="Save settings"
            >
              {loading ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </header>

        <div className='settings-body'>
          <PreviewPanel 
            settings={settings} 
            previewMode={previewMode} 
            setPreviewMode={setPreviewMode} 
          />
          
          <div className="settings-content">
            <div className="settings-panel">
              <div className="settings-section">
                <h2>Appearance</h2>
                
                <ColorPicker 
                  label="Header Color"
                  value={settings.headerColor}
                  onChange={(value) => updateSetting('headerColor', value)}
                  presetColors={['#FFFFFF', '#000000', '#334758']}
                />
                
                <ColorPicker 
                  label="Custom Background Color"
                  value={settings.backgroundColor}
                  onChange={(value) => updateSetting('backgroundColor', value)}
                  presetColors={['#FFFFFF', '#000000', '#EEEEEE']}
                />
              </div>
              
              <WelcomeMessages 
                messages={settings.welcomeMessages}
                onUpdate={handleWelcomeMessages.update}
                onAdd={handleWelcomeMessages.add}
                onRemove={handleWelcomeMessages.remove}
              />
              
              <IntroductionFormSettings 
                formSettings={settings.introductionForm}
                onToggle={handleFormFieldToggle}
                onButtonTextChange={handleButtonTextChange}
              />
              
              <TimerSettings 
                timer={settings.missedChatTimer}
                onTimerChange={handleTimerChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSettings;