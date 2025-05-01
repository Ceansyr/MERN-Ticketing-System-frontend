import { useState, useCallback, useEffect } from 'react';
import { apiRequest } from '../utils/apiUtils';

export const useTickets = (initialTab = 'all', initialQuery = '') => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/tickets?source=chat_widget';
      
      if (activeTab === 'resolved') {
        url += '&status=resolved,closed';
      } else if (activeTab === 'unresolved') {
        url += '&status=backlog,staged,in_progress,in_review,blocked';
      } else {
        url += '&status=backlog,staged,in_progress,in_review,blocked';
      }
      
      if (searchQuery) {
        url += `&query=${encodeURIComponent(searchQuery)}`;
      }
      
      const response = await apiRequest(url);
      setTickets(response.tickets || []);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to load tickets. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchQuery]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return {
    tickets,
    loading,
    error,
    activeTab,
    searchQuery,
    setActiveTab,
    setSearchQuery,
    fetchTickets
  };
};