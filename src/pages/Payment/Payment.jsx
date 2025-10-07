import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Payment.css";
import axios from "axios";
import { useDate } from "../../context";

export const Payment = () => {
  const { id } = useParams();

  const navigate = useNavigate()

  const [singleHotel, setSingleHotel] = useState({});

  const { guests, dateDispatch, checkInDate, checkOutDate } = useDate();

  const numberOfNights =
    checkInDate && checkOutDate
      ? (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
      : 0;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travelstay-backendapp.onrender.com/api/hotels/${id}`
        );
        setSingleHotel(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const { image, name, address, state, rating, price = 0 } = singleHotel;

  const totalPayableAmount = (price || 0) * numberOfNights + 200;


  //load razorpay script

  const loadScript = (source) => {
    return new Promise(resolve => {
        const script = document.createElement("script");
        script.src = source
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
    })
  }

  const handleConfirmBookingClick =async () =>{

    const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!response) {
        console.log({message: "Razorpay SDK failed to load"})
    }

    const options = {
        key : "rzp_test_RQYm75TzUBMmov",
        amount:totalPayableAmount * 100,
        currency:"INR",
        name:"TravelStay",
        email:"akilsaran195@gmail.com",
        contact:"9900214474",
        description:"Trank you for booking with us",

        handler : ({payment_id}) => {
            navigate("/order-summary", {
                state: {
                    hotelDetails: {
                        id,
                        name,
                        address,
                        state,
                        image,
                        rating,
                        price
                    },
                    bookingDetails: {
                        checkInDate,
                        checkOutDate,
                        guests,
                        numberOfNights,
                        totalAmount: totalPayableAmount,
                        paymentId: payment_id
                    }
                }
            });
        },
        prefill:{
            name:"Akil Saravanan",
            email:"akilsaran195",
            contact:9611554474,
        }
    };
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()

  }

  return (
    <Fragment>
      <header className="heading">
        <h1 className="heading-1">
          <Link className="link" to="/">
            TravelStay
          </Link>
        </h1>
      </header>
      <main className="main payment-page d-flex justify-center gap-large">
        <div className="final-details-container d-flex direction-column gap-md">
          <h2>Trip Details</h2>
          <div className="dates-and-guests d-flex direction-column gap-md">
            <h3>Your Trip</h3>
            <div>
              <p className="fw-bold">Dates</p>
              <span>
                {checkInDate && checkOutDate ? (
                  <>
                    {checkInDate.toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}{" "}
                    -{" "}
                    {checkOutDate.toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}
                  </>
                ) : (
                  "No dates selected"
                )}
              </span>
            </div>
            <div className="d-flex direction-column gap-sm">
              <p className="fw-bold">Guests</p>
              <span>{guests} Guests</span>
            </div>
          </div>
          <div className="d-flex direction-column gap-md">
            <h3>Pay with</h3>
            <div className="payment-option">Razorpay</div>
          </div>
          <button className="button btn-primary btn-reserve cursor btn-pay" onClick={handleConfirmBookingClick}>
            Confirm Booking
          </button>
        </div>

        <div className="final-details d-flex direction-column gap-large">
          <div className="d-flex gap-sm">
            <img
              className="image"
              src={image}
              alt={name}
            />
            <div className="d-flex direction-column gap-sm">
              <div className="d-flex direction-column">
                <span className="fw-bold">{name}</span>
                <span className="text-gray">{address} , {state}</span>
              </div>
              <div className="rating-container">
                <span className="rating d-flex align-center">
                  <span className="material-icons-outlined">star</span>
                  <span>{rating}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="tag">
            Your booking is protected by{" "}
            <strong className="strong">TravelStay</strong> cover
          </div>

          <div className="price-detail-container">
            <div className="price-distribution d-flex direction-column">
              <h3>Price Details</h3>
              <div className="final-price d-flex align-center justify-space-between">
                <span className="span">Rs. {price} x {numberOfNights} nights</span>
                <span className="span">Rs. {(price || 0) * numberOfNights}</span>
              </div>

              <div className="final-price d-flex align-center justify-space-between">
                <span className="span">Service fee</span>
                <span className="span">Rs. 200</span>
              </div>

              <div className="final-price d-flex align-center justify-space-between">
                <span className="span fw-bold">Total </span>

                <span className="span fw-bold">Rs. {totalPayableAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};
