import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UserManagement.css';

const UserManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const API_URL = 'http://localhost:5000';
  // Fetch students from your API
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('adminToken');
        console.log('Admin token:', token);

        // Use the full URL of your backend API
         // Adjust this to match your backend URL
        const response = await fetch(`${API_URL}/api/student/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        console.log('Content-Type:', contentType);

        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          console.log('Received data:', data);
          setStudents(data);
        } else {
          const text = await response.text();
          console.error('Received non-JSON response:', text);
          throw new Error("Received non-JSON response from server");
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        setError(`Failed to fetch students: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter students based on the search term
  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to user detail page
  const handleStudentClick = (studentId) => {
    navigate(`/user-detail-admin/${studentId}`); // Navigate to UserDetailAdmin page with student ID
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="user-management-card fade-in">
      <h2>User Management</h2>
      {error && <div className="error-message">{error}</div>} {/* Show error if exists */}
      <p>Manage your users here.</p>

      <input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="user-management-search-input"
      />

      <ul className="user-management-student-list">
        {filteredStudents.map(student => (
          <li 
            key={student._id} 
            className="user-management-student-item"
            onClick={() => handleStudentClick(student._id)} // Add onClick handler
          >
            <img 
              src={`${API_URL}/${student.profilePicture.replace(
                /^\/+/,
                ""
              )}`} 
              alt={student.fullName} 
              className='user-management-student-profile-image'
            />
            <div>
              <h3>{student.fullName}</h3>
            </div>
            <div>
              <p>Enrollment Date: {new Date(student.enrollmentDate).toLocaleDateString()}</p>
              <p>Phone: {student.phone || 'N/A'}</p>
              <p>Profession: {student.profession || 'N/A'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
