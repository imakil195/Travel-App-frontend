

export const WishlistReducer = (state , {type, payload}) => {
    switch (type) {
        case "ADD_TO_WISHLIST":
            return {
                ...state,
                Wishlist: [...state.Wishlist, payload]
            };
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                Wishlist: state.Wishlist.filter((hotel) => hotel._id !== payload)
            };
        default:
            return state;
    }
}