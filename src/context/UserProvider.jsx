import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../config";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  // This loading is only for fetching user data refresh(used in ProtectedRoute.jsx)
  const [loadingUserData, setLoadingUserData] = useState(true);
  // This loading is for API calls like update password, update profile, etc.
  const [loading, setLoading] = useState(false);

  // Fetch current user on refresh
  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/users/me`, {
        withCredentials: true,
      });
      setUser(response.data.doc);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      setUser(null);
    } finally {
      setLoadingUserData(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${backendUrl}/users/logout`, {}, { withCredentials: true });
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out. Please try again.", {
        position: "top-left",
        autoClose: 3000,
      });
    }
  };

  const updateUserData = async (userId, updatedData) => {
    setLoading(true);
    try {
      await axios.patch(`${backendUrl}/users/${userId}`, updatedData, { withCredentials: true });
    } catch (error) {
      console.error("Update User Failed:", error);
      toast.error("Failed to update data. Please try again.", {
        position: "top-left",
        autoClose: 3000,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentUserData = async (updatedData) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${backendUrl}/users/update-me`, updatedData, { withCredentials: true });
      setUser(response.data.updatedUser);
    } catch (error) {
      console.error("Update User Failed:", error);
      toast.error("Failed to update data. Please try again.", {
        position: "top-left",
        autoClose: 3000,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserPassword = async (updatedData) => {
    setLoading(true);
    try {
      await axios.patch(`${backendUrl}/users/update-password`, updatedData, { withCredentials: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password", {
        position: "top-left",
        autoClose: 3000,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async (options = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/users`, {
        params: options,
        withCredentials: true,
      });
      setAllUsers(response.data.data);
      setTotalResults(response.data.results);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to get all users", {
        position: "top-left",
        autoClose: 3000,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    loadingUserData,
    logout,
    getAllUsers,
    updateCurrentUserData,
    updateUserPassword,
    allUsers,
    updateUserData,
    totalResults,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
