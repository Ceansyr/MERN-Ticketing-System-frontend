import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '/src/components/layout/Sidebar';
import '../styles/Dashboard.css';
import '../styles/ContactCenter.css';

import { useTickets } from '../hooks/useTickets';
import { useTeamMembers } from '../hooks/useTeamMembers';
import { useTicketDetails } from '../hooks/useTicketDetails';

import ChatsList from '../components/contact/ChatsList';
import ChatView from '../components/contact/ChatView';
import GuestInfoPanel from '../components/contact/GuestInfoPanel';

const ContactCenter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ticketIdFromUrl = queryParams.get('ticketId');
  
  const { 
    tickets, 
    loading, 
    error, 
    activeTab, 
    searchQuery, 
    setActiveTab, 
    setSearchQuery, 
    fetchTickets 
  } = useTickets();
  
  const { teamMembers } = useTeamMembers();
  
  const { 
    selectedTicket, 
    fetchTicketDetails, 
    sendReply, 
    assignTicket, 
    updateTicketStatus 
  } = useTicketDetails();
  
  useEffect(() => {
    if (ticketIdFromUrl) {
      fetchTicketDetails(ticketIdFromUrl);
    }
  }, [ticketIdFromUrl, fetchTicketDetails]);
  
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
  
  const handleSelectTicket = (ticketId) => {
    fetchTicketDetails(ticketId);
  };
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="contact-center-layout">
        <ChatsList 
          tickets={tickets}
          loading={loading}
          error={error}
          activeTab={activeTab}
          searchQuery={searchQuery}
          selectedTicketId={selectedTicket?._id}
          onTabChange={handleTabChange}
          onSearch={handleSearch}
          onSearchSubmit={handleSearchSubmit}
          onSelectTicket={handleSelectTicket}
        />
        
        <ChatView 
          ticket={selectedTicket}
          onSendReply={sendReply}
        />
        
        <GuestInfoPanel 
          ticket={selectedTicket}
          teamMembers={teamMembers}
          onAssignTicket={assignTicket}
          onUpdateStatus={updateTicketStatus}
        />
      </div>
    </div>
  );
};

export default ContactCenter;