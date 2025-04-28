import { authenticatedRequest } from "../utils/httpUtils.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function sendMessage(message) {
  return authenticatedRequest(
    `${API_URL}/chatbot/message`,
    'POST',
    { message }
  );
}

export async function createTicketFromChat(ticketData) {
  return authenticatedRequest(
    `${API_URL}/chatbot/ticket`,
    'POST',
    ticketData
  );
}