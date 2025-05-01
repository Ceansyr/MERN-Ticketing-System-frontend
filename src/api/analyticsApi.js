import { apiRequest } from '../utils/apiUtils';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getTicketStats() {
  return apiRequest('/analytics/stats');
}

export async function getTeamPerformance() {
  return apiRequest('/analytics/team-performance');
}

export async function getResolutionTimeStats() {
  return apiRequest('/analytics/resolution-time');
}

export async function getMissedChatsData() {
  return apiRequest('/analytics/missed-chats');
}