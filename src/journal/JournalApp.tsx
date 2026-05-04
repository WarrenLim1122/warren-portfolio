import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
  // Mirror the source repo's <html class="dark"> approach.
  // Adding dark to <html> ensures portal-rendered elements (dropdowns, dialogs,
  // selects, popovers) inherit dark CSS variables even though they render into
  // document.body, outside any scoped .dark div.
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <AuthProvider>
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
