import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserDetailAdmin.css";

const UserDetailAdmin = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [linkSentMessage, setLinkSentMessage] = useState("");
  const [notesFile, setNotesFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("adminToken");
        

        // Fetch user details
        const userResponse = await fetch(
          `${API_URL}/api/adminAccess/studentDetail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!userResponse.ok)
          throw new Error(
            `Failed to fetch user details: ${userResponse.statusText}`
          );
        const userData = await userResponse.json();
        setUserDetails(userData);

        // Fetch event registration details
        const eventsResponse = await fetch(
          `${API_URL}/api/adminAccess/studentEventRegistrations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!eventsResponse.ok)
          throw new Error(
            `Failed to fetch event registrations: ${eventsResponse.statusText}`
          );
        const eventsData = await eventsResponse.json();
        setEventRegistrations(eventsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleSendLink = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      
      const response = await fetch(
        `${API_URL}/api/adminAccess/sendMeetingLink`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: id,
            meetingLink,
            meetingDate,
            meetingTime,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send link: ${response.statusText}`);
      }

      setLinkSentMessage("Meeting link sent successfully!");
      setTimeout(() => setLinkSentMessage(""), 3000); // Clear message after 3 seconds
      setMeetingLink(""); // Clear the input after sending
      setMeetingDate(""); // Clear the date input
      setMeetingTime(""); // Clear the time input
    } catch (error) {
      setLinkSentMessage(`Error: ${error.message}`);
      console.error(error);
    }
  };

  const handleUpload = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("userId", id);
      if (notesFile) formData.append("notes", notesFile);
      if (videoFile) formData.append("video", videoFile);

      const response = await fetch(
        `${API_URL}/api/adminAccess/uploadNotesAndVideos`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to upload files: ${response.statusText}`);
      }

      setUploadMessage("Files uploaded successfully!");
      setTimeout(() => setUploadMessage(""), 3000); // Clear message after 3 seconds
      setNotesFile(null); // Clear the notes file input
      setVideoFile(null); // Clear the video file input
    } catch (error) {
      setUploadMessage(`Error: ${error.message}`);
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-detail-admin-container">
      <h2 className="user-detail-admin-title">User Details</h2>
      {userDetails && (
        <>
          {userDetails.profilePicture && (
            <img
              src={`${API_URL}/${userDetails.profilePicture.replace(
                /^\/+/,
                ""
              )}`}
              alt={userDetails.fullName}
              className="user-detail-admin-profile-pic"
            />
          )}
          <h3 className="user-detail-admin-name">{userDetails.fullName}</h3>
          <p className="user-detail-admin-info">
            Enrollment Date:{" "}
            {new Date(userDetails.enrollmentDate).toLocaleDateString()}
          </p>
          <p className="user-detail-admin-info">
            Phone: {userDetails.phone || "N/A"}
          </p>
          <p className="user-detail-admin-info">
            Profession: {userDetails.profession || "N/A"}
          </p>
          <p className="user-detail-admin-info">
            Email ID: {userDetails.email || "N/A"}
          </p>

          {/* Event Registration Section */}
          <h3 className="user-detail-admin-events-title">
            Event Registrations
          </h3>
          {eventRegistrations.length > 0 ? (
            <ul className="user-detail-admin-events-list">
              {eventRegistrations.map((event) => (
                <li key={event._id} className="user-detail-admin-event-item">
                  <h4 className="user-detail-admin-event-title">
                    {event.event.title}
                  </h4>
                  <p className="user-detail-admin-event-days">
                    Selected Days: {event.selectedDays.join(", ")}
                  </p>
                  <p className="user-detail-admin-event-amount">
                    Total Amount: ${event.totalAmount}
                  </p>
                  <p className="user-detail-admin-event-status">
                    Payment Status: {event.paymentStatus}
                  </p>
                  <p className="user-detail-admin-event-date">
                    Registered At:{" "}
                    {new Date(event.registeredAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No event registrations.</p>
          )}

          {/* Sent Event Link Section */}
          <div className="user-detail-admin-send-link-container">
            <h3 className="user-detail-admin-send-link-title">
              Send Event Link
            </h3>
            <input
              type="text"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="Enter meeting link"
              className="user-detail-admin-meeting-link-input"
            />
            <input
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
              className="user-detail-admin-meeting-date-input"
            />
            <input
              type="time"
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
              className="user-detail-admin-meeting-time-input"
            />
            <button
              onClick={handleSendLink}
              className="user-detail-admin-send-button"
            >
              Send
            </button>
            {linkSentMessage && (
              <p className="user-detail-admin-send-link-message">{linkSentMessage}</p>
            )}
          </div>

          {/* Upload Notes and Videos Section */}
          <div className="user-detail-admin-upload-container">
            <h3 className="user-detail-admin-upload-title">
              Upload Notes and Videos
            </h3>
            <div>
              <p>Notes: </p>
            <input
              type="file"
              onChange={(e) => setNotesFile(e.target.files[0])}
              className="user-detail-admin-upload-input"
            />
            </div>
            
            <div>
              <p>Videos:</p>
            <input
              type="file"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="user-detail-admin-upload-input"
            />
            </div>
            
            <button
              onClick={handleUpload}
              className="user-detail-admin-upload-button"
            >
              Upload
            </button>
            {uploadMessage && (
              <p className="user-detail-admin-upload-message">{uploadMessage}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetailAdmin;
