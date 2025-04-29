import React from 'react';

function MessageList({ messages }) {
  return (
    <>
      {messages.map((msg, index) => (
        <div key={index} className={`chat-message ${msg.type}`}>
          {msg.type === 'bot' && <div className="chat-message-avatar"></div>}
          <div className="chat-message-content">
            <p>{msg.content}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default MessageList;