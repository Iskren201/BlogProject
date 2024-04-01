const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const token = req.headers["x-authorization"];
  if (!token) return res.status(400).send("No token provided.");

  const index = activeTokens.indexOf(token);
  if (index !== -1) {
    activeTokens.splice(index, 1);
    res.status(200).send("Logged out successfully");
  } else {
    res.status(400).send("Token not found.");
  }
});

module.exports = router;
