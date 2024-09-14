import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await getEventById(id);
      setEvent(data);
    };
    fetchEvent();
  }, [id]);

  return event ? (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.location}</p>
      <p>Attendees: {event.attendees.length}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EventDetail;
