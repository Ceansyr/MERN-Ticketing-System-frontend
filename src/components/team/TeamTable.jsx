import React from 'react';
import TeamMemberRow from './TeamMemberRow';
import { sortTeamMembers } from '../../utils/teamUtils';

const TeamTable = ({ teamMembers, loading, error, currentUser, isAdmin, onEdit, onDelete }) => {
  const sortedTeamMembers = sortTeamMembers(teamMembers);

  if (loading) {
    return <div className="loading-message">Loading team members...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (sortedTeamMembers.length === 0) {
    return <div className="empty-message">No team members found</div>;
  }

  return (
    <div className="team-table">
      <div className="team-header">
        <div className="team-column full-name">Full Name</div>
        <div className="team-column phone">Phone</div>
        <div className="team-column email">Email</div>
        <div className="team-column role">Role</div>
        <div className="team-column actions"></div>
      </div>
      
      {sortedTeamMembers.map((member) => (
        <TeamMemberRow 
          key={member._id}
          member={member}
          isCurrentUser={currentUser && member._id === currentUser._id}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TeamTable;