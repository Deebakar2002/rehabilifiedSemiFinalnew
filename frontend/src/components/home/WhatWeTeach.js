// src/components/WhatWeTeach.js

import React from 'react';
import './WhatWeTeach.css'; // Import CSS file for styling

const WhatWeTeach = () => {
  return (
    <div className="what-we-teach">
      <div className="what-we-teach__container">
        <h2 className="what-we-teach__title">What We Teach</h2>
        <p className="what-we-teach__description">
          At PhysicoFriend, we offer a wide range of physiotherapy techniques and practices to help you achieve optimal health and recovery.
        </p>
        <div className="what-we-teach__card-container">
          <div className="what-we-teach__card">
            <div className="what-we-teach__card-image" style={{ backgroundImage: 'url(images/whatwete.jpg)' }}></div>
            <div className="what-we-teach__card-content">
              <h3 className="what-we-teach__card-title">Therapeutic Exercise</h3>
              <p className="what-we-teach__card-description">
                Customized exercise programs designed to improve strength, flexibility, and overall function.
              </p>
            </div>
          </div>
          <div className="what-we-teach__card">
            <div className="what-we-teach__card-image" style={{ backgroundImage: 'url(images/whatwt.jpg)' }}></div>
            <div className="what-we-teach__card-content">
              <h3 className="what-we-teach__card-title">Manual Therapy</h3>
              <p className="what-we-teach__card-description">
                Hands-on techniques to alleviate pain, improve mobility, and promote healing.
              </p>
            </div>
          </div>
          <div className="what-we-teach__card">
            <div className="what-we-teach__card-image" style={{ backgroundImage: 'url(images/whatwete.jpg)' }}></div>
            <div className="what-we-teach__card-content">
              <h3 className="what-we-teach__card-title">Electrotherapy</h3>
              <p className="what-we-teach__card-description">
                Use of electrical modalities to reduce pain and enhance recovery.
              </p>
            </div>
          </div>
          <div className="what-we-teach__card">
            <div className="what-we-teach__card-image" style={{ backgroundImage: 'url(images/whatwt.jpg)' }}></div>
            <div className="what-we-teach__card-content">
              <h3 className="what-we-teach__card-title">Patient Education</h3>
              <p className="what-we-teach__card-description">
                Empowering patients with knowledge about their condition and self-management strategies.
              </p>
            </div>
          </div>
          <div className="what-we-teach__card">
            <div className="what-we-teach__card-image" style={{ backgroundImage: 'url(images/whatwete.jpg)' }}></div>
            <div className="what-we-teach__card-content">
              <h3 className="what-we-teach__card-title">Patient Education</h3>
              <p className="what-we-teach__card-description">
                Empowering patients with knowledge about their condition and self-management strategies.
              </p>
            </div>
          </div>
          <div className="what-we-teach__card">
            <div className="what-we-teach__card-image" style={{ backgroundImage: 'url(images/whatwt.jpg)' }}></div>
            <div className="what-we-teach__card-content">
              <h3 className="what-we-teach__card-title">Patient Education</h3>
              <p className="what-we-teach__card-description">
                Empowering patients with knowledge about their condition and self-management strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeTeach;
