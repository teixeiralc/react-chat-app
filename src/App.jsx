import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from './Context/AuthContext';
import { Home, Login, Register } from './pages';
import ProtectedRoute from './Helper/ProtectedRoute';

const App = () => {
  // const { curUser } = React.useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

const WrappedApp = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default WrappedApp;
