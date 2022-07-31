import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import { Signin } from "../pages/Signin/Signin";
import { SignupConfirm } from "../pages/Signup/Confirm/SignupConfirm";
import { Signup } from "../pages/Signup/Signup";
import { AddTodo } from "../pages/Todo/Add/AddTodo";
import Todo from "../pages/Todo/Todo";
import AuthGuardRoute from "./AuthGuardRoute";

const mainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthGuardRoute component={<Home />} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/confirm" element={<SignupConfirm />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/todo" element={<AuthGuardRoute component={<Todo />} />} />
      <Route
        path="/todo/add"
        element={<AuthGuardRoute component={<AddTodo />} />}
      />
    </Routes>
  );
};

export default mainRoute;
