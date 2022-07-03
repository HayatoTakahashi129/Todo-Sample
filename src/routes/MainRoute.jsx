import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import { Signin } from "../pages/Signin/Signin";
import { SignupConfirm } from "../pages/Signup/Confirm/SignupConfirm";
import { Signup } from "../pages/Signup/Signup";
import AuthGuardRoute from "./AuthGuardRoute";

const mainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthGuardRoute component={<Home />} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/confirm" element={<SignupConfirm />} />
      <Route path="/login" element={<Signin />} />
    </Routes>
  );
};

export default mainRoute;
