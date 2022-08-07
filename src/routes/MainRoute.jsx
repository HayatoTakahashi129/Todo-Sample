import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import { Signin } from "../components/Signin/Signin";
import { SignupConfirm } from "../components/Signup/Confirm/SignupConfirm";
import { Signup } from "../components/Signup/Signup";
import { AddTodo } from "../components/Todo/Add/AddTodo";
import Todo from "../components/Todo/Todo";
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
