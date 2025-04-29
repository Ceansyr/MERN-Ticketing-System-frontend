import { useState, useCallback, useEffect } from 'react';
import { apiRequest } from '../utils/apiUtils';

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeamMembers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiRequest('/users/team');
      setTeamMembers(response.users || []);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to load team members.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  return { teamMembers, loading, error, fetchTeamMembers };
};