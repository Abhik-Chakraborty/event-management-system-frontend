import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, rsvpEvent, deleteEvent } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../App.css'

const EventList = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleRSVP = async (eventId) => {
    if (!user) {
      alert('Please log in to RSVP');
      return;
    }
    await rsvpEvent(eventId);
    alert('RSVP Successful');
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      alert('Failed to delete event');
    }
  };

  return (
    <div>
      <h1>Upcoming Events</h1>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Attendees</th>
            <th>Actions</th>
          </tr>
        </thead>



        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.time}</td>
              <td>{event.attendees.length}</td>
              <td>
                {user && user.role === 'admin' && (
                  <Link to={`/events/${event._id}/attendees`}>
                    <button>View Attendees</button>
                  </Link>
                )}
                {user && <button onClick={() => handleRSVP(event._id)}>RSVP</button>}
                {isAdmin && (
                  <button onClick={() => handleDelete(event._id)}>Delete Event</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
