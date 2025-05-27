import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../config";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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

  const updateUserData = async (updatedData) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${backendUrl}/users/update-me`, updatedData, { withCredentials: true });
      console.log(response);
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

  const value = { user, setUser, loading, logout, updateUserData };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
