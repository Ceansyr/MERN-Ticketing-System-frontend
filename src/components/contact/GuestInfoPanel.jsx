import React, { useState } from 'react';

const GuestInfoPanel = ({ 
  ticket, 
  teamMembers, 
  onAssignTicket, 
  onUpdateStatus 
}) => {
  const [statusChangeMessage, setStatusChangeMessage] = useState('');

  if (!ticket) {
    return (
      <div className="guest-info-panel">
        <div className="no-ticket-selected">
          <p>Select a chat to view guest information</p>
        </div>
      </div>
    );
  }

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    
    // Show confirmation if status is being set to resolved
    if (newStatus === 'resolved' && ticket.status !== 'resolved') {
      if (window.confirm('Are you sure you want to mark this ticket as resolved? It will be removed from the active chats list.')) {
        const success = await onUpdateStatus(newStatus);
        if (success) {
          setStatusChangeMessage('Ticket marked as resolved and removed from active chats.');
          setTimeout(() => setStatusChangeMessage(''), 3000); // Clear message after 3 seconds
        }
      }
    } else {
      onUpdateStatus(newStatus);
    }
  };

  return (
    <div className="guest-info-panel">
      <div className="panel-header">
        <h2>Chat</h2>
      </div>
      
      {statusChangeMessage && (
        <div className="status-message success">
          {statusChangeMessage}
        </div>
      )}
      
      <div className="panel-section">
        <h3>Details</h3>
        <div className="guest-details">
          <div className="detail-item">
            <span className="detail-icon user-icon"></span>
            <input 
              type="text" 
              className="detail-input" 
              value={ticket.guestInfo?.name || 'Joe doe'} 
              readOnly 
            />
          </div>
          <div className="detail-item">
            <span className="detail-icon phone-icon"></span>
            <input 
              type="text" 
              className="detail-input" 
              value={ticket.guestInfo?.phone || '+1 (000) 000-0000'} 
              readOnly 
            />
          </div>
          <div className="detail-item">
            <span className="detail-icon email-icon"></span>
            <input 
              type="text" 
              className="detail-input" 
              value={ticket.guestInfo?.email || 'example@gmail.com'} 
              readOnly 
            />
          </div>
        </div>
      </div>
      
      <div className="panel-section">
        <h3>Teammates</h3>
        <div className="dropdown-container">
          <select 
            onChange={(e) => onAssignTicket(e.target.value)}
            value={ticket.assignee?._id || ''}
            className="modern-dropdown"
          >
            <option value="">Joe doe</option>
            {teamMembers.map(member => (
              <option key={member._id} value={member._id}>
                {member.firstName} {member.lastName}
              </option>
            ))}
          </select>
          <span className="dropdown-arrow"></span>
        </div>
      </div>
      
      <div className="panel-section">
        <h3>Ticket status</h3>
        <div className="dropdown-container">
          <select 
            onChange={handleStatusChange}
            value={ticket.status || 'in_progress'}
            className="modern-dropdown"
          >
            <option value="in_progress">Ticket status</option>
            <option value="resolved">Resolved</option>
            <option value="in_progress">Unresolved</option>
          </select>
          <span className="dropdown-arrow"></span>
        </div>
      </div>
    </div>
  );
};

export default GuestInfoPanel;