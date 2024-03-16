const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const registerUser = require("./Register/Register");
const loginUser = require("./Login/Login");
const verifyToken = require("./service/verifyToken");
const logoutRouter = require("./logout/logout");

const app = express();
const PORT = 3333;

app.use(cors());
app.use(bodyParser.json());

app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "This is protected data." });
});

app.post("/register", registerUser);
app.post("/login", (req, res) => {
  loginUser(req, res);
  if (res.statusCode === 200 && res.body.token) {
    activeTokens.push(res.body.token);
  }
});

app.use("/logout", logoutRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
