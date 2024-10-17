import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  //login function 
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setUser(data.user);

    if (data.user.reminder) {
      alert('Reminder: You have an upcoming event. Check your events.');
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    navigate('/');
  };
  // Register function
  const register = async (name, email, password) => {
    try {
      const data = await registerUser(name, email, password); // Call the backend API to register the user
      setUser(data.user); // Set the registered user in the context
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate('/'); // Navigate to the home page or dashboard after registration
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  // logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
