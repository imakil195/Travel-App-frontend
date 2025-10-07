import { useToast } from "../../context/toast-context";
import "./Toast.css";

export const Toast = () => {
    const { isVisible, message, toastType, toastDispatch } = useToast();

    if (!isVisible) return null;

    const handleClose = () => {
        toastDispatch({ type: "HIDE_TOAST" });
    };

    const getIcon = () => {
        switch (toastType) {
            case "success":
                return "check_circle";
            case "error":
                return "error";
            case "info":
                return "info";
            default:
                return "check_circle";
        }
    };

    return (
        <div className={`toast-container ${toastType}`}>
            <div className="toast-content">
                <span className="material-icons-outlined toast-icon">{getIcon()}</span>
                <span className="toast-message">{message}</span>
                <button className="toast-close" onClick={handleClose}>
                    <span className="material-icons-outlined">close</span>
                </button>
            </div>
        </div>
    );
};