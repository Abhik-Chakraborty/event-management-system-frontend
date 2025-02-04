import axios from 'axios';
// 'http://localhost:3001/api';
const API_URL = process.env.REACT_APP_API_URL ;

export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/api/events`);
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/api/events/${id}`);
  return response.data;
};

export const rsvpEvent = async (eventId) => {
  const token = localStorage.getItem('token');
  await axios.post(`${API_URL}/api/events/${eventId}/rsvp`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
  return response.data;
};

export const registerUser = async (name, email, password, isAdmin) => {
  console.log('api isAdmin:', isAdmin);

  const endpoint = isAdmin ? '/api/admin/register' : '/api/users/register';
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/api/events`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteEvent = async (eventId) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/api/events/${eventId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getEventAttendees = async (eventId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/events/${eventId}/attendees`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const sendEventReminder = async (eventId) => {
  const token = localStorage.getItem('token'); 

  const response = await axios.post(`${API_URL}/api/events/${eventId}/remind`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
