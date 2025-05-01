import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TeamTable from '../components/team/TeamTable';
import AddMemberModal from '../components/team/AddMemberModal';
import EditMemberModal from '../components/team/EditMemberModal';
import { useTeamMembers } from '../hooks/useTeamMembers';
import { useCurrentUserInfo } from '../hooks/useCurrentUserInfo';
import '../styles/Dashboard.css';
import '../styles/Team.css';

const Team = () => {
  const { teamMembers, loading: teamLoading, error, fetchTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useTeamMembers();
  const { currentUser, loading: userLoading, isAdmin } = useCurrentUserInfo();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMember, setEditMember] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });

  const handleAddMemberSuccess = () => {
    setShowAddModal(false);
    fetchTeamMembers();
  };

  const handleEditMemberSuccess = () => {
    setShowEditModal(false);
    fetchTeamMembers();
  };

  const openEditModal = (member) => {
    setEditMember({
      id: member._id,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      role: member.role
    });
    setShowEditModal(true);
  };

  const handleDeleteMember = async (memberId) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      try {
        await deleteTeamMember(memberId);
        fetchTeamMembers();
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Team</h1>
        </header>
        
        <div className="team-container">
          <TeamTable 
            teamMembers={teamMembers}
            loading={teamLoading || userLoading}
            error={error}
            currentUser={currentUser}
            isAdmin={isAdmin}
            onEdit={openEditModal}
            onDelete={handleDeleteMember}
          />
          
          {isAdmin() && (
            <div className="team-actions">
              <button className="add-team-btn" onClick={() => setShowAddModal(true)}>
                <span className="add-icon">+</span>
                Add Team members
              </button>
            </div>
          )}
        </div>
      </main>
      
      {showAddModal && (
        <AddMemberModal 
          onClose={() => setShowAddModal(false)}
          onAddMember={addTeamMember}
          onSuccess={handleAddMemberSuccess}
        />
      )}

      {showEditModal && (
        <EditMemberModal 
          member={editMember}
          onClose={() => setShowEditModal(false)}
          onUpdateMember={updateTeamMember}
          onSuccess={handleEditMemberSuccess}
        />
      )}
    </div>
  );
};

export default Team;