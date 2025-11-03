import xss from "xss";
const cleanInput = (input) => {
  if (typeof input === "string") {
    return xss(input.trim());
  } else if (Array.isArray(input)) {
    return input.map(cleanInput);
  } else if (typeof input === "object" && input !== null) {
    const sanitized = {};
    for (const key in input) {
      sanitized[key] = cleanInput(input[key]);
    }
    return sanitized;
  }
  return input;
};


export const sanitizeInput = (req, res, next) => {
  try {
    if (req.body) req.body = cleanInput(req.body);
    if (req.query) req.query = cleanInput(req.query);
    if (req.params) req.params = cleanInput(req.params);
    next();
  } catch (err) {
    console.error("Sanitization error:", err);
    res.status(400).json({ message: "Invalid input data" });
  }
};
