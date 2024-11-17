import React from 'react';
import './AboutHome.css'; // Make sure you have this CSS file or include these styles in your main CSS
import { FaGraduationCap, FaChalkboardTeacher, FaBookOpen } from 'react-icons/fa';

const AboutHome = () => {
  console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

  return (
    <div className="about-home">
      <div className="about-home-container">
        <div className="about-home-row">
          {/* Left-side Image */}
          <div className="about-home-col about-home-image">
            <img src="images/home/abouthome.jpg" alt="About Us" />
          </div>

          {/* Right-side Content */}
          <div className="about-home-col about-home-content">
            <div className="about-home-section-title">
              <h3>About Us</h3>
              <h2>We Have <span>5+ Years</span> in Educating Students</h2>
              <p>At our Academy, we are committed to delivering high-quality education that empowers students to develop their skills and enhance their knowledge.</p>
            </div>

            <div className="about-home-body">
              {/* Feature List Item 1 */}
              <div className="about-home-list-item">
                <div className="about-home-icon-box">
                  <FaChalkboardTeacher color="#007bff" size={30} />
                </div>
                <div className="about-home-list-content">
                  <h3>Experienced Educators</h3>
                  <p>Our team consists of highly qualified and certified educators who are dedicated to your academic growth and success.</p>
                </div>
              </div>

              {/* Feature List Item 2 */}
              <div className="about-home-list-item">
                <div className="about-home-icon-box">
                  <FaGraduationCap color="#007bff" size={30} />
                </div>
                <div className="about-home-list-content">
                  <h3>In-Depth Learning</h3>
                  <p>We stay ahead by incorporating the latest educational technologies and teaching techniques to enhance your learning experience.</p>
                </div>
              </div>

              {/* Feature List Item 3 */}
              <div className="about-home-list-item">
                <div className="about-home-icon-box">
                  <FaBookOpen color="#007bff" size={30} />
                </div>
                <div className="about-home-list-content">
                  <h3>Notes and Recorded Classes</h3>
                  <p>Our Academy provides comprehensive resources, including notes and recorded classes, ensuring you have access to trusted educational materials for your learning.</p>
                </div>
              </div>
            </div>

            {/* Inquiry Button */}
            <div className="about-home-appointment-btn">
              <a href="/appointment">Place an Inquiry</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHome;
