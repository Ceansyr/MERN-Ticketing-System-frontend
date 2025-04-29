import React from 'react';

const StatusBadge = ({ status }) => {
  return (
    <span className="ticket-status">{status}</span>
  );
};

export default StatusBadge;