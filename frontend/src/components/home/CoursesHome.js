import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './CoursesHome.css';

const CourseCard = ({ title, subTitle, description, imageUrl, price, discountedPrice, handleImageError }) => {
  return (
    <div className="courses-home-card">
      <div className="courses-home-image-container">
        <img src={imageUrl} alt={title} className="courses-home-image" onError={handleImageError} />
      </div>
      <div className="courses-home-content">
        <h3 className="courses-home-title line-clamp-1">{title}</h3>
        <h4 className="courses-home-subtitle line-clamp-1">{subTitle}</h4>
        <p className="courses-home-description line-clamp-2">{description}</p>
        <div className="courses-home-card-footer">
          <div className="courses-home-prices">
            <span className="courses-home-price">Rs.{price}</span>
            <span className="courses-home-discounted-price">Rs.{discountedPrice}</span>
          </div>
          <button className="courses-home-enroll-button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

const CoursesHome = () => {
  const [courses, setCourses] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const scrollRef = useRef(null);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/events`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleImageError = (id) => {
    setImageErrors((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <div className="courses-home">
      <header className="courses-home-banner">
        <h1>Explore Our Physiotherapy Events</h1>
        <p>Find the best courses to enhance your skills and knowledge in physiotherapy.</p>
      </header>
      <div className="courses-home-scroll-container">
        <button className="courses-home-scroll-arrow courses-home-left-arrow" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="courses-home-list" ref={scrollRef}>
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              title={course.title}
              subTitle={course.subtitle}
              description={course.description}
              imageUrl={
                imageErrors[course._id]
                  ? 'images/home/courseshome.jpg'
                  : `${BASE_URL}/${course.profileImage}`
              }
              price={course.actualPrice}
              discountedPrice={course.discountedPrice}
              handleImageError={() => handleImageError(course._id)}
            />
          ))}
        </div>
        <button className="courses-home-scroll-arrow courses-home-right-arrow" onClick={scrollRight}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CoursesHome;