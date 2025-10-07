import "./Navbar.css";
import { useDate , useAuth, useWishlist} from "../../context";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

    const {destination , dateDispatch ,checkInDate , checkOutDate , guests} = useDate()
    const {authDispatch, accessToken} = useAuth()
    const {Wishlist} = useWishlist()
    const navigate = useNavigate()

    const handleSearchClick = () => {
        dateDispatch({
          type:"OPEN_SEARCH_MODAL"
        })
    }

    const handleAuthClick = () =>{
      authDispatch({
        type:"SHOW_AUTH_MODAL",
      })
    }

    const handleWishlistClick = () => {
      if (accessToken) {
        navigate("/wishlist");
      } else {
        authDispatch({
          type:"SHOW_AUTH_MODAL",
        })
      }
    }
        
  return (
    <header className="heading d-flex align-center">
      <h1 className="heading-1">
        <a className="link" href="/">
          TravelStay
        </a>
      </h1>
      <div className="form-container d-flex align-center cursor-pointer shadow " onClick={handleSearchClick}>
        <span className="form-option">{destination || "Any Where"}</span>
        <span className="border-right-1px"></span>
        <span className="form-option">
              {checkInDate && checkOutDate ? 
  `${checkInDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short"
  })} - ${checkOutDate.toLocaleDateString("en-US", {
    day: "numeric", 
    month: "short"
  })}` 
  : "Any Week"}

          </span>
        <span className="border-right-1px"> </span>
        <span className="form-option">{guests > 0 ?`${guests} guests`: "Add Guests"}</span>
        <span className="search material-symbols-outlined">search</span>
      </div>
  
      <nav className="d-flex align-center gap-large">
        <div className="wishlist-icon-container cursor-pointer" onClick={handleWishlistClick}>
          <span className="material-icons-outlined wishlist-icon">favorite</span>
          {Wishlist.length > 0 && (
            <span className="wishlist-badge">{Wishlist.length}</span>
          )}
        </div>
        <div className="nav d-flex align-center cursor-pointer" onClick={handleAuthClick}>
          <span className="material-symbols-outlined profile-option menu">
            menu
          </span>
          <span className="material-symbols-outlined profile-option person">
            person_2
          </span>
        </div>
      </nav>
    </header>
  );
};
