import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './EventProfile.css';

const EventProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setError("Event not found");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Handle day selection
  const handleDaySelection = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((selectedDay) => selectedDay !== day)
        : [...prevSelectedDays, day]
    );
  };

  // Calculate total price based on selected days
  const calculateTotalPrice = () => {
    return (event.discountedPrice / parseInt(event.duration)) * selectedDays.length;
  };

  const isTokenValid = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('studentToken');
    if (!token) return false;
  
    try {
      const decodedToken = jwtDecode(token); // Use `decode` or `jwt_decode` here based on your import
      // Check if token has expired
      return decodedToken.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };
  

  // Handle payment action
 // EventProfile.js
const handlePayment = async () => {
  if (!isTokenValid()) {
    alert("Please log in to proceed with payment.");
    navigate("/student/login");
    return;
  }

  try {
    const token = localStorage.getItem('studentToken');
    const response = await axios.post('http://localhost:5000/api/payments', {
      eventId: id,
      selectedDays,
      totalAmount: calculateTotalPrice()
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.success) {
      navigate('/successfulPayment', {
        state: {
          message: `Successful payment! Mr./Ms. ${response.data.studentName}, Course: ${event.title}`,
        }
      });
    }
  } catch (error) {
    console.error("Payment error:", error);
    alert("Payment failed. Please try again.");
  }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <div>{error}</div>;

  return event ? (
    <div className="event-profile">
      <h2 className="event-profile__title">{event.title}</h2>
      <div className="event-profile__content">
        {event.profileImage && (
          <img
            className="event-profile__image"
            src={`http://localhost:5000/${event.profileImage}`}
            alt={event.title}
          />
        )}
        <div className="event-profile__details">
          <p className="event-profile__subtitle">{event.subtitle}</p>
          <p className="event-profile__description">{event.description}</p>
          <p>
            <strong>Duration:</strong> {event.duration} days
          </p>
          <p className="eventlist__card-dates">
            <strong>Event Dates:</strong> {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </p>
          <p>
            <strong>Price:</strong> Rs.{event.discountedPrice} <s>Rs.{event.actualPrice}</s>
          </p>
        </div>
      </div>

      {/* Event booking section */}
      <div className="event-profile__book-event">
        <h3 className="book-event__title">Book Your Event</h3>
        <p className="book-event__instruction">
          Select {event.duration} days from the available options:
        </p>
        <div className="event-profile__days-selection">
          {[...Array(parseInt(event.maxDuration))].map((_, index) => {
            const day = `Day ${index + 1}`;
            return (
              <label
                key={day}
                className={`event-profile__day-label ${selectedDays.includes(day) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  value={day}
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDaySelection(day)}
                  disabled={!selectedDays.includes(day) && selectedDays.length >= parseInt(event.duration)}
                />
                <span className="checkmark"></span>
                {day}
              </label>
            );
          })}
        </div>
        <div className="event-profile__summary">
          <p>Selected Days: {selectedDays.length} of {event.duration}</p>
          <p>Total Amount: Rs.{calculateTotalPrice()}</p>
        </div>
        <button
          onClick={handlePayment}
          className="event-profile__payment-button"
          disabled={selectedDays.length !== parseInt(event.duration)}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default EventProfile;
