// src/App.jsx
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { RehearsalProvider } from "./contexts/RehearsalContext";
import { AdminPage } from "./pages/AdminPage";
import { LivePage } from "./pages/LivePage";
import { LoginPage } from "./pages/LoginPage";
import { PlayerPage } from "./pages/PlayerPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ResultsPage } from "./pages/ResultsPage";

function App() {
  return (
    <AuthProvider>
      <RehearsalProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin-register"
            element={<RegisterPage isAdmin={true} />}
          />

          {/* Protected Routes */}
          <Route
            path="/player"
            element={
              <ProtectedRoute>
                <PlayerPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/results"
            element={
              <ProtectedRoute adminOnly={true}>
                <ResultsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/live"
            element={
              <ProtectedRoute>
                <LivePage />
              </ProtectedRoute>
            }
          />

          {/* Redirect to login if no path matches */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </RehearsalProvider>
    </AuthProvider>
  );
}

export default App;
