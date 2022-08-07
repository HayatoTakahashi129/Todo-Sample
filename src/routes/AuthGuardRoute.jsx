import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuardRoute = (props) => {
  const { component } = props;
  const refreshToken = useSelector((state) => state.user.refreshToken);
  const isLogin = Boolean(refreshToken);
  if (!isLogin) return <Navigate to="/login" replace={true} />;

  return component;
};

export default AuthGuardRoute;
