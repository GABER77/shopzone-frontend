// context/UserContext.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../config";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/users/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch {
        setUser(null);
      }
    };

    getCurrentUser();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
