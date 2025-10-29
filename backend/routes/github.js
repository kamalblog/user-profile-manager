const express = require('express');
const router = express.Router();
const githubService = require('../services/githubService');
const validator = require('validator');


router.get('/:username', async (req, res) => {
const username = req.params.username;
if (!username || !validator.isAlphanumeric(username.replace(/[-_]/g, ''))) {
return res.status(400).json({ error: 'Invalid username' });
}
const page = parseInt(req.query.page || '1', 10);
const per_page = Math.min(parseInt(req.query.per_page || '10', 10), 100);
const sort = req.query.sort || 'full_name';
try {
const data = await githubService.fetchRepos(username, page, per_page, sort);
res.json({ repos: data });
} catch (err) {
console.error(err.message || err);
res.status(502).json({ error: 'Failed to fetch from GitHub' });
}
});


module.exports = router;