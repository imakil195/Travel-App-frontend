import { createContext, useContext, useReducer } from 'react';
import { WishlistReducer } from '../reducer';

const initialValue = { Wishlist: [] };

const WishlistContext = createContext(initialValue);

const WishlistProvider = ({ children }) => {
  const [{ Wishlist }, wishlistDispatch] = useReducer(WishlistReducer, initialValue);
  return (
    <WishlistContext.Provider value={{ Wishlist, wishlistDispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
