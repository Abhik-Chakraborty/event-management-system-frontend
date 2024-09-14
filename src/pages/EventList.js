import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, rsvpEvent, deleteEvent  } from '../services/api';
import { useAuth } from '../context/AuthContext';

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
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            <p>Attendees: {event.attendees.length}</p>
            {user.role === 'admin' && (
              <Link to={`/events/${event._id}/attendees`}>
                <button>View Attendees</button>
              </Link>
            )}
            {user && <button onClick={() => handleRSVP(event._id)}>RSVP</button>}
            {isAdmin && (
              <button onClick={() => handleDelete(event._id)}>Delete Event</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
