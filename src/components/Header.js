import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';
import { Info, Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  
  const [showInfo, setShowInfo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Hamburger Menu for Mobile */}
        <div className="hamburger-menu">
          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger-button">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          
          {menuOpen && (
            <div className="hamburger-dropdown">
              <Link className="button-link" to="/" onClick={() => setMenuOpen(false)}>Events</Link>
              <button onClick={() => setShowInfo(true)} className="button-link">Info</button>
              <Link className="button-link" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link className="button-link" to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          )}
        </div>

        {/* Info Modal */}
        {showInfo && (
          <div className="info-modal-backdrop" onClick={() => setShowInfo(false)}>
            <div className="info-modal" onClick={e => e.stopPropagation()}>
              <h2>Welcome</h2>
              <p>This is an Event Management Application made by Abhik Chakraborty{' '}
                <a href="https://abhik-17-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer">
                  ➡️Click Me⬅️
                </a>
              </p>
              
              <div className="admin-info">
                <h3>Admin Access:</h3>
                <p>
                  To access Admin features, please contact me by clicking here  {' '}
                  <a href="https://abhik-17-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer">
                     ➡️Click Me⬅️
                  </a>.
                </p>
              </div>

              <p>I am always open to feedback. Let me know how I can improve this application.</p>

              <div className="repo-links">
                <p>To know more about this application, visit my GitHub repos:</p>
                <a href="https://github.com/Abhik-Chakraborty/event-management-system-frontend" target="_blank" rel="noopener noreferrer">
                  Frontend Repository
                </a>
                <a href="https://github.com/Abhik-Chakraborty/event-management-backend" target="_blank" rel="noopener noreferrer">
                  Backend Repository
                </a>
              </div>

              <button className="close-modal" onClick={() => setShowInfo(false)}>Close</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
