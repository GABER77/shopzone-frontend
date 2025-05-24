import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../config";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCart();
  }, []);

  // GET cart
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

  // ADD to cart
  const addToCart = async (productId, size, quantity = 1) => {
    setLoading(true);
    try {
      await axios.post(`${backendUrl}/cart/${productId}`, { size, quantity }, { withCredentials: true });
      toast.success("Product added to cart", { position: "top-left", autoClose: 3000 });
      await getCart(); // Refresh page
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart", {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // REMOVE from cart
  const removeFromCart = async (productId, size) => {
    setLoading(true);
    try {
      await axios.delete(`${backendUrl}/cart/${productId}`, {
        data: { size },
        withCredentials: true,
      });
      toast.success("Product removed from cart", { position: "top-left", autoClose: 3000 });
      await getCart(); // Refresh page
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove from cart", {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // CLEAR entire cart
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

  const value = {
    cart,
    cartCount,
    loading,
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
