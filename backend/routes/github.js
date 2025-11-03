import express from "express";
import { fetchGithubRepos } from "../controllers/githubController.js";

const router = express.Router();

router.get("/repos", (req, res) => {
  res.status(400).json({
    message: "Please provide a GitHub username in the URL, e.g. /api/v1/github/repos/<username>",
  });
});

// Public route — no token required
router.get("/repos/:username", fetchGithubRepos);

export default router;
