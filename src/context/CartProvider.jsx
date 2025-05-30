import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../config";
import { CartContext } from "./CartContext";
import { UserContext } from "./UserContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  const getCart = async () => {
    try {
      const res = await axios.get(`${backendUrl}/cart`, { withCredentials: true });
      setCart(res.data.data.cart || []);
      setCartCount(res.data.items || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch cart", {
        position: "top-left",
        autoClose: 3000,
      });
    }
  };

  const addToCart = async (productId, size, quantity = 1) => {
    setLoading(true);
    try {
      await axios.post(`${backendUrl}/cart/${productId}`, { size, quantity }, { withCredentials: true });
      toast.success("Product added to cart", { position: "top-left", autoClose: 3000 });
      await getCart(); // Refresh cart counter and cart data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart", {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId, size) => {
    setLoading(true);
    try {
      await axios.delete(`${backendUrl}/cart/${productId}`, {
        data: { size },
        withCredentials: true,
      });
      toast.success("Product removed from cart", { position: "top-left", autoClose: 3000 });
      await getCart(); // Refresh cart counter and cart data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove from cart", {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await axios.delete(`${backendUrl}/cart`, { withCredentials: true });
      toast.success("Cart cleared", { position: "top-left", autoClose: 3000 });
      setCart([]);
      setCartCount(0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear cart", {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const checkout = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/checkout`, { withCredentials: true });

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const sessionId = response.data?.session?.id;

      if (sessionId) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        toast.error("No session ID returned");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong during checkout", {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    cartCount,
    loading,
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
