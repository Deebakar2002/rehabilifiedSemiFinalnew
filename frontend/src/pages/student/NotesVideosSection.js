import React, { useEffect, useState } from 'react';
import './NotesVideosSection.css'

const NotesVideosSection = () => {
  // State to store notes and videos provided by admin
  const [notes, setNotes] = useState([]);
  const [videos, setVideos] = useState([]);

  // Fetch notes and videos when the component mounts
  useEffect(() => {
    // Dummy data fetching - replace this with an actual API call
    const fetchAdminContent = async () => {
      try {
        // Example: replace with your API endpoints to get notes and videos
        const notesData = await fetch('/api/admin/notes').then((res) => res.json());
        const videosData = await fetch('/api/admin/videos').then((res) => res.json());

        setNotes(notesData);
        setVideos(videosData);
      } catch (error) {
        console.error("Failed to fetch notes and videos", error);
      }
    };

    fetchAdminContent();
  }, []);

  return (
    <div className="notes-videos-section">
      <h2 className="section-title">Admin Notes & Videos</h2>

      <div className="notes-section">
        <h3 className="section-subtitle">Notes</h3>
        {notes.length > 0 ? (
          <ul className="notes-list">
            {notes.map((note, index) => (
              <li key={index} className="note-item">
                <a href={note.url} target="_blank" rel="noopener noreferrer">
                  {note.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes available.</p>
        )}
      </div>

      <div className="videos-section">
        <h3 className="section-subtitle">Videos</h3>
        {videos.length > 0 ? (
          <div className="videos-list">
            {videos.map((video, index) => (
              <div key={index} className="video-item">
                <h4>{video.title}</h4>
                <video controls src={video.url} className="video-player" />
              </div>
            ))}
          </div>
        ) : (
          <p>No videos available.</p>
        )}
      </div>
    </div>
  );
};

export default NotesVideosSection;
