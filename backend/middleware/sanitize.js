const validator = require('validator');
module.exports = function sanitizeInput(req, res, next) {
// Very small sanitizer: sanitize all string body values
if (req.body && typeof req.body === 'object') {
for (const k of Object.keys(req.body)) {
if (typeof req.body[k] === 'string') {
// trim and escape
req.body[k] = validator.escape(req.body[k].trim());
}
}
}
next();
};