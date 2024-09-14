import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return response.data;
};

export const rsvpEvent = async (eventId) => {
  const token = localStorage.getItem('token');
  await axios.post(`${API_URL}/events/${eventId}/rsvp`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const signupUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
  return response.data;
};
