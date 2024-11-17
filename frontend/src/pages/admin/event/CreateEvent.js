import React, { useState } from 'react';
import './CreateEvent.css';
import api from '../../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

const CreateEvent = ({ onCancel, onEventCreated }) => {
  const [eventData, setEventData] = useState({
    title: '',
    subtitle: '',
    description: '',
    duration: '',
    maxDuration: '',
    startDate: '',
    endDate: '',
    actualPrice: '',
    discountedPrice: '',
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    toast.warn("Unauthorized access - Admins only");
    return <Navigate to="/login" />;  // Redirect to login page if unauthorized
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventData({ ...eventData, profileImage: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(eventData).forEach((key) => formData.append(key, eventData[key]));

    try {
      await api.post('/events', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Event created successfully!');
      alert("Event created successfully!");
      onEventCreated();  // Trigger any additional actions
      // onCancel();        // Close the form
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event. Please try again.');
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="create-event">
      <h2>Create a New Event</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="create-event-form">
        <label>
          Event Title:
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
          />
        </label>

        <label>
          Event Subtitle:
          <input
            type="text"
            name="subtitle"
            value={eventData.subtitle}
            onChange={handleChange}
            placeholder="Event sub Title"
            required
          />
        </label>

        <label>
          Event Description:
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Event Description"
            required
          />
        </label>

        <label>
          Event Duration:
          <input
            type="number"
            name="duration"
            value={eventData.duration}
            onChange={handleChange}
            placeholder="e.g., days"
            required
          />
        </label>

        <label>
          Maximum Duration:
          <input
            type="number"
            name="maxDuration"
            value={eventData.maxDuration}
            onChange={handleChange}
            placeholder="e.g., days"
          />
        </label>

        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={eventData.startDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={eventData.endDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Actual Price:
          <input
            type="number"
            name="actualPrice"
            value={eventData.actualPrice}
            onChange={handleChange}
            placeholder="Rs.0"
            required

          />
        </label>

        <label>
          Discounted Price:
          <input
            type="number"
            name="discountedPrice"
            value={eventData.discountedPrice}
            onChange={handleChange}
          />
        </label>

        <label>
          Event Profile Image:
          <input
            type="file"
            name="profileImage"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>

        {imagePreview && (
          <div className="create-event-image-preview">
            <img src={imagePreview} alt="Event Preview" />
          </div>
        )}

        <div className="form-buttons">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
