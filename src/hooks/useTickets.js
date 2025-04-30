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
      // By default, only show active tickets in the chat list
      let url = '/tickets?source=chat_widget';
      
      // Add filter based on active tab
      if (activeTab === 'resolved') {
        url += '&status=resolved,closed';
      } else if (activeTab === 'unresolved') {
        url += '&status=backlog,staged,in_progress,in_review,blocked';
      } else {
        // For 'all' tab, still exclude resolved tickets by default
        url += '&status=backlog,staged,in_progress,in_review,blocked';
      }
      
      // Add search query if present
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