import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../api/userApi';

export const useCurrentUserInfo = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error fetching current user:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const isAdmin = useCallback(() => {
    return currentUser && currentUser.role === 'admin';
  }, [currentUser]);

  return { currentUser, loading, error, fetchUser, isAdmin };
};