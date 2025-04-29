import React from 'react';

function MessageInput({ value, onChange, onKeyPress, onSend, disabled }) {
  return (
    <div className="chat-input">
      <input 
        type="text" 
        placeholder="Write a message" 
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
      />
      <button 
        className="send-button" 
        onClick={onSend}
        disabled={disabled}
      >
        <span className="send-icon"></span>
      </button>
    </div>
  );
}

export default MessageInput;