import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api';
import { Calendar, Clock, MapPin, Type, FileText, AlertCircle, Sparkles } from 'lucide-react';
import '../App.css';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent({ title, description, date, time, location });
      navigate('/');
    } catch (err) {
      setError('Failed to create event');
    }
  };

  return (
    <div className="create-event-container">
      <div className="create-event-card">
        <div className="create-event-header">
          <Sparkles className="create-event-icon" size={28} />
          <h1>Create New Event</h1>
          <p>Fill in the details to create your amazing event</p>
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="create-event-form">
          <div className="create-event-grid">
            <div className="form-group full-width">
              <label htmlFor="title">
                <Type size={16} />
                Event Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">
                <FileText size={16} />
                Event Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
                className="min-h-[120px] resize-y"
                required
              />
            </div>

            <div className="form-group date-time-group">
              <label htmlFor="date">
                <Calendar size={16} />
                Event Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group date-time-group">
              <label htmlFor="time">
                <Clock size={16} />
                Event Time
              </label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="location">
                <MapPin size={16} />
                Event Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter event location"
                required
              />
            </div>
          </div>

          <button type="submit" className="create-event-button">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;