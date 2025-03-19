import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Biến toàn cục để lưu hàm showToast
let showToast = () => { };

export const ToastProvider = ({ children }) => {
    showToast = (message, type = "info") => {
        toast[type](message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
};

export const toastMessage = (message, type = "info") => {
    if (typeof showToast === "function") {
        showToast(message, type);
    }
};
