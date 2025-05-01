import { useState, useEffect, useCallback } from 'react';
import { getTicketStats, getTeamPerformance, getResolutionTimeStats, getMissedChatsData } from '../api/analyticsApi';

export const useAnalytics = () => {
  const [ticketStats, setTicketStats] = useState(null);
  const [teamPerformance, setTeamPerformance] = useState([]);
  const [resolutionTimeStats, setResolutionTimeStats] = useState(null);
  const [missedChatsData, setMissedChatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [stats, performance, resolutionTime, missedChats] = await Promise.all([
        getTicketStats(),
        getTeamPerformance(),
        getResolutionTimeStats(),
        getMissedChatsData()
      ]);
      
      setTicketStats(stats);
      setTeamPerformance(performance);
      setResolutionTimeStats(resolutionTime);
      setMissedChatsData(missedChats);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError(err.message || 'Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  return {
    ticketStats,
    teamPerformance,
    resolutionTimeStats,
    missedChatsData,
    loading,
    error,
    refreshData: fetchAnalyticsData
  };
};