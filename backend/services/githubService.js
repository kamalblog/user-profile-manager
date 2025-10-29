const axios = require('axios');
const cache = new Map();
const TTL = parseInt(process.env.CACHE_TTL_MS || '120000', 10);


async function fetchRepos(username, page = 1, per_page = 30, sort = 'full_name') {
const key = `${username}|${page}|${per_page}|${sort}`;
const now = Date.now();
if (cache.has(key)) {
const { ts, data } = cache.get(key);
if (now - ts < TTL) return data;
}


const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos`;
const resp = await axios.get(url, { params: { page, per_page, sort } });
const data = resp.data.map(r => ({ id: r.id, name: r.name, html_url: r.html_url, description: r.description, stargazers_count: r.stargazers_count }));
cache.set(key, { ts: now, data });
return data;
}


module.exports = { fetchRepos };