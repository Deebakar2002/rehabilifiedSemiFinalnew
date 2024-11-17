import React, { useState } from 'react';
import './FeedbackSection.css';

const FeedbackSection = () => {
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (feedback.trim() === '') {
      setMessage('Please enter your feedback before submitting.');
      return;
    }
  
    try {
      const response = await fetch('/api/student/add-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: 'your-student-id', // Replace with actual student ID
          feedback,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage('Thank you for your feedback!');
        setFeedback('');
      } else {
        setMessage(data.message || 'Failed to submit feedback.');
      }
    } catch (error) {
      setMessage('An error occurred while submitting your feedback.');
    }
  };

  return (
    <div className="feedback-section">
      <h2>We Value Your Feedback</h2>
      <p>Please share your thoughts about your experience.</p>
      <form onSubmit={handleSubmit} className="feedback-form">
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Write your feedback here..."
          className="feedback-textarea"
        />
        <button type="submit" className="feedback-submit-button">
          Submit
        </button>
      </form>
      {message && <p className="feedback-message">{message}</p>}
    </div>
  );
};

export default FeedbackSection;
