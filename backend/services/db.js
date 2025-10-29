// Simple in-memory store keyed by email
const store = {
users: {
// "email@domain": { name, email, extra... }
}
};


module.exports = {
getUser(email) {
return store.users[email] || null;
},
upsertUser(email, data) {
const existing = store.users[email] || { email };
store.users[email] = { ...existing, ...data };
return store.users[email];
}
};