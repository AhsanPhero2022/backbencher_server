const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const dbEmp = require("./employee");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.post("/add", dbEmp.createEmployee);
app.get("/all", dbEmp.getEmployees);
app.get("/:id", dbEmp.getEmployeeById);
app.put("/:id", dbEmp.updateEmployee);
app.delete("/:id", dbEmp.deleteEmployee);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});

// Error handling middleware
app.use((err, req) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

module.exports = app;
