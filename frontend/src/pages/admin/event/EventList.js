import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EventList.css";

const EventList = ({ events }) => {
  const [imageErrors, setImageErrors] = useState({});

  const BASE_URL = 'http://localhost:5000';

  const handleImageError = (eventId) => {
    setImageErrors((prev) => ({
      ...prev,
      [eventId]: true,
    }));
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="eventlist__list">
      {events.length ? (
        events.map((event) => (
          <Link
            to={`/events/${event._id}`}
            key={event._id}
            className="eventlist__card-link"
          >
            <div className="eventlist__card">
              {event.profileImage && !imageErrors[event._id] && (
                <div className="eventlist__card-image">
                  <img
                    src={
                      imageErrors[event._id]
                        ? "defaultPlaceholderImagePath"
                        : `${BASE_URL}/${event.profileImage}`
                    }
                    alt={event.title}
                    onError={() => handleImageError(event._id)}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="eventlist__card-details">
                <h2 className="eventlist__card-title">{event.title}</h2>
                <p className="eventlist__card-subtitle">{event.subtitle}</p>
                <p className="eventlist__card-description">
                  {event.description}
                </p>
                <p className="eventlist__card-duration">
                  Event Duration: {event.duration}
                </p>
                <p className="eventlist__card-dates">
                  Event Dates: {formatDate(event.startDate)} -{" "}
                  {formatDate(event.endDate)}
                </p>
                <div className="eventlist__card-pricing">
                  <span className="eventlist__price--actual">
                    Rs.{event.discountedPrice.toFixed(2)}
                  </span>
                  {event.actualPrice && (
                    <span className="eventlist__price--discounted">
                      Rs.{event.actualPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <button className="eventlist__book-button">
                  Book Your Event
                </button>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="eventlist__no-events">No events available.</div>
      )}
    </div>
  );
};

export default EventList;
