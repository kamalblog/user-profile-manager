const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const validator = require('validator');
const sanitize = require('../middleware/sanitize');
const db = require('../services/db');


const secret = process.env.JWT_SECRET || 'dev_secret';


// Simulated login: user provides email, returns token and user profile (created if missing)
router.post('/login', sanitize, (req, res) => {
const { email, name } = req.body || {};
if (!email || !validator.isEmail(email)) {
return res.status(400).json({ error: 'Valid email required' });
}
const user = db.upsertUser(email, { name: name || '', email });
const token = jwt.sign({ email }, secret, { expiresIn: '2h' });
return res.json({ token, user });
});


module.exports = router;