import React from 'react';

const PreviewPanel = ({ settings, previewMode, setPreviewMode }) => {
  return (
    <div className="preview-panel">
      <div className="preview-controls">
        <button 
          className={`preview-mode-button ${previewMode === 'desktop' ? 'active' : ''}`}
          onClick={() => setPreviewMode('desktop')}
          aria-label="Desktop preview"
        >
          Desktop
        </button>
        <button 
          className={`preview-mode-button ${previewMode === 'mobile' ? 'active' : ''}`}
          onClick={() => setPreviewMode('mobile')}
          aria-label="Mobile preview"
        >
          Mobile
        </button>
      </div>
      
      <div className={`chatbot-preview-container ${previewMode}`}>
        <div className="chatbot-preview">
          <div className="chatbot-preview-header" style={{ backgroundColor: settings.headerColor }}>
            <div className="chatbot-preview-avatar"></div>
            <div className="chatbot-preview-title" style={{ color: settings.headerColor === '#000000' ? '#FFFFFF' : '#000000' }}>Hubly</div>
            <button className="chatbot-preview-close" aria-label="Close preview">×</button>
          </div>
          
          <div className="chatbot-preview-body" style={{ backgroundColor: settings.backgroundColor }}>
            {settings.introductionForm.enabled ? (
              <div className="chatbot-form-preview">
                <h3>Introduction Yourself</h3>
                {settings.introductionForm.nameField && (
                  <div className="chatbot-form-field">
                    <label>Your name</label>
                    <input type="text" placeholder="Your name" readOnly />
                  </div>
                )}
                {settings.introductionForm.phoneField && (
                  <div className="chatbot-form-field">
                    <label>Your Phone</label>
                    <input type="text" placeholder="+1 (000) 000-0000" readOnly />
                  </div>
                )}
                {settings.introductionForm.emailField && (
                  <div className="chatbot-form-field">
                    <label>Your Email</label>
                    <input type="text" placeholder="example@gmail.com" readOnly />
                  </div>
                )}
                <button className="chatbot-form-button">{settings.introductionForm.buttonText}</button>
              </div>
            ) : (
              <div className="chatbot-messages-preview">
                <div className="chatbot-message-preview bot">
                  <div className="chatbot-message-avatar"></div>
                  <div className="chatbot-message-content">
                    <p>{settings.welcomeMessages[0] || 'How can I help you?'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;