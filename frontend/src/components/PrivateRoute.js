// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, adminRequired = false }) {
  const { userInfo } = useSelector((state) => state.user);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (adminRequired && userInfo.user.rol !== 'administrador') {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
