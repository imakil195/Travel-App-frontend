import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./OrderSummary.css";

export const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { hotelDetails, bookingDetails } = location.state || {};

  // Redirect to home if no booking data
  if (!hotelDetails || !bookingDetails) {
    navigate("/");
    return null;
  }

  const {
    name,
    address,
    state: hotelState,
    price
  } = hotelDetails;

  const {
    checkInDate,
    checkOutDate,
    guests,
    numberOfNights,
    totalAmount,
    paymentId
  } = bookingDetails;

  return (
    <Fragment>
      <header className="heading">
        <h1 className="heading-1">
          <Link className="link" to="/">
            TravelStay
          </Link>
        </h1>
      </header>
      
      <main className="order-summary-page">
        <div className="order-summary-container">
          {/* Success Icon */}
          <div className="success-checkmark">
            <span className="material-icons-outlined">check_circle</span>
          </div>

          {/* Success Message */}
          <h1 className="order-title">Booking Confirmed</h1>
          <p className="order-subtitle">Thank you for your reservation</p>

          {/* Booking Details */}
          <div className="order-card">
            {/* Hotel Name */}
            <div className="order-section">
              <h3 className="hotel-title">{name}</h3>
              <p className="hotel-subtitle">{address}, {hotelState}</p>
            </div>

            {/* Divider */}
            <div className="order-divider"></div>

            {/* Trip Info */}
            <div className="order-section trip-grid">
              <div className="trip-item">
                <span className="trip-label">Check-in</span>
                <span className="trip-value">
                  {checkInDate && checkInDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                  })}
                </span>
              </div>
              <div className="trip-item">
                <span className="trip-label">Check-out</span>
                <span className="trip-value">
                  {checkOutDate && checkOutDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                  })}
                </span>
              </div>
              <div className="trip-item">
                <span className="trip-label">Guests</span>
                <span className="trip-value">{guests}</span>
              </div>
              <div className="trip-item">
                <span className="trip-label">Nights</span>
                <span className="trip-value">{numberOfNights}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="order-divider"></div>

            {/* Payment Info */}
            <div className="order-section">
              <div className="payment-line">
                <span>Room × {numberOfNights}</span>
                <span>Rs. {price * numberOfNights}</span>
              </div>
              <div className="payment-line">
                <span>Service fee</span>
                <span>Rs. 200</span>
              </div>
              <div className="payment-line total-line">
                <span>Total</span>
                <span>Rs. {totalAmount}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="order-divider"></div>

            {/* Booking ID */}
            <div className="order-section booking-id-section">
              <span className="id-label">Booking ID</span>
              <span className="id-value">{paymentId}</span>
            </div>
          </div>

          {/* Back Button */}
          <Link to="/" className="btn-back">
            Back to Home
          </Link>
        </div>
      </main>
    </Fragment>
  );
};