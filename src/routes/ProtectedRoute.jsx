import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.isAdmin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;