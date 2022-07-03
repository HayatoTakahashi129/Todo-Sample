import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import { SignupConfirm } from "../pages/Signup/Confirm/SignupConfirm";
import { Signup } from "../pages/Signup/Signup";

const mainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/confirm" element={<SignupConfirm />} />
    </Routes>
  );
};

export default mainRoute;
