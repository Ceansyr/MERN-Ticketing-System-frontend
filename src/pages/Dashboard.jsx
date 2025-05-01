import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '/src/components/layout/Sidebar';
import TicketCard from '../components/dashboard/TicketCard';
import TabButton from '../components/dashboard/TabButton';
import SearchForm from '../components/dashboard/SearchForm';
import { useTicketsList } from '../hooks/useTicketsList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const {
    tickets,
    loading,
    error,
    searchQuery,
    activeTab,
    handleSearch,
    handleSearchSubmit,
    handleTabChange
  } = useTicketsList();
  
  const navigate = useNavigate();
  
  const openTicket = useCallback((ticketId) => {
    navigate(`/contact-center?ticketId=${ticketId}`);
  }, [navigate]);
  
  const renderTicketsList = () => {
    if (loading) {
      return <div className="loading-message">Loading tickets...</div>;
    }
    
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    
    if (tickets.length === 0) {
      return <div className="empty-message">No tickets found</div>;
    }
    
    return tickets.map((ticket) => (
      <TicketCard 
        key={ticket._id} 
        ticket={ticket} 
        onClick={() => openTicket(ticket._id)} 
      />
    ));
  };
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          
          <SearchForm 
            value={searchQuery}
            onChange={handleSearch}
            onSubmit={handleSearchSubmit}
          />
        </header>
        
        <div className="tickets-container">
          <div className="tickets-tabs">
            <TabButton 
              label="All Tickets"
              isActive={activeTab === 'all'}
              icon="all-icon"
              onClick={() => handleTabChange('all')}
            />
            <TabButton 
              label="Resolved"
              isActive={activeTab === 'resolved'}
              onClick={() => handleTabChange('resolved')}
            />
            <TabButton 
              label="Unresolved"
              isActive={activeTab === 'unresolved'}
              onClick={() => handleTabChange('unresolved')}
            />
          </div>
          
          <div className="tickets-list">
            {renderTicketsList()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;