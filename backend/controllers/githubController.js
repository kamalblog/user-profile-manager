import axios from "axios";

// Fetch Public GitHub Repositories
export const fetchGithubRepos = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username || username == " ") {
      return res.status(400).json({ message: "GitHub username is required" });
    }

    // Call GitHub API
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: { "User-Agent": "node-app" },
    });

    // Extract only important fields
    const repos = response.data.map((repo) => ({
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      created_at: repo.created_at,
    }));

    res.status(200).json({
      message: `Fetched ${repos.length} public repositories for ${username}`,
      repos,
    });
  } catch (err) {
    console.error("Error fetching GitHub repos:", err.message);

    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: "GitHub user not found" });
    }

    res.status(500).json({ message: "Failed to fetch GitHub repositories" });
  }
};
