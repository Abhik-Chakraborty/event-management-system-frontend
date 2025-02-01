import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX } from 'lucide-react';
import '../App.css';

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <ShieldX size={64} className="unauthorized-icon" />
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
        <Link to="/" className="back-home-button">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;