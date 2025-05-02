export const apiRequest = async (url, method = 'GET', body = null) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const options = {
    method,
    headers,
    credentials: "include",
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(body);
  }

  // Ensure we don't have double slashes in the URL
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const apiUrl = baseUrl.endsWith('/') && url.startsWith('/') 
    ? `${baseUrl}${url.substring(1)}` 
    : `${baseUrl}${url}`;

  try {
    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request error (${method} ${url}):`, error);
    throw error;
  }
};

export const fetchEvents = async () => {
  return apiRequest('/events');
};

export const toggleEvent = async (eventId, currentState) => {
  return apiRequest(`/events/${eventId}/toggle`, 'PUT', { isActive: !currentState });
};

export const deleteEvent = async (eventId) => {
  return apiRequest(`/events/${eventId}`, 'DELETE');
};