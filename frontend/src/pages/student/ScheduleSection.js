import React, { useEffect, useState, useCallback } from "react"; 
import api from "../../services/api";
import "./ScheduleSection.css";

// Helper function to format date and time
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTime = (timeString) => {
  const [hour, minute] = timeString.split(":");
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

const ScheduleSection = ({ studentId }) => {
  const [meetingData, setMeetingData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMeetingDetails = useCallback(async () => {
    try {
      const response = await api.get(`/schedule/${studentId}`);
      setMeetingData(response.data);
    } catch (error) {
      console.error("Error fetching meeting details:", error);
      setErrorMessage("Failed to fetch meeting details: " + error.message);
    }
  }, [studentId]);

  useEffect(() => {
    fetchMeetingDetails();
  }, [fetchMeetingDetails]);

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>;
  }

  if (!meetingData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="schedule-section">
      <h2>Meeting Schedule</h2>
      <p>
        <strong>Date:</strong> {formatDate(meetingData.date)}
      </p>
      <p>
        <strong>Time:</strong> {formatTime(meetingData.time)}
      </p>
      <p>
        <a
          href={meetingData.link}
          target="_blank"
          rel="noopener noreferrer"
          className="meeting-button"
        >
          Join Meeting
        </a>
      </p>
    </div>
  );
};

export default ScheduleSection;
