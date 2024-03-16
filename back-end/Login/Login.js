const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(401).send("User not found");
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    // If email and password match, generate JWT token and send it as response
    const token = jwt.sign({ email: user.email }, "secretkey");
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
// test
module.exports = loginUser;
