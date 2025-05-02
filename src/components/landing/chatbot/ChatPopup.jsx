import React from 'react';

function ChatPopup({ onClose, initialMessage }) {
  return (
    <div className="chat-popup">
      <div className="chat-popup-content">
        <button className="close-popup" onClick={onClose}>×</button>
        <div className="chat-popup-avatar"></div>
        <p className="chat-popup-message">
          {initialMessage || <><span role="img" aria-label="wave">👋</span> Want to chat about Hubly? I'm an chatbot here to help you find your way.</>}
        </p>
      </div>
    </div>
  );
}

export default ChatPopup;