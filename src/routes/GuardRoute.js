import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function GuardRoute({ component }) {
  const isAuthenticated = !!localStorage.getItem("token"); //!! mengubah nilai menjadi boolean, jika ada bernilai true

  return isAuthenticated ? component : <Navigate to="/auth/signin" />;
}
// Menambahkan validasi PropTypes
GuardRoute.propTypes = {
  component: PropTypes.element.isRequired, // Memastikan bahwa 'component' adalah elemen React
};
