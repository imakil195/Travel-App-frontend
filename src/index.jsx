import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CategoryProvider,DateProvider ,AuthProvider} from "./context";
import { WishlistProvider } from "./context/wishlist-context.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <DateProvider>
        <AuthProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </AuthProvider>
        </DateProvider>
      </CategoryProvider>
    </BrowserRouter>
  </StrictMode>
);
