import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import './EventManagement.css';
import CreateEvent from './CreateEvent';
import EventList from './EventList';

const EventManagement = () => {
  const [view, setView] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEventCreated = () => {
    fetchEvents(); // Refresh events list
    setView('list'); // Switch back to the event list view
  };

  return (
    <div className="event-management-container">
      <div className="event-management-controls">
        <button 
          className={`event-management-btn ${view === 'list' ? 'active' : ''}`}
          onClick={() => setView('list')}
        >
          List All Events
        </button>
        <button 
          className={`event-management-btn ${view === 'create' ? 'active' : ''}`}
          onClick={() => setView('create')}
        >
          Create an Event
        </button>
        {view === 'list' && (
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="event-management-search-input"
          />
        )}
      </div>

      <div className="event-management-content">
        <h2>List of Events created</h2>
        {view === 'list' ? (
          <EventList events={filteredEvents} />
        ) : (
          <CreateEvent onBack={() => setView('list')} onEventCreated={handleEventCreated} />
        )}
      </div>
    </div>
  );
};

export default EventManagement;
