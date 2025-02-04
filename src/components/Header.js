import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <header>
      <nav>
        <div className="nav-left">
          <Link className="button-link" to="/">Events</Link>
          {user && <Link className="button-link" to="/create-event">Create Event</Link>}
        </div>
        
        <div className="nav-right">
          {user ? (
            <div className="user-menu">
              <span className="welcome-text">Welcome, {user.name}</span>
              <button onClick={logout} className="logout-button">Logout</button>
            </div>
          ) : (
            <div className="auth-nav">
              {isLoginPage ? (
                <Link className="button-link" to="/register">Register</Link>
              ) : isRegisterPage ? (
                <Link className="button-link" to="/login">Login</Link>
              ) : (
                <>
                  <Link className="button-link" to="/login">Login</Link>
                  <Link className="button-link" to="/register">Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;