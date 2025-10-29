import React, { useEffect, useState } from "react";
import { profile } from "../services/api";

/**
 * Profile.jsx
 * - Displays logged-in user info (email, name)
 * - Allows editing and saving name
 * - Updates backend mock DB via /profile PUT
 */
export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user profile when component mounts
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await profile.get();
        setUser(res.user);
        setName(res.user.name || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMessage("Failed to load profile.");
      }
    }

    fetchProfile();
  }, []);

  // Save updated name
  async function handleSave() {
    if (!name.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await profile.update({ name });
      setUser(res.user);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.error || "Failed to save changes.");
    } finally {
      setLoading(false);
    }
  }

  if (!user) return <div style={{ textAlign: "center" }}>Loading profile...</div>;

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Your Profile</h2>

      <div style={{ marginBottom: 15 }}>
        <label>Email:</label>
        <div
          style={{
            background: "#f5f5f5",
            padding: "8px 10px",
            borderRadius: 6,
            marginTop: 4,
          }}
        >
          {user.email}
        </div>
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginTop: 4,
          }}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          width: "100%",
          padding: 10,
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {message && (
        <div
          style={{
            marginTop: 12,
            textAlign: "center",
            color: message.includes("success") ? "green" : "red",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
