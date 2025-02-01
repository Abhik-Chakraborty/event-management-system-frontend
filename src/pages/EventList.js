import React, { useState, useEffect } from 'react';
import { getEvents, rsvpEvent, deleteEvent } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Clock, Users, Trash2, Check } from 'lucide-react';

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Upcoming Events</h1>
      {events.length === 0 ? (
        <div className="text-center text-gray-600">No events found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {event.image && (
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">{event.title}</h2>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2" />
                    <span>{event.capacity} spots available</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleRSVP(event._id)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Check size={16} className="mr-2" />
                    RSVP
                  </button>
                  
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                    >
                      <Trash2 size={16} className="mr-2" />
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
