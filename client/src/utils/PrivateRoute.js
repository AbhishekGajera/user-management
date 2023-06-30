import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user?.id || !user?.email || !user?.name) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};
export default PrivateRoute;
