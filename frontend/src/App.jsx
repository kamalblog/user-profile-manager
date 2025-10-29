import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import RepoSearch from "./components/RepoSearch";
import ProtectedRoute from "./components/ProtectedRoute";

/**
 * App.jsx
 * - Main entry for routing and navigation
 * - Handles login, profile, and GitHub repo pages
 * - Logout clears JWT token from localStorage
 */
export default function App() {
  const navigate = useNavigate();

  // Check if user logged in
  const isAuthenticated = () => !!localStorage.getItem("token");

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: 20,
        fontFamily:
          'system-ui, -apple-system, Roboto, "Segoe UI", sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22 }}>User Profile Manager</h1>

        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/">Home</Link>
          {isAuthenticated() && <Link to="/profile">Profile</Link>}
          {isAuthenticated() && <Link to="/repos">GitHub Repos</Link>}
          {isAuthenticated() ? (
            <button onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </button>
          ) : (
            <Link to="/">Sign in</Link>
          )}
        </nav>
      </header>

      {/* Routes */}
      <main>
        <Routes>
          {/* Home: Login form */}
          <Route path="/" element={<LoginForm />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/repos"
            element={
              <ProtectedRoute>
                <RepoSearch />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <div>
                Page not found. <Link to="/">Go Home</Link>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer style={{ marginTop: 40, color: "#666" }}>
        <small>Built with React + Node.js (Express)</small>
      </footer>
    </div>
  );
}
