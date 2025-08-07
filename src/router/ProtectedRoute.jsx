import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("role");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "Admin") {
    return <Navigate to="/home" replace />; // Chuyển hướng người dùng không phải admin về trang home
  }

  return <Outlet />;
};

export default ProtectedRoute;