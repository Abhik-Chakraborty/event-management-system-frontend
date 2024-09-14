import React, { useEffect, useState } from 'react';
import { getEventAttendees, sendEventReminder } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const Attendees = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [attendees, setAttendees] = useState([]);
    const [message, setMessage] = useState('');


    useEffect(() => {
        const fetchAttendees = async () => {
            try {
                const data = await getEventAttendees(id);
                setAttendees(data);
            } catch (err) {
                console.error('Error fetching attendees:', err);
            }
        };

        fetchAttendees();
    }, [id, user.token]);

    const handleSendReminder = async () => {
        try {
            await sendEventReminder(id);
            setMessage('Reminder sent successfully to all attendees!');
        } catch (error) {
            console.error('Failed to send reminder', error);
            setMessage('Failed to send reminder. Please try again.');
        }
    }

    return (
        <div>
            <h2>Attendees List</h2>
            {attendees.length === 0 ? (
                <p>No attendees yet.</p>
            ) : (
                <ul>
                    {attendees.map((attendee) => (
                        <li key={attendee._id}>
                            <p><strong>Name:</strong> {attendee.name}</p>
                            <p><strong>Email:</strong> {attendee.email}</p>
                        </li>
                    ))}
                    {user && user.role === 'admin' && (
                        <div>
                            <button onClick={handleSendReminder}>Send Reminder to Attendees</button>
                            {message && <p>{message}</p>}
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Attendees;
