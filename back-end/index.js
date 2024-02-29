const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const PORT = 3333;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  host: "localhost",
  database: "postgres",
  user: "postgres",
  password: "123",
  port: 5432,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

app.post("/register", async (req, res) => {
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
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    client.release();

    if (result.rows.length === 0) {
      return res.status(401).send("User not found");
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ username: user.username }, "secretkey");
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
