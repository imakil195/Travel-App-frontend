

export const findHotelInWishlist = (Wishlist, hotelId) => {
    const isHotelInWishlist = Wishlist.some(hotel => hotel._id === hotelId);
    return isHotelInWishlist;   
}   