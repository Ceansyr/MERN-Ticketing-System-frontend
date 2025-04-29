import { useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useChatbot() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ticketCreated, setTicketCreated] = useState(false);

  const createGuestUser = useCallback(async (userInfo) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/chatbot/guest`, userInfo);
      localStorage.setItem('guestToken', response.data.token);
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: `Thanks ${userInfo.name}! How can I help you today?`
      }]);
      
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error creating guest user:', err);
      setError('Failed to process your information');
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Sorry, there was an error processing your information. Please try again.'
      }]);
      setLoading(false);
      return false;
    }
  }, []);

  const createTicket = useCallback(async (message, contactInfo) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('guestToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      // Modify the request payload to match what the backend expects
      await axios.post(`${API_URL}/chatbot/guest/ticket`, {
        title: `Support Request from ${contactInfo.name}`,
        description: message,
        contactInfo
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Thank you for your message! We have created a support ticket and our team will get back to you soon.'
      }]);
      
      setTicketCreated(true);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError('Failed to process your message');
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Sorry, there was an error processing your message. Please try again.'
      }]);
      setLoading(false);
      return false;
    }
  }, []);

  const addUserMessage = useCallback((content) => {
    setMessages(prev => [...prev, { type: 'user', content }]);
  }, []);

  return {
    messages,
    loading,
    error,
    ticketCreated,
    createGuestUser,
    createTicket,
    addUserMessage
  };
}