import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "./ShopContext";
import { backendUrl } from "../config";

const ShopProvider = (props) => {
  const currency = "$";
  const delivery_fee = "10";
  const tax_fee = "5%";

  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchText, setSearchText] = useState("");
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

  const getAllProducts = async (options = {}) => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/products`, {
        params: options,
      });
      setProducts(res.data.data || []);
      setTotalResults(res.data.results || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products", {
        position: "top-left",
        autoClose: 3000,
      });
      setProducts([]);
      setMyProducts([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const getMyProducts = async (options = {}) => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/products/my-products`, {
        params: options,
        withCredentials: true,
      });
      setMyProducts(res.data.data.products || []);
      setTotalResults(res.data.totalResults || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products", {
        position: "top-left",
        autoClose: 3000,
      });
      setMyProducts([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      await axios.delete(`${backendUrl}/products/${productId}`, { withCredentials: true });
      toast.success("Product deleted!", { position: "top-left" });
      await getAllProducts(); // Refresh the products
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product", {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const getMyOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/orders`, {
        withCredentials: true,
      });
      setMyOrders(res.data.data.orders || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders", {
        position: "top-left",
        autoClose: 3000,
      });
      setMyOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currency,
    delivery_fee,
    tax_fee,
    searchText,
    setSearchText,
    navigate,
    loading,
    products,
    totalResults,
    addProduct,
    getAllProducts,
    deleteProduct,
    myProducts,
    getMyProducts,
    getMyOrders,
    myOrders,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopProvider;
