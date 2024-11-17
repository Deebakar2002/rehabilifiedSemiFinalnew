import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../../utils/checkAuth';
import {
  FaUsers, FaFileAlt, FaBookOpen, FaCogs, FaBars, FaTimes,
  FaEdit, FaDollarSign, FaComments, FaExclamationTriangle, FaCalendarAlt
} from 'react-icons/fa';
import axios from 'axios';
import './AdminDashboard.css';
import EventManagement from './event/EventManagement';
import UserManagement from './UserManagement';
import SettingsComponent from './SettingsComponent';

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar, setActiveSection }) => (
  <div className={`admin-dashboard-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
    <button onClick={toggleSidebar} className="admin-dashboard-menu-toggle mobile-only">
      <FaTimes size={24} />
    </button>
    <div className="admin-dashboard-profile">
      <img src="/images/home/center.jpg" alt="Admin" className="admin-dashboard-image" />
      <h3 className="admin-dashboard-name">Admin Name</h3>
    </div>
    <nav className="admin-dashboard-nav">
      {[
        { icon: <FaUsers />, label: 'Users', section: 'users' },
        { icon: <FaFileAlt />, label: 'Files', section: 'files' },
        { icon: <FaBookOpen />, label: 'Events', section: 'Events' },
        { icon: <FaEdit />, label: 'Blog Management', section: 'blog' },
        { icon: <FaDollarSign />, label: 'Financial Analytics', section: 'financial' },
        { icon: <FaComments />, label: 'Feedback', section: 'feedback' },
        { icon: <FaExclamationTriangle />, label: 'Complains & Issues', section: 'complain' },
        { icon: <FaCalendarAlt />, label: 'Appointment Schedule', section: 'appointment' },
        { icon: <FaCogs />, label: 'Settings', section: 'settings' },
      ].map(({ icon, label, section }) => (
        <button key={section} onClick={() => setActiveSection(section)}>
          {icon} {label}
        </button>
      ))}
    </nav>
  </div>
);

// Header Component
const Header = ({ toggleSidebar, activeSection }) => (
  <header className="admin-dashboard-header">
    <button onClick={toggleSidebar} className="admin-dashboard-menu-toggle mobile-only">
      <FaBars size={24} />
    </button>
    <h1 className="admin-dashboard-header-title">
      {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
    </h1>
  </header>
);

// Main Content Components
const FileManagement = () => (
  <div className="admin-dashboard-card fade-in">
    <h2>File Management</h2>
    <p>Manage your files here.</p>
  </div>
);

const BlogManagement = () => (
  <div className="admin-dashboard-card fade-in">
    <h2>Blog Management</h2>
    <p>Manage your blogs here.</p>
  </div>
);

const FinancialAnalytics = () => (
  <div className="admin-dashboard-card fade-in">
    <h2>Financial Analytics</h2>
    <p>Analyze financial data here.</p>
  </div>
);

const Feedback = () => (
  <div className="admin-dashboard-card fade-in">
    <h2>Feedback</h2>
    <p>Review feedback from users here.</p>
  </div>
);

const ComplainsAndIssues = () => (
  <div className="admin-dashboard-card fade-in">
    <h2>Complains & Issues</h2>
    <p>Manage user complaints and issues here.</p>
  </div>
);

const AppointmentSchedule = () => (
  <div className="admin-dashboard-card fade-in">
    <h2>Appointment Schedule</h2>
    <p>Manage your appointments here.</p>
  </div>
);

// MainContent Component
const MainContent = ({ activeSection, students }) => {
  const sections = {
    users: <UserManagement students={students} />,  // Pass students to UserManagement
    files: <FileManagement />,
    Events: <EventManagement />,
    blog: <BlogManagement />,
    financial: <FinancialAnalytics />,
    feedback: <Feedback />,
    complain: <ComplainsAndIssues />,
    appointment: <AppointmentSchedule />,
    settings: <SettingsComponent />,
  };

  return (
    <main className="admin-dashboard-main-content">
      <div className="admin-dashboard-content">
        {sections[activeSection]}
      </div>
    </main>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('users');
  const [students, setStudents] = useState([]); // To hold student data
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token || !isTokenValid()) {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    } else {
      // Fetch student data from the backend
      const fetchStudents = async () => {
        try {
          const response = await axios.get('/api/student/all', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStudents(response.data);  // Set student data
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };

      fetchStudents();
    }
  }, [navigate]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="admin-dashboard">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} setActiveSection={setActiveSection} />
      <div className="admin-dashboard-main">
        <Header toggleSidebar={toggleSidebar} activeSection={activeSection} />
        <MainContent activeSection={activeSection} students={students} /> {/* Pass students */}
      </div>
    </div>
  );
};

export default AdminDashboard;
