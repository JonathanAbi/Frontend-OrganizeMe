import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Otp from '../pages/Otp'

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/verify-user" element={<Otp />} />
    </Routes>
  );
}
