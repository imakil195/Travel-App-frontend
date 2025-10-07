import { createContext, useContext, useReducer, useEffect } from 'react';
import { WishlistReducer } from '../reducer';

const initialValue = { Wishlist: [] };

const WishlistContext = createContext(initialValue);

const WishlistProvider = ({ children }) => {
  const [{ Wishlist }, wishlistDispatch] = useReducer(WishlistReducer, initialValue);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('travelstay_auth');
    if (savedAuth) {
      try {
        const { accessToken } = JSON.parse(savedAuth);
        if (accessToken) {
          const savedWishlist = localStorage.getItem(`travelstay_wishlist_${accessToken}`);
          if (savedWishlist) {
            const wishlistData = JSON.parse(savedWishlist);
            wishlistDispatch({
              type: "LOAD_WISHLIST",
              payload: wishlistData
            });
          }
        }
      } catch (error) {
        console.error("Error loading wishlist from storage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    const savedAuth = localStorage.getItem('travelstay_auth');
    if (savedAuth) {
      try {
        const { accessToken } = JSON.parse(savedAuth);
        if (accessToken) {
          localStorage.setItem(`travelstay_wishlist_${accessToken}`, JSON.stringify(Wishlist));
        }
      } catch (error) {
        console.error("Error saving wishlist to storage:", error);
      }
    }
  }, [Wishlist]);

  return (
    <WishlistContext.Provider value={{ Wishlist, wishlistDispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
