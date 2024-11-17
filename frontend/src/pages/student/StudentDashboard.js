import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Spinner from '../../components/Spinner';
import ScheduleSection from './ScheduleSection';
import ProfileSection from './ProfileSection';
import {
  FaUser, FaBook, FaCalendarAlt, FaClipboardList, FaGraduationCap, FaComments, FaCog, FaBars, FaTimes
} from 'react-icons/fa';
import './StudentDashboard.css';
import NotesVideosSection from './NotesVideosSection';
import CoursesSection from './CoursesSection.js';
import FeedbackSection from './FeedbackSection.js';

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar, setActiveSection, handleLogout }) => (
  <div className={`student-dashboard-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
    <button onClick={toggleSidebar} className="student-dashboard-menu-toggle mobile-only">
      <FaTimes size={24} />
    </button>
    <div className="student-dashboard-profile">
      <img src="/images/profile.jpg" alt="Student" className="student-dashboard-image" />
      <h3 className="student-dashboard-name">Deebakar</h3>
    </div>
    <nav className="student-dashboard-nav">
      <button onClick={() => setActiveSection('profile')}>
        <FaUser size={20} /> Profile
      </button>
      <button onClick={() => setActiveSection('courses')}>
        <FaBook size={20} /> Courses
      </button>
      <button onClick={() => setActiveSection('schedule')}>
        <FaCalendarAlt size={20} /> Schedule
      </button>
      <button onClick={() => setActiveSection('assignments')}>
        <FaClipboardList size={20} /> Assignments
      </button>
      <button onClick={() => setActiveSection('grades')}>
        <FaGraduationCap size={20} /> Notes and Videos
      </button>
      <button onClick={() => setActiveSection('feedback')}>
        <FaComments size={20} /> Feedback
      </button>
      <button onClick={() => setActiveSection('settings')}>
        <FaCog size={20} /> Settings
      </button>
    </nav>
    {/* Logout Button Moved to Sidebar */}
    <button onClick={handleLogout} className="logout-btn-sidebar">
      Log Out
    </button>
  </div>
);

// Header Component
const Header = ({ toggleSidebar, activeSection }) => (
  <header className="student-dashboard-header">
    <button onClick={toggleSidebar} className="student-dashboard-menu-toggle mobile-only">
      <FaBars size={24} />
    </button>
    <h1 className="student-dashboard-header-title">
      {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
    </h1>
  </header>
);

// Main Content Component
const MainContent = ({ activeSection, studentData }) => {
  const sections = {
    profile: <ProfileSection studentData={studentData} />,
    courses: <CoursesSection />,
    schedule: <ScheduleSection studentId={studentData?.studentId} />,
    assignments: <AssignmentsSection />,
    grades: <NotesVideosSection />,
    feedback: <FeedbackSection />,
    settings: <SettingsSection />,
  };

  return (
    <main className="student-dashboard-main-content">
      <div className="student-dashboard-content">
        {sections[activeSection]}
      </div>
    </main>
  );
};

// Section Components (similar to Admin Dashboard)



const AssignmentsSection = () => (
  <div className="student-dashboard-card fade-in">
    <h2>Assignments</h2>
    <p>Track and submit your assignments here.</p>
  </div>
);





const SettingsSection = () => (
  <div className="student-dashboard-card fade-in">
    <h2>Settings</h2>
    <p>Adjust your preferences here.</p>
  </div>
);

// Student Dashboard Component
const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await api.get('/student/dashboard', { headers });
        if (response.data && response.data.studentId) {
          setStudentData(response.data);
        } else {
          throw new Error("Student ID not found in response data.");
        }
      } catch (error) {
        console.error('Error fetching student data', error);
        setError('Failed to fetch student dashboard.');
        localStorage.removeItem('studentToken');
        navigate('/student/login');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    navigate('/student/login');
  };

  return (
    <div className="student-dashboard">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveSection={setActiveSection}
        handleLogout={handleLogout} // Pass the logout handler to Sidebar
      />
      <div className="student-dashboard-main">
        <Header toggleSidebar={toggleSidebar} activeSection={activeSection} />
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <MainContent activeSection={activeSection} studentData={studentData} />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
