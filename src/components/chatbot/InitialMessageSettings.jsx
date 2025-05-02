import React from 'react';

const InitialMessageSettings = ({ initialMessage, onUpdate }) => {
  return (
    <div className="settings-section">
      <h2>Welcome Message</h2>
      
      <div className="setting-group">
        <div className="textarea-container">
          <textarea
            value={initialMessage}
            placeholder="👋 Want to chat about Hubly? I'm an chatbot here to help you find your way."
            onChange={(e) => onUpdate('initialMessage', e.target.value)}
            className="text-input initial-message-input"
            rows="3"
            aria-label="Initial popup message"
          />
          <button 
            className="textarea-edit-icon" 
            aria-label="Edit message"
            onClick={() => document.querySelector('.initial-message-input').focus()}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default InitialMessageSettings;