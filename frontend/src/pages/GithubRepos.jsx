import { useState } from "react";
import api from "../api/axiosConfig";
import "./GithubRepos.css";
import Navbar from "../components/Navbar";

export default function GithubRepos() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchRepos = async () => {
    if (!username.trim()) {
      setMsg(" Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setMsg("");
    setRepos([]);

    try {
      const res = await api.get(`/github/repos/${username}`);
      if (res.data.repos && res.data.repos.length > 0) {
        setRepos(res.data.repos);
      } else {
        setMsg("No repositories found for this username.");
      }
    } catch (err) {
      setMsg("Failed to fetch repositories. Check username or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <>
             <Navbar />
    <div className="github-container">
      <div className="github-box">
        <h2 className="github-title">📁 Public GitHub Repositories</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter GitHub username (e.g. kamalshrivastav)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={fetchRepos}>Fetch Repos</button>
        </div>

        {loading && <p className="loading">⏳ Fetching repositories...</p>}
        {msg && <p className="message">{msg}</p>}

        <div className="repo-grid">
          {repos.map((repo) => (
            <div key={repo.id} className="repo-card">
              <h3>{repo.name}</h3>
              <p>{repo.description || "No description provided."}</p>
              <div className="repo-footer">
                <span>⭐ {repo.stargazers_count}</span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-link"
                >
                  View →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
