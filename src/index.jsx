import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CategoryProvider, DateProvider, AuthProvider, ToastProvider } from "./context";
import { WishlistProvider } from "./context/wishlist-context.jsx";
import { Toast } from "./components";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <DateProvider>
          <AuthProvider>
            <WishlistProvider>
              <ToastProvider>
                <Toast />
                <App />
              </ToastProvider>
            </WishlistProvider>
          </AuthProvider>
        </DateProvider>
      </CategoryProvider>
    </BrowserRouter>
  </StrictMode>
);
