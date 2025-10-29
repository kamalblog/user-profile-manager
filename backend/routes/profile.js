const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const sanitize = require('../middleware/sanitize');
const db = require('../services/db');


router.get('/', auth, (req, res) => {
const user = db.getUser(req.user.email);
if (!user) return res.status(404).json({ error: 'User not found' });
res.json({ user });
});


router.put('/', auth, sanitize, (req, res) => {
const payload = req.body || {};
const allowed = { name: payload.name || '', email: req.user.email };
const updated = db.upsertUser(req.user.email, allowed);
res.json({ user: updated });
});


module.exports = router;