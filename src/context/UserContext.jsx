// context/UserContext.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user info on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/users/me`, {
          withCredentials: true, // send cookie
        });
        setUser(res.data.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, setUser, loading }}>{children}</UserContext.Provider>;
};
