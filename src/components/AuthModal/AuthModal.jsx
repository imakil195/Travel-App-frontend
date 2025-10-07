import { AuthLogin, AuthSignup } from "../index";
import "./AuthModal.css";
import { useAuth, useWishlist } from "../../context";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/toast-context";

export const AuthModal = () => {
  const { authDispatch, selectedTab, accessToken, username } = useAuth();
  const { wishlistDispatch } = useWishlist();
  const { toastDispatch } = useToast();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    authDispatch({
      type: "SET_TO_LOGIN",
    });
  };

  const handleSignupClick = () => {
    authDispatch({
      type: "SET_TO_SIGNUP",
    });
  };

  const handleModalCloseClick = () => {
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };

  const handleLogoutClick = () => {
    // Clear wishlist
    wishlistDispatch({ type: "CLEAR_WISHLIST" });
    
    // Clear auth
    authDispatch({ type: "LOGOUT" });
    
    // Clear localStorage
    const savedAuth = localStorage.getItem('travelstay_auth');
    if (savedAuth) {
      try {
        const { accessToken } = JSON.parse(savedAuth);
        localStorage.removeItem(`travelstay_wishlist_${accessToken}`);
      } catch (error) {
        console.error("Error clearing wishlist:", error);
      }
    }
    localStorage.removeItem('travelstay_auth');
    
    // Show toast
    toastDispatch({
      type: "SHOW_TOAST",
      payload: { message: "Logged out successfully", toastType: "info" }
    });
    
    // Close modal
    handleModalCloseClick();
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
    handleModalCloseClick();
  };

  return (
    <div className="auth-modal-container fixed" onClick={handleModalCloseClick}>
      <div className="auth-modal absolute shadow right-0" onClick={(e) => e.stopPropagation()}>
        {accessToken ? (
          // Logged-in state
          <div className="auth-logged-in">
            <div className="logged-in-header">
              <span className="material-icons-outlined user-icon">account_circle</span>
              <div className="user-info">
                <p className="welcome-text">Logged in as</p>
                <p className="username-text">{username}</p>
              </div>
              <button
                className="button btn-close-small d-flex align-center justify-center cursor-pointer"
                onClick={handleModalCloseClick}
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
            <div className="logged-in-actions">
              <button
                className="button btn-action cursor-pointer"
                onClick={handleWishlistClick}
              >
                <span className="material-icons-outlined">favorite</span>
                <span>My Wishlist</span>
              </button>
              <button
                className="button btn-action btn-logout cursor-pointer"
                onClick={handleLogoutClick}
              >
                <span className="material-icons-outlined">logout</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          // Logged-out state (original)
          <>
            <div className="d-flex align-center shadow">
              <button
                className={`button btn-auth grow-shrink-basis cursor-pointer ${
                  selectedTab === "login" ? "btn-auth-selected" : ""
                }`}
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button
                className={`button btn-auth grow-shrink-basis cursor-pointer ${
                  selectedTab === "signup" ? "btn-auth-selected" : ""
                }`}
                onClick={handleSignupClick}
              >
                Signup
              </button>
              <button
                className="button btn-auth btn-close d-flex align-center justify-center cursor-pointer"
                onClick={handleModalCloseClick}
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
            <div>
              {selectedTab === "login" ? (
                <AuthLogin />
              ) : selectedTab === "signup" ? (
                <AuthSignup />
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};