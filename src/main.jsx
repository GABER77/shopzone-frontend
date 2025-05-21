import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopProvider from "./context/ShopProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";
import CartProvider from "./context/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </CartProvider>
    </UserProvider>
  </BrowserRouter>
);
