import React from 'react';
import { getTicketDuration } from '../../utils/dateUtils';

const TicketCard = ({ ticket, onClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="ticket-card" onClick={onClick}>
      <div className="ticket-section">
        <div className="ticket-avatar"></div>
        <div className="ticket-info">
          <div className="ticket-header">
            <h3>{ticket.ticketId}</h3>
            <span className="ticket-time">Posted at {formatDate(ticket.createdAt)}</span>
          </div>
          <div className="ticket-body">
            <p className="ticket-title">{ticket.title}</p>
            <div className="ticket-duration">
              {getTicketDuration(ticket.createdAt)}
            </div>
          </div>
        </div>
      </div>
      <div className="ticket-user">
        <div className="user-info">
          <h4>{ticket.reporter?.firstName} {ticket.reporter?.lastName}</h4>
          <p>{ticket.reporter?.email}</p>
        </div>
        <button className="open-ticket-btn">Open Ticket</button>
      </div>
    </div>
  );
};

export default TicketCard;