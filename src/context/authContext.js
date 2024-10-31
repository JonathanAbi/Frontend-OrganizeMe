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
      id: userData.id,
      name: userData.name,
      email: userData.email,
      token: userData.token,
    });
    localStorage.setItem("authToken", userData.token);
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
