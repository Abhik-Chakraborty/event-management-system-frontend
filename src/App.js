import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import CreateEvent from './pages/CreateEvent';
import Unauthorized from './pages/Unauthorized';
import Attendees from './components/Attendees';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<PrivateRoute><EventList /></PrivateRoute>} />
          <Route path="/create-event" element={
            <PrivateRoute allowedRoles={['admin']}>
              <CreateEvent />
            </PrivateRoute>
          } />
          <Route path="/events/:id/attendees" element={<PrivateRoute><Attendees /></PrivateRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
