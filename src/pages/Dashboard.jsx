import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '/src/components/layout/Sidebar';
import '../styles/Dashboard.css';
import { apiRequest } from '../utils/apiUtils';
import { getTicketDuration } from '../utils/dateUtils';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Use useCallback to memoize the fetchTickets function
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/tickets';
      
      // Add filter based on active tab
      if (activeTab === 'resolved') {
        url += '?status=resolved,closed';
      } else if (activeTab === 'unresolved') {
        url += '?status=backlog,staged,in_progress,in_review,blocked';
      }
      
      // Add search query if present
      if (searchQuery) {
        const separator = url.includes('?') ? '&' : '?';
        url += `${separator}query=${encodeURIComponent(searchQuery)}`;
      }
      
      const response = await apiRequest(url);
      setTickets(response.tickets || []);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to load tickets. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchQuery]); // Add dependencies here
  
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]); // Now fetchTickets is a dependency
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTickets();
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const openTicket = (ticketId) => {
    navigate(`/ticket/${ticketId}`);
  };
  
  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="🔍 Search for ticket"
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <span className="search-icon"></span>
            <button type="submit" style={{ display: 'none' }}></button>
          </form>
        </header>
        
        <div className="tickets-container">
          <div className="tickets-tabs">
            <button 
              className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => handleTabChange('all')}
            >
              <span className="tab-icon all-icon"></span>
              All Tickets
            </button>
            <button 
              className={`tab-button ${activeTab === 'resolved' ? 'active' : ''}`}
              onClick={() => handleTabChange('resolved')}
            >
              Resolved
            </button>
            <button 
              className={`tab-button ${activeTab === 'unresolved' ? 'active' : ''}`}
              onClick={() => handleTabChange('unresolved')}
            >
              Unresolved
            </button>
          </div>
          
          <div className="tickets-list">
            {loading ? (
              <div className="loading-message">Loading tickets...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : tickets.length === 0 ? (
              <div className="empty-message">No tickets found</div>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket._id} className="ticket-card" onClick={() => openTicket(ticket._id)}>
                  <div className="ticket-section">
                    <div className="ticket-avatar"></div>
                    <div className="ticket-info">
                      <div className="ticket-header">
                        <h3>{ticket.ticketId}</h3>
                        <span className="ticket-time">Posted at {formatDate(ticket.createdAt)}</span>
                      </div>
                      <div className="ticket-body">
                        <p className="ticket-title">{ticket.title}</p>
                        <div className="ticket-duration">
                          {getTicketDuration(ticket.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ticket-user">
                    <div className="user-info">
                      <h4>{ticket.reporter?.firstName} {ticket.reporter?.lastName}</h4>
                      <p>{ticket.reporter?.email}</p>
                    </div>
                    <button className="open-ticket-btn">Open Ticket</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;