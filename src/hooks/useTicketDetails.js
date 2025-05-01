import { useState, useCallback } from 'react';
import { apiRequest } from '../utils/apiUtils';

export const useTicketDetails = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTicketDetails = useCallback(async (ticketId) => {
    if (!ticketId) return;
    
    setLoading(true);
    try {
      const ticketData = await apiRequest(`/tickets/${ticketId}`);
      
      const messages = await apiRequest(`/tickets/${ticketId}/messages`);
      
      setSelectedTicket({
        ...ticketData,
        messages: messages || []
      });
    } catch (err) {
      console.error('Error fetching ticket details:', err);
      setError('Failed to load ticket details.');
    } finally {
      setLoading(false);
    }
  }, []);

  const sendReply = useCallback(async (message) => {
    if (!message.trim() || !selectedTicket) return false;
    
    try {
      await apiRequest(`/tickets/${selectedTicket._id}/reply`, 'POST', {
        message
      });
      
      await fetchTicketDetails(selectedTicket._id);
      return true;
    } catch (err) {
      console.error('Error sending reply:', err);
      setError('Failed to send reply.');
      return false;
    }
  }, [selectedTicket, fetchTicketDetails]);

  const assignTicket = useCallback(async (assigneeId) => {
    if (!selectedTicket) return false;
    
    try {
      await apiRequest(`/tickets/${selectedTicket._id}/assign`, 'POST', {
        assigneeId
      });
      
      await fetchTicketDetails(selectedTicket._id);
      return true;
    } catch (err) {
      console.error('Error assigning ticket:', err);
      setError('Failed to assign ticket.');
      return false;
    }
  }, [selectedTicket, fetchTicketDetails]);

  const updateTicketStatus = useCallback(async (status) => {
    if (!selectedTicket) return false;
    
    try {
      await apiRequest(`/tickets/${selectedTicket._id}/status`, 'PUT', {
        status
      });
      
      await fetchTicketDetails(selectedTicket._id);
      return true;
    } catch (err) {
      console.error('Error updating ticket status:', err);
      setError('Failed to update ticket status.');
      return false;
    }
  }, [selectedTicket, fetchTicketDetails]);

  return {
    selectedTicket,
    loading,
    error,
    fetchTicketDetails,
    sendReply,
    assignTicket,
    updateTicketStatus
  };
};