import React, { useState } from "react";
import { github } from "../services/api";
import RepoList from "./RepoList";

/**
 * RepoSearch.jsx
 * - User enters GitHub username
 * - Fetches public repos using backend API
 * - Handles loading, error, pagination, and repo display
 */
export default function RepoSearch() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch repos for entered username
  async function handleSearch(e) {
    e && e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await github.getRepos(username.trim(), page, 10, "full_name");
      setRepos(res.repos || []);
    } catch (err) {
      console.error("GitHub API error:", err);
      setError(err.error || "Failed to fetch repositories.");
    } finally {
      setLoading(false);
    }
  }

  // Pagination handlers
  function handleNext() {
    setPage((p) => p + 1);
    handleSearch();
  }
  function handlePrev() {
    if (page > 1) {
      setPage((p) => p - 1);
      handleSearch();
    }
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>GitHub Repositories</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 10,
          }}
        />
        <button
          type="submit"
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
          {loading ? "Fetching..." : "Search"}
        </button>
      </form>

      {error && (
        <div style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
          {error}
        </div>
      )}

      {loading && <div style={{ textAlign: "center" }}>Loading...</div>}

      {!loading && repos.length > 0 && <RepoList repos={repos} />}

      {/* Pagination controls */}
      {repos.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <button
            onClick={handlePrev}
            disabled={page === 1}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              cursor: page === 1 ? "not-allowed" : "pointer",
            }}
          >
            ◀ Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={handleNext}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
