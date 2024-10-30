import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import GuardRoute from "./GuardRoute";

export default function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GuardRoute component={<Dashboard />} />} />
    </Routes>
  );
}
