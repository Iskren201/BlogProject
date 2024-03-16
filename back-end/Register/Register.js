const bcrypt = require("bcrypt");
const pool = require("../db");

async function registerUser(req, res) {
  try {
    const client = await pool.connect();
    // Check if email already exists
    const emailCheck = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [req.body.email]
    );

    if (emailCheck.rows.length > 0) {
      client.release();
      return res.status(400).json({ message: "Email is already registered" });
    }
    // Insert new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await client.query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
          )
        `);

    await client.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [req.body.username, req.body.email, hashedPassword]
    );
    // Update sequence to start from the next appropriate value
    await client.query(`
        SELECT setval(
          pg_get_serial_sequence('users', 'id'),
          (SELECT MAX(id) FROM users) + 1
        )
      `);
    client.release();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).send(error.message);
  }
}

module.exports = registerUser;
