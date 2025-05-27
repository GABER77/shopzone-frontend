import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Dashboard from "./pages/dashboard/DashboardLayout";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="px-5 sm:px-[4vw] md:px-[4vw] lg:px-[6vw]">
      <ToastContainer />
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin or seller only */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "seller"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Only logged-in user */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Catch-all unknown route */}
        <Route path="*" element={<h1 className="text-center text-2xl mt-20 text-red-600">404 - Page Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
