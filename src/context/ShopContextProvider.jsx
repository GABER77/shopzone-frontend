import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "./ShopContext";
import { backendUrl } from "../config";

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = "10";
  const tax_fee = "5%";

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addProduct = async (formData) => {
    setLoading(true);
    try {
      await axios.post(`${backendUrl}/products`, formData, { withCredentials: true });
      toast.success("Product added successfully!", { position: "top-left", autoClose: 3000 });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product", { position: "top-left", autoClose: 3000 });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/products`);
      setProducts(res.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products", {
        position: "top-left",
        autoClose: 3000,
      });
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      await axios.delete(`${backendUrl}/products/${productId}`, { withCredentials: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product", {
        position: "top-left",
        autoClose: 3000,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (productId, ProductSize) => {
    if (!ProductSize) {
      toast.error("Please select a size", {
        position: "top-left",
      });
      return;
    }

    let cartClone = structuredClone(cart);

    if (cartClone[productId]) {
      if (cartClone[productId][ProductSize]) {
        cartClone[productId][ProductSize] += 1;
      } else {
        cartClone[productId][ProductSize] = 1;
      }
    } else {
      cartClone[productId] = {};
      cartClone[productId][ProductSize] = 1;
    }
    setCart(cartClone);
  };

  const removeFromCart = (productId, size) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const quantity = updatedCart[productId]?.[size];

      if (!quantity) return prevCart;

      if (quantity > 1) {
        updatedCart[productId][size] -= 1;
      } else {
        delete updatedCart[productId][size];
        if (Object.keys(updatedCart[productId]).length === 0) {
          delete updatedCart[productId];
        }
      }

      return updatedCart;
    });
  };

  const getCartCount = () => {
    let totalCount = 0;

    Object.values(cart).forEach((sizes) => {
      Object.values(sizes).forEach((quantity) => {
        if (typeof quantity === "number" && quantity > 0) {
          totalCount += quantity;
        }
      });
    });

    return totalCount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    tax_fee,
    search,
    setSearch,
    cart,
    addToCart,
    removeFromCart,
    getCartCount,
    navigate,
    loading,
    addProduct,
    getAllProducts,
    deleteProduct,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
