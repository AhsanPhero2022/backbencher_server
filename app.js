const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = 5000;

app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
