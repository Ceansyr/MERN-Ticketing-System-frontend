import React from 'react';

const ChatsList = ({ 
  tickets, 
  loading, 
  error, 
  selectedTicketId,
  onSelectTicket 
}) => {
  return (
    <div className="chats-section">
      <header className="section-header">
        <h2>Contact Center</h2>
      </header>
      
      <div className="chats-header">
        <h3>Chats</h3>
      </div>
      
      <div className="chats-list">
        {loading ? (
          <div className="loading-message">Loading chats...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : tickets.length === 0 ? (
          <div className="empty-message">No chats found</div>
        ) : (
          tickets.map((ticket) => (
            <div 
              key={ticket._id} 
              className={`chat-card ${selectedTicketId === ticket._id ? 'active' : ''}`}
              onClick={() => onSelectTicket(ticket._id)}
            >
              <div className="chat-avatar">
                <span className="avatar-text">{ticket.guestInfo?.name?.charAt(0) || 'G'}</span>
              </div>
              <div className="chat-info">
                <div className="chat-header">
                  <h3>Chat {ticket._id?.slice(-1) || '1'}</h3>
                </div>
                <p className="chat-preview">{ticket.title || 'I have a question'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatsList;