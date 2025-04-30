import React from 'react';

const WelcomeMessages = ({ messages, onUpdate, onAdd, onRemove }) => {
  return (
    <div className="settings-section">
      <h2>Customize Message</h2>
      
      {messages.map((message, index) => (
        <div className="message-input-container" key={index}>
          <input
            type="text"
            id={`message-${index}`}
            value={message}
            onChange={(e) => onUpdate(index, e.target.value)}
            className="message-input"
            aria-label={`Welcome message ${index + 1}`}
          />
          <button 
            className="edit-button"
            onClick={() => document.getElementById(`message-${index}`).focus()}
            aria-label="Edit message"
          >
            <span className="edit-icon"></span>
          </button>
          {messages.length > 1 && (
            <button 
              className="remove-button"
              onClick={() => onRemove(index)}
              aria-label="Remove message"
            >
              <span className="remove-icon">×</span>
            </button>
          )}
        </div>
      ))}
      
      <button 
        className="add-message-button"
        onClick={onAdd}
        aria-label="Add another message"
      >
        + Add Another Message
      </button>
    </div>
  );
};

export default WelcomeMessages;