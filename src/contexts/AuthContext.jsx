// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { userService } from "../services/user.service";

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for logged in user when the app loads
  useEffect(() => {
    const user = userService.getLoggedInUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (credentials) => {
    const response = await userService.login(credentials);
    setCurrentUser(response.user);
    return response;
  };

  // Register function
  const register = async (userInfo) => {
    return await userService.register(userInfo);
  };
  
  // Register Adming function
  const registerAdmin = async (userInfo) => {
    return await userService.registerAdmin(userInfo);
  };

  // Logout function
  const logout = async () => {
    await userService.logout();
    setCurrentUser(null);
  };

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === "admin";
  };

  // Check if user is a specific instrument player
  const playsInstrument = (instrument) => {
    return currentUser?.instrument === instrument;
  };

  // Values to expose from context
  const value = {
    currentUser,
    login,
    register,
    registerAdmin,
    logout,
    isAdmin,
    playsInstrument,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
