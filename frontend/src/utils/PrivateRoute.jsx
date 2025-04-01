import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//wrapper component for protect routes
const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("token"); //check user if logged in

  //if not logged in redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />; // if logged in, render the protected component
};

export default PrivateRoute;
