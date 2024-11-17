import React from 'react';
import './HeroSection.css'; // Import the CSS file for styling

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>
          Physiotherapy <br /> at Your Fingertips
        </h1>
        <p>
          Discover personalized care and rehabilitation tailored just for you. Our expert therapists are here to help you regain mobility and enhance your well-being.
        </p>
        <button className="cta-button">Learn More</button>
      </div>
      <div className="hero-image-container">
        <div className="hero-image-circle">
          <img src="/images/home/center.jpg" alt="Physiotherapy" className="hero-image" />
        </div>
        <img src="/images/home/left.jpg" alt="Doctor 1" className="doctor-image doctor-image-1" />
        <img src="/images/home/right.jpg" alt="Doctor 2" className="doctor-image doctor-image-2" />
      </div>
    </div>
  );
};

export default HeroSection;
