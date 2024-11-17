// frontend/src/components/CoursesSection.js

import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Axios instance for API requests
import './CoursesSection.css'; // Import CSS for styling

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem('studentToken')}` };
        const response = await api.get('/student/courses', { headers });

        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="courses-section">
      <h2>Your Courses</h2>
      {courses.length === 0 ? (
        <p>You have not registered for any courses yet.</p>
      ) : (
        <div className="course-list">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <img src={course.event.profileImage || '/default-course.png'} alt={course.event.title} className="course-image" />
              <h3>{course.event.title}</h3>
              <div className="course-details">
                <p><strong>Event Title:</strong> {course.event.title}</p>
                <p><strong>Selected Dates:</strong> {course.selectedDays.join(', ')}</p>
                <p><strong>Event Start Date:</strong> {new Date(course.event.startDate).toLocaleDateString()}</p>
                <p><strong>Event End Date:</strong> {new Date(course.event.endDate).toLocaleDateString()}</p>
                <p><strong>Payment Status:</strong> {course.paymentStatus}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesSection;
