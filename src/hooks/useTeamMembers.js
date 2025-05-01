import { useState, useCallback, useEffect } from 'react';
import { apiRequest } from '../utils/apiUtils';

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invitations, setInvitations] = useState([]);

  const fetchTeamMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest('/team/members');
      setTeamMembers(response.members || []);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to load team members. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTeamMember = useCallback(async (memberData) => {
    try {
      const response = await apiRequest('/team/invite', 'POST', {
        email: memberData.email,
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        role: memberData.designation
      });
      return response;
    } catch (err) {
      console.error('Error inviting team member:', err);
      throw err;
    }
  }, []);

  const updateTeamMember = useCallback(async (memberId, updateData) => {
    try {
      const response = await apiRequest(`/team/members/${memberId}`, 'PUT', updateData);
      return response;
    } catch (err) {
      console.error('Error updating team member:', err);
      throw err;
    }
  }, []);

  const deleteTeamMember = useCallback(async (memberId) => {
    try {
      const response = await apiRequest(`/team/members/${memberId}`, 'DELETE');
      return response;
    } catch (err) {
      console.error('Error deleting team member:', err);
      throw err;
    }
  }, []);
  
  const fetchInvitations = useCallback(async () => {
    try {
      const response = await apiRequest('/team/invitations');
      setInvitations(response.invitations || []);
      return response.invitations;
    } catch (err) {
      console.error('Error fetching invitations:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  return {
    teamMembers,
    loading,
    error,
    invitations,
    fetchTeamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    fetchInvitations
  };
};