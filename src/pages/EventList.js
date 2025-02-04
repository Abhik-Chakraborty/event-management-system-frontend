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
  const [userRSVPs, setUserRSVPs] = useState(new Set());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
        // Create a set of event IDs the user has RSVP'd to
        if (user) {
          const userRSVPSet = new Set(
            data.filter(event => 
              event.attendees.some(attendee => attendee._id === user.id)
            ).map(event => event._id)
          );
          setUserRSVPs(userRSVPSet);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [user]);

  const handleRSVP = async (eventId) => {
    if (!user) {
      alert('Please log in to RSVP');
      return;
    }

    if (userRSVPs.has(eventId)) {
      alert("You're already registered for this event!");
      return;
    }

    try {
      await rsvpEvent(eventId);
      setUserRSVPs(prev => new Set([...prev, eventId]));
      // Update attendee count in events state
      setEvents(events.map(event => 
        event._id === eventId 
          ? { ...event, attendees: [...event.attendees, user] }
          : event
      ));
      alert('RSVP Successful!');
    } catch (err) {
      alert('Failed to RSVP');
    }
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
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2" />
                    <span>{event.attendees.length} attending</span>
                  </div>
                </div>

                <div className="event-actions">
                  <button
                    onClick={() => handleRSVP(event._id)}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      userRSVPs.has(event._id)
                        ? 'bg-green-500 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white transition-colors duration-300`}
                    disabled={userRSVPs.has(event._id)}
                  >
                    <Check size={16} className="mr-2" />
                    {userRSVPs.has(event._id) ? "You're Going!" : "I'm Interested"}
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