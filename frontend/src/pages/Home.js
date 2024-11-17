// Example: Home.js
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutHome from '../components/home/AboutHome';
import CoursesHome from '../components/home/CoursesHome';
import WhatWeTeach from '../components/home/WhatWeTeach';
import BlogHome from '../components/home/BlogHome';
import FeedbackHome from '../components/home/FeedbackHome';
import CPDCertification from '../components/home/CPDCertification';

function Home() {
  return (
    <div>
        <HeroSection/>
        <AboutHome/>
        <CPDCertification />
        <CoursesHome/>
        <WhatWeTeach/>
        <BlogHome/>
        <FeedbackHome/>
    </div>
  );
}

export default Home;

