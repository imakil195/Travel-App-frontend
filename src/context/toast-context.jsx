import { createContext, useContext, useReducer, useEffect } from "react";
import { toastReducer } from "../reducer/toast-reducer";

const initialValue = {
    isVisible: false,
    message: "",
    toastType: "success"
};

const ToastContext = createContext(initialValue);

const ToastProvider = ({ children }) => {
    const [{ isVisible, message, toastType }, toastDispatch] = useReducer(toastReducer, initialValue);

    // Auto-hide toast after 3 seconds
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                toastDispatch({ type: "HIDE_TOAST" });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    return (
        <ToastContext.Provider value={{ isVisible, message, toastType, toastDispatch }}>
            {children}
        </ToastContext.Provider>
    );
};

const useToast = () => useContext(ToastContext);

export { ToastProvider, useToast };