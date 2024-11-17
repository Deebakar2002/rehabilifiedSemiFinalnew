import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState(''); // 'admin' or 'student'
  const [userPhoto, setUserPhoto] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const studentToken = localStorage.getItem('studentToken');
  
    console.log('adminToken:', adminToken); // Debugging
    console.log('studentToken:', studentToken); // Debugging
  
    if (adminToken) {
      setIsLoggedIn(true);
      setUserType('admin');
      const adminData = JSON.parse(localStorage.getItem('adminData'));
      setUserName(adminData?.name || 'Admin');
      setUserPhoto(adminData?.profilePhoto || null);
    } else if (studentToken) {
      setIsLoggedIn(true);
      setUserType('student');
      const studentData = JSON.parse(localStorage.getItem('studentData'));
      console.log('studentData:', studentData); // Debugging
      setUserName(studentData?.name || 'Student');
      setUserPhoto(studentData?.profilePhoto || null);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
  

  const getInitials = (name) => {
    if (!name) return 'U'; // Default to 'U' if no name is provided
    const nameParts = name.split(' ');
    const firstInitial = nameParts[0] ? nameParts[0][0] : '';
    const lastInitial = nameParts[1] ? nameParts[1][0] : '';
    return (firstInitial + lastInitial).toUpperCase();
  };

  const handleLogout = () => {
    if (userType === 'admin') {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
    } else if (userType === 'student') {
      localStorage.removeItem('studentToken');
      localStorage.removeItem('studentData');
    }
    setIsLoggedIn(false);
    setUserType('');
    window.location.href = userType === 'admin' ? '/admin/login' : '/student/login';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="header">
          <Link to="/" className="logo">
            <img src="/images/logo/11.png" alt="Logo" className="logo-img" />
            <span className="logo-text">Rehabilified</span>
          </Link>

          <button 
            className={`hamburger ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className="desktop-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/events" className="nav-link">Events</Link>
            <Link to="/pages" className="nav-link">Pages</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>

            {isLoggedIn ? (
              <div className="profile-container">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="profile-button"
                >
                  {userPhoto ? (
                    <img src={userPhoto} alt="Profile" className="profile-photo" />
                  ) : (
                    getInitials(userName)
                  )}
                </button>
                {showDropdown && (
                  <div className="dropdown">
                    <Link to={`/${userType}/dashboard`} className="dropdown-item">Profile</Link>
                    <button onClick={handleLogout} className="dropdown-item logout-btn">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <div className="login-container">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="login-button"
                  >
                    Login
                  </button>
                  {showDropdown && (
                    <div className="dropdown">
                      <Link to="/student/login" className="dropdown-item">Student Login</Link>
                      <Link to="/admin/login" className="dropdown-item">Admin Login</Link>
                    </div>
                  )}
                </div>
                <Link to="/student/signup" className="signup-button">Sign Up</Link>
              </div>
            )}
          </div>
        </div>

        <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/Events" className="nav-link">Events</Link>
          <Link to="/pages" className="nav-link">Pages</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          {!isLoggedIn && (
            <div className="mobile-auth">
              <Link to="/student/login" className="nav-link">Login Student</Link>
              <Link to="/admin/login" className="nav-link">Login Admin</Link>
              <Link to="/signup" className="nav-link signup-link">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
