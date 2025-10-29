const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'dev_secret';


module.exports = function (req, res, next) {
const auth = req.headers.authorization;
if (!auth) return res.status(401).json({ error: 'Missing auth token' });
const token = auth.split(' ')[1];
try {
const payload = jwt.verify(token, secret);
req.user = payload;
next();
} catch (err) {
return res.status(401).json({ error: 'Invalid token' });
}
};