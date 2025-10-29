import React from "react";


export default function RepoList({ repos = [] }) {
  if (!repos.length) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "#555",
          marginTop: 20,
        }}
      >
        No repositories found.
      </div>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {repos.map((repo) => (
        <li
          key={repo.id}
          style={{
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 12,
            marginBottom: 10,
            background: "#fafafa",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              color: "#007bff",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {repo.name}
          </a>
          <p style={{ margin: "6px 0", color: "#444" }}>
            {repo.description || "No description"}
          </p>
          <span style={{ fontSize: 13, color: "#666" }}>⭐ {repo.stargazers_count}</span>
        </li>
      ))}
    </ul>
  );
}
