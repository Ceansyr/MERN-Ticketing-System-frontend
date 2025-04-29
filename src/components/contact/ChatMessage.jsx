import React from 'react';
import { formatDate } from '../../utils/formatUtils';

const ChatMessage = ({ message, guestInfo }) => {
  return (
    <div className={`chat-message ${message.isGuest ? 'guest' : 'admin'}`}>
      <div className="message-avatar"></div>
      <div className="message-content">
        <div className="message-header">
          <span className="message-sender">
            {message.isGuest ? guestInfo?.name : message.sender?.firstName}
          </span>
          <span className="message-time">{formatDate(message.timestamp)}</span>
        </div>
        <p className="message-text">{message.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;