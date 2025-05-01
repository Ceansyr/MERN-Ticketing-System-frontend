import React from 'react';

const TeamMemberRow = ({ member, isCurrentUser, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="team-row">
      <div className="team-column full-name">
        <div className="member-avatar"></div>
        <span>{member.firstName} {member.lastName}</span>
      </div>
      <div className="team-column phone">{member.phone || '+1 (000) 000-0000'}</div>
      <div className="team-column email">{member.email}</div>
      <div className="team-column role">{member.role}</div>
      <div className="team-column actions">
        {isAdmin() && !isCurrentUser && (
          <div className="action-buttons">
            <button className="edit-btn" onClick={() => onEdit(member)}>
              <span className="edit-icon">✏️</span>
            </button>
            <button className="delete-btn" onClick={() => onDelete(member._id)}>
              <span className="delete-icon">🗑️</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMemberRow;