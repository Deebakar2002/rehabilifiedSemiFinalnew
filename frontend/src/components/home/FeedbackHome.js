import React, { useEffect, useRef } from 'react'; // Import useEffect
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import './FeedbackHome.css'; // Assuming you have some CSS for styling

// Sample testimonials data
const testimonials = [
  {
    name: 'Albert Flores',
    position: 'Medical Assistant',
    text: 'Penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut id lorem ac enim vestibulum blandit nec sit amet felis. Fusce quis diam odio. Cras mattis mi quis tincidunt.',
    image: 'images/home/abouthome.jpg',
  },
  {
    name: 'Esther Howard',
    position: 'Nursing Assistant',
    text: 'Penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut id lorem ac enim vestibulum blandit nec sit amet felis. Fusce quis diam odio. Cras mattis mi quis tincidunt.',
    image: 'images/home/abouthome.jpg',
  },
  {
    name: 'Kathryn Murphy',
    position: 'Web Designer',
    text: 'Consectetur adipiscing elit. Integer nunc viverra laoreet est the is porta pretium metus aliquam eget maecenas porta is nunc viverra Aenean pulvinar maximus leo.',
    image: 'images/home/abouthome.jpg',
  },
];

const FeedbackHome = () => {
  const swiperRef = useRef(null); // Create a ref to hold the swiper instance

  useEffect(() => {
    swiperRef.current = new Swiper('.feedback-home__carousel', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }, []);

  // Example function to interact with Swiper instance
  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // Go to the next slide
    }
  };

  return (
    <section className="feedback-home__testimonial">
      <div className="feedback-home__bg" style={{ backgroundImage: 'url(images/home/abouthome.jpg)' }}></div>
      <div className="container">
        <div className="feedback-home__top">
          <div className="section-title text-left">
            <div className="section-title__tagline-box">
              <div className="section-title__tagline-shape-1"></div>
              <span className="section-title__tagline">Testimonials</span>
            </div>
            <h2 className="section-title__title">Our Students Feedback</h2>
          </div>
          <div className="feedback-home__nav">
            <div className="swiper-button-prev" tabIndex="0" role="button" aria-label="Previous slide">
              <i className="icon-angle-right"></i>
            </div>
            <div className="swiper-button-next" tabIndex="0" role="button" aria-label="Next slide" onClick={goToNextSlide}>
              <i className="icon-angle-left"></i>
            </div>
          </div>
        </div>
        <div className="feedback-home__bottom">
          <div className="feedback-home__carousel swiper-container">
            <div className="swiper-wrapper">
              {testimonials.map((testimonial, index) => (
                <div className="swiper-slide" key={index}>
                  <div className="feedback-home__single">
                    <div className="feedback-home__client-img">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="feedback-home__rating">
                      <span className="icon-star"></span>
                      <span className="icon-star"></span>
                      <span className="icon-star"></span>
                      <span className="icon-star"></span>
                      <span className="icon-star"></span>
                    </div>
                    <p className="feedback-home__text">{testimonial.text}</p>
                    <div className="feedback-home__client-info">
                      <h5 className="feedback-home__client-name">{testimonial.name}</h5>
                      <p className="feedback-home__client-sub-title">{testimonial.position}</p>
                    </div>
                    <div className="feedback-home__quote-icon">
                      <img src="images/home/abouthome.jpg" alt="Quote Icon" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-notification" aria-live="assertive" aria-atomic="true"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackHome;