import React from 'react';

const GuestInfoPanel = ({ 
  ticket, 
  teamMembers, 
  onAssignTicket, 
  onUpdateStatus 
}) => {
  if (!ticket) {
    return (
      <div className="guest-info-panel">
        <div className="no-ticket-selected">
          <p>Select a chat to view guest information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="guest-info-panel">
      <div className="panel-section">
        <h3>Details</h3>
        <div className="guest-details">
          <div className="detail-item">
            <span className="detail-icon user-icon"></span>
            <span className="detail-text">{ticket.guestInfo?.name || 'Guest User'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon phone-icon"></span>
            <span className="detail-text">{ticket.guestInfo?.phone || 'No phone provided'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon email-icon"></span>
            <span className="detail-text">{ticket.guestInfo?.email || 'No email provided'}</span>
          </div>
        </div>
      </div>
      
      <div className="panel-section">
        <h3>Teammates</h3>
        <div className="team-members-dropdown">
          <select 
            onChange={(e) => onAssignTicket(e.target.value)}
            value={ticket.assignee?._id || ''}
          >
            <option value="">Assign to team member</option>
            {teamMembers.map(member => (
              <option key={member._id} value={member._id}>
                {member.firstName} {member.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="panel-section">
        <h3>Ticket status</h3>
        <div className="status-options">
          <button 
            className={`status-btn ${ticket.status === 'resolved' ? 'active' : ''}`}
            onClick={() => onUpdateStatus('resolved')}
          >
            Resolved
          </button>
          <button 
            className={`status-btn ${ticket.status !== 'resolved' ? 'active' : ''}`}
            onClick={() => onUpdateStatus('in_progress')}
          >
            Unresolved
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestInfoPanel;