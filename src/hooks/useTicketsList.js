import { useState, useCallback, useEffect } from 'react';
import { apiRequest } from '../utils/apiUtils';

export const useTicketsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buildTicketsUrl = useCallback(() => {
    let url = '/tickets';
    
    if (activeTab === 'resolved') {
      url += '?status=resolved,closed';
    } else if (activeTab === 'unresolved') {
      url += '?status=backlog,staged,in_progress,in_review,blocked';
    } else {
      url += '?status=backlog,staged,in_progress,in_review,blocked,resolved,closed';
    }
    
    if (searchQuery) {
      const separator = url.includes('?') ? '&' : '?';
      url += `${separator}query=${encodeURIComponent(searchQuery)}`;
    }
    
    return url;
  }, [activeTab, searchQuery]);
  
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const url = buildTicketsUrl();
      const response = await apiRequest(url);
      setTickets(response.tickets || []);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to load tickets. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [buildTicketsUrl]);
  
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);
  
  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    fetchTickets();
  }, [fetchTickets]);
  
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return {
    tickets,
    loading,
    error,
    searchQuery,
    activeTab,
    handleSearch,
    handleSearchSubmit,
    handleTabChange,
    fetchTickets
  };
};