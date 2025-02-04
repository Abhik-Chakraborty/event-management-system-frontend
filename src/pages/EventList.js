import React, { useState, useEffect } from 'react';
import { getEvents, rsvpEvent, deleteEvent } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Clock, Users, Trash2, Check, Loader } from 'lucide-react';
import '../App.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRSVP = async (eventId) => {
    if (!user) {
      alert('Please log in to Reserve your spot');
      return;
    }
    await rsvpEvent(eventId);
    alert('Reservation Confirmed');
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      alert('Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="event-loading">
        <Loader className="animate-spin" size={32} />
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="event-list-container">
      <div className="event-list-header">
        <h1>Upcoming Events</h1>
        <p className="event-subtitle">Discover and join amazing events</p>
      </div>

      {events.length === 0 ? (
        <div className="no-events">
          <Calendar size={48} />
          <p>No events found</p>
          <span>Check back later for upcoming events</span>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              {event.image && (
                <div className="event-image-container">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="event-image"
                  />
                </div>
              )}
              <div className="event-content">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-description">{event.description}</p>
                
                <div className="event-details">
                  <div className="event-detail">
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="event-detail">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="event-detail">
                    <Users size={16} />
                    <span>{event.capacity} spots available</span>
                  </div>
                </div>

                <div className="event-actions">
                  <button
                    onClick={() => handleRSVP(event._id)}
                    className="rsvp-button"
                  >
                    <Check size={16} />
                    I'm Interested
                  </button>
                  
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="delete-button"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;