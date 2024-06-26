import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { adminLoggedIn } = useAuth();

  return adminLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/signup" replace />
  );
};

export default PrivateRoute;
