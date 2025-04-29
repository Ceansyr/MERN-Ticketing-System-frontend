import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import { formatDateLong } from '../../utils/formatUtils';

const ChatView = ({ ticket, onSendReply }) => {
  const [replyMessage, setReplyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleReplyChange = (e) => {
    setReplyMessage(e.target.value);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !ticket) return;
    
    setIsSending(true);
    
    try {
      // Use the callback from the parent component
      const success = await onSendReply(replyMessage);
      
      if (success) {
        // Clear the input field after successful send
        setReplyMessage('');
      }
    } catch (error) {
      console.error('Failed to send reply:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (!ticket) {
    return (
      <div className="chat-view">
        <div className="no-chat-selected">
          <p>Select a chat to view the conversation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-view">
      <header className="chat-view-header">
        <h2>{ticket.ticketId}</h2>
        <div className="dashboard-logo"></div>
      </header>
      
      <div className="chat-content">
        <div className="chat-date-indicator">
          <span>{formatDateLong(ticket.createdAt)}</span>
        </div>
        
        <div className="chat-messages">
          {ticket.messages?.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message} 
              guestInfo={ticket.guestInfo} 
            />
          )) || (
            <div className="initial-message">
              <p>{ticket.description}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="chat-reply">
        <textarea 
          placeholder="Type here"
          value={replyMessage}
          onChange={handleReplyChange}
          className="reply-input"
          disabled={isSending}
        ></textarea>

        <div 
          className={`send-icon ${isSending ? 'sending' : ''}`} 
          onClick={!isSending ? handleSendReply : undefined}
        ></div>
      </div>
    </div>
  );
};

export default ChatView;