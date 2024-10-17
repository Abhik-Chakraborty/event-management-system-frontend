import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css'

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <nav>
        <Link className="button-link" to="/">Events</Link>
        {user && <Link className="button-link" to="/create-event">Create Event</Link>}
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
          <Link className="button-link" to="/login">Login</Link>
          <Link className="button-link" to="/register">Register</Link>
          </>
          
        )}
      </nav>
    </header>
  );
};

export default Header;
