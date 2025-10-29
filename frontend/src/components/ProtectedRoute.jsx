import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { profile } from "../services/api";

/**
 * ProtectedRoute.jsx
 * - Wraps protected pages (Profile, Repos, etc.)
 * - Checks if valid token exists
 * - Verifies token by fetching /profile once
 * - Redirects to login if unauthorized
 */
export default function ProtectedRoute({ children }) {
  const [isAllowed, setIsAllowed] = useState(null); // null = loading
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token found → not authenticated
    if (!token) {
      setIsAllowed(false);
      return;
    }

    // Validate token by hitting /profile once
    async function validateToken() {
      try {
        await profile.get();
        setIsAllowed(true);
      } catch (err) {
        setError(err.error || "Session expired");
        setIsAllowed(false);
      }
    }

    validateToken();
  }, []);

  // While checking authentication
  if (isAllowed === null)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <p>Checking authentication...</p>
      </div>
    );

  // If not allowed → redirect to login
  if (!isAllowed) {
    return <Navigate to="/" state={{ error }} />;
  }

  // If verified → render children
  return <>{children}</>;
}
