import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { curUser } = React.useContext(AuthContext);
  return curUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
