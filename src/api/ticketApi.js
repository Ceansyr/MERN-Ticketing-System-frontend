const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const sendReply = async (ticketId, message) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send reply');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending reply:', error);
    throw error;
  }
};