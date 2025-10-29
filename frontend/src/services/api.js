const API_ROOT = process.env.REACT_APP_API_ROOT || 'http://localhost:4000/api/v1';


async function api(path, opts = {}) {
const headers = opts.headers || {};
const token = localStorage.getItem('token');
if (token) headers.Authorization = `Bearer ${token}`;
const res = await fetch(`${API_ROOT}${path}`, { ...opts, headers: { 'Content-Type': 'application/json', ...headers } });
if (!res.ok) {
const err = await res.json().catch(() => ({}));
throw err;
}
return res.json();
}


export const auth = {
login: (email, name) => api('/auth/login', { method: 'POST', body: JSON.stringify({ email, name }) })
};


export const profile = {
get: () => api('/profile'),
update: (data) => api('/profile', { method: 'PUT', body: JSON.stringify(data) })
};


export const github = {
getRepos: (username, page = 1, per_page = 10, sort = 'full_name') => api(`/github/${encodeURIComponent(username)}?page=${page}&per_page=${per_page}&sort=${encodeURIComponent(sort)}`)
};