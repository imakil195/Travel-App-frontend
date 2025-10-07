export const toastReducer = (state, { type, payload }) => {
    switch (type) {
        case "SHOW_TOAST":
            return {
                ...state,
                isVisible: true,
                message: payload.message,
                toastType: payload.toastType || "success"
            };
        case "HIDE_TOAST":
            return {
                ...state,
                isVisible: false
            };
        default:
            return state;
    }
};