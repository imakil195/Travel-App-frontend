import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CategoryProvider,DateProvider } from "./context";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <DateProvider>
          <App />
        </DateProvider>
      </CategoryProvider>
    </BrowserRouter>
  </StrictMode>
);
