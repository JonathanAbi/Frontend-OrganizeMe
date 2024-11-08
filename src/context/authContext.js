import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authToken");
    //mengambil token dari localStorage saat aplikasi dimuat untuk mempertahankan sesi login user meskipun halaman di-refresh atau browser ditutup.
    return token ? { token } : null;
  });

  const login = (userData) => {
    setUser({
      username: userData.username,
      email: userData.email,
      token: userData.token,
      refreshToken : userData.refreshToken
    });
    localStorage.setItem(
      "authToken",
      JSON.stringify({
        username: userData.username,
        email: userData.email,
        token: userData.token,
        refreshToken : userData.refreshToken
      })
    );
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
