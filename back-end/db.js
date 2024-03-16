const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  database: "postgres",
  user: "postgres",
  password: "123",
  port: 5432,
});

module.exports = pool;
