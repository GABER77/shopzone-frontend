import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../config";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on refresh
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/users/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  // Logout function
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

  return <UserContext.Provider value={{ user, setUser, loading, logout }}>{children}</UserContext.Provider>;
};
