import React from 'react';

function ChatWindow({ children, onClose, headerColor = '#334758' }) {
  return (
    <div className="chat-window">
      <div className="chat-header" style={{ backgroundColor: headerColor }}>
        <div className="chat-header-avatar"></div>
        <div className="chat-header-title">Hubly</div>
        <button className="close-chat" onClick={onClose}>×</button>
      </div>
      {children}
    </div>
  );
}

export default ChatWindow;