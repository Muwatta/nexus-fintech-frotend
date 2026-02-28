import React, { useContext } from "react";
import type { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ChangePassword from "../pages/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword";
import Deposit from "../pages/Deposit";
import Withdraw from "../pages/Withdraw";
import Transfer from "../pages/Transfer";
import Invest from "../pages/Invest";
import Dashboard from "../pages/Dashboard";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? children : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/invest" element={<Invest />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
