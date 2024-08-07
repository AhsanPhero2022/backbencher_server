const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const dbEmp = require("./employee");
const PORT = 5000;

app.use(express.json());

// Routes

app.post("/add", dbEmp.createEmployee);
app.get("/all", dbEmp.getEmployees);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
app.post("/add", dbEmp.createEmployee);
app.get("/all", dbEmp.getEmployees);
app.put("/:id", dbEmp.updateEmployee);
app.delete("/:id", dbEmp.deleteEmployee);
