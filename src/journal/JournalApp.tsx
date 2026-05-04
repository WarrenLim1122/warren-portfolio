import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground animate-pulse font-mono">Loading...</p>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/journal/login" replace />;
  }
  return <>{children}</>;
}

export default function JournalApp() {
  return (
    <AuthProvider>
      {/* dark class activates the journal's dark theme CSS variables */}
      <div className="dark">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}
