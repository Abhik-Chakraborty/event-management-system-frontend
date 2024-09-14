import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, rsvpEvent } from '../services/api';
import { useAuth } from '../context/AuthContext';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

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

  return (
    <div>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <Link to={`/events/${event._id}`}>View Details</Link>
            {user && <button onClick={() => handleRSVP(event._id)}>RSVP</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
