import "./HotelCard.css";
import { useNavigate } from "react-router-dom";
import { useWishlist , useAuth } from "../../context";
import { useToast } from "../../context/toast-context";
import { findHotelInWishlist } from "../utils";


export const HotelCard = ({ hotel }) => {
  const { _id, name, image, address, state, rating, price } = hotel;

  const { wishlistDispatch, Wishlist } = useWishlist();
  const {accessToken , authDispatch} = useAuth();
  const { toastDispatch } = useToast();

  const isHotelInWishlist = findHotelInWishlist(Wishlist, _id);

  const handleWishlistClick = () => {
    if (accessToken) {
      if (!isHotelInWishlist) {
        wishlistDispatch({
          type: "ADD_TO_WISHLIST",
          payload: hotel,
        });
        toastDispatch({
          type: "SHOW_TOAST",
          payload: { message: "Added to wishlist!", toastType: "success" }
        });
      } else {
        wishlistDispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: _id,
        });
        toastDispatch({
          type: "SHOW_TOAST",
          payload: { message: "Removed from wishlist", toastType: "info" }
        });
      }
    } else {
      authDispatch({type : "SHOW_AUTH_MODAL"})
    }
  };

  const navigate = useNavigate();
  const handleHotelCardClick = () => {
    navigate(`/hotels/${_id}`);
  };

  return (
    <div className="relative hotelcard-container shadow cursor-pointer">
      <div onClick={handleHotelCardClick}>
        <img className="img" src={image} alt={name} />
        <div className="hotelcard-details">
          <div className="d-flex align-center">
            <span className="location">
              {address},{state}
            </span>
            <span className="rating d-flex align-center">
              <span className="material-icons star-icon">star</span>
              <span>{rating}</span>
            </span>
          </div>
          <p className="hotel-name">{name}</p>
          <p className="price-details">
            <span className="price">Rs. {price}</span>
            <span>night</span>
          </p>
        </div>
      </div>
      <button
        className="button btn-wishlist absolute d-flex align-center"
        onClick={handleWishlistClick}
      >
        <span className={`material-icons favorite cursor ${isHotelInWishlist ? "fav-selected" : ""}`}>
          favorite
        </span>
      </button>
    </div>
  );
};
