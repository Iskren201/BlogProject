const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["x-authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = verifyToken;
