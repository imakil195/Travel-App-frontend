import { Fragment } from "react";
import { Navbar , HotelCard } from "../../components";
import { useWishlist } from "../../context";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

  
export const Wishlist = () => {
  const { Wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <Fragment>
      <Navbar />
      {Wishlist && Wishlist.length > 0 ? (
        <>
          <h2 className="heading-2">Your Wishlist</h2>
          <section className="wishlist-page d-flex align-center wrap gap-larger">
            {Wishlist.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </section>
        </>
      ) : (
        <div className="empty-wishlist-container">
          <div className="empty-wishlist-content">
            <span className="material-icons-outlined empty-icon">favorite_border</span>
            <h2 className="empty-title">Your wishlist is empty</h2>
            <p className="empty-message">
              Start adding your favorite hotels to save them here!
            </p>
            <button 
              className="button btn-primary btn-explore cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="material-icons-outlined">home</span>
              <span>Explore Hotels</span>
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};
  