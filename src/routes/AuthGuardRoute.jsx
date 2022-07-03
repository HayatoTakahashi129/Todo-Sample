import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuardRoute = (props) => {
  const { component } = props;

  const isLogin = useSelector((state) => state.user.idToken) !== "";
  if (!isLogin) return <Navigate to="/login" replace={true} />;

  return component;
};

export default AuthGuardRoute;
