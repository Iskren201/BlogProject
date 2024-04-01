const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const registerUser = require("./Register/Register");
const loginUser = require("./Login/Login");
const verifyToken = require("./service/verifyToken");
const logoutRouter = require("./logout/logout");

const app = express();
const PORT = 3333;

// Assuming this array stores tokens temporarily (not recommended for production)
let activeTokens = [];

app.use(cors());
app.use(bodyParser.json());

app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "This is protected data." });
});

app.post("/register", registerUser);
app.post("/login", async (req, res) => {
  try {
    const tokenResponse = await loginUser(req, res); // Call the loginUser function

    // Check if the login was successful and token is returned
    if (tokenResponse && tokenResponse.token) {
      // If so, add the token to activeTokens array
      activeTokens.push(tokenResponse.token);
    }
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).send(error.message);
  }
});

app.use("/logout", logoutRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
