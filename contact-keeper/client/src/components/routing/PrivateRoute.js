import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return !isAuthenticated && !loading ? (
    <Navigate to="/login" replace />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
