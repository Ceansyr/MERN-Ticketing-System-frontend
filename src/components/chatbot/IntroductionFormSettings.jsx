import React from 'react';

const IntroductionFormSettings = ({ formSettings, onToggle, onButtonTextChange }) => {
  return (
    <div className="settings-section">
      <h2>Introduction Form</h2>
      
      <div className="toggle-group">
        <label>Enable Introduction Form</label>
        <div className="toggle-switch">
          <input 
            type="checkbox"
            id="enable-form"
            checked={formSettings.enabled}
            onChange={(e) => onToggle('enabled', e.target.checked)}
          />
          <label htmlFor="enable-form" className="toggle-label"></label>
        </div>
      </div>
      
      {formSettings.enabled && (
        <>
          <div className="toggle-group">
            <label>Name Field</label>
            <div className="toggle-switch">
              <input 
                type="checkbox"
                id="name-field"
                checked={formSettings.nameField}
                onChange={(e) => onToggle('nameField', e.target.checked)}
              />
              <label htmlFor="name-field" className="toggle-label"></label>
            </div>
          </div>
          
          <div className="toggle-group">
            <label>Phone Field</label>
            <div className="toggle-switch">
              <input 
                type="checkbox"
                id="phone-field"
                checked={formSettings.phoneField}
                onChange={(e) => onToggle('phoneField', e.target.checked)}
              />
              <label htmlFor="phone-field" className="toggle-label"></label>
            </div>
          </div>
          
          <div className="toggle-group">
            <label>Email Field</label>
            <div className="toggle-switch">
              <input 
                type="checkbox"
                id="email-field"
                checked={formSettings.emailField}
                onChange={(e) => onToggle('emailField', e.target.checked)}
              />
              <label htmlFor="email-field" className="toggle-label"></label>
            </div>
          </div>
          
          <div className="setting-group">
            <label>Button Text</label>
            <input 
              type="text"
              value={formSettings.buttonText}
              onChange={(e) => onButtonTextChange(e.target.value)}
              className="text-input"
              aria-label="Form button text"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default IntroductionFormSettings;