import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Make sure to style this component

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Brief Info */}
        <div className="footer-section">
          <img src="/images/logo/11.png" alt="Logo" className="footer-logo" />
          <p className="footer-description">
            Rehabilified is your partner in rehabilitation, physiotherapy, and personalized care. Our mission is to enhance mobility and well-being for everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/pages">Pages</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>123 Health Blvd, Wellness City</p>
          <p>Email: info@rehabilified.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-social-icons">
            <a href="#facebook" aria-label="Facebook">
              <img src="/images/icons/facebook.png" alt="Facebook" />
            </a>
            <a href="#twitter" aria-label="Twitter">
              <img src="/images/icons/twitter.png" alt="Twitter" />
            </a>
            <a href="#instagram" aria-label="Instagram">
              <img src="/images/icons/instagram.png" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Rehabilified. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
