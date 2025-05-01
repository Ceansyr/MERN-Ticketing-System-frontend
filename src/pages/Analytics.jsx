import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import MissedChatsChart from '../components/analytics/MissedChatsChart';
import AverageReplyTime from '../components/analytics/AverageReplyTime';
import ResolvedTicketsChart from '../components/analytics/ResolvedTicketsChart';
import TotalChats from '../components/analytics/TotalChats';
import { useAnalytics } from '../hooks/useAnalytics';
import '../styles/Dashboard.css';
import '../styles/Analytics.css';

const Analytics = () => {
  const {
    ticketStats,
    resolutionTimeStats,
    missedChatsData,
    loading,
    error
  } = useAnalytics();
  
  const renderContent = () => {
    if (loading) {
      return <div className="loading-message">Loading analytics data...</div>;
    }
    
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    
    return (
      <div className="analytics-grid">
        <MissedChatsChart data={missedChatsData} />
        <AverageReplyTime time={resolutionTimeStats?.averageResolutionTime || 0} />
        <ResolvedTicketsChart 
          resolved={ticketStats?.resolvedTickets || 0} 
          total={ticketStats?.totalTickets || 0} 
        />
        <TotalChats count={ticketStats?.totalTickets || 0} />
      </div>
    );
  };
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Analytics</h1>
        </header>
        
        {renderContent()}
      </main>
    </div>
  );
};

export default Analytics;