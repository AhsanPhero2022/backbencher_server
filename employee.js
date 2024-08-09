const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

const createEmployee = async (req, res) => {
  const { id, name, title, description, company, image } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO employees (id, name, title, description, company, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, name, title, description, company, image]
    );
    res.status(200).json({
      msg: "Data created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEmployeeById = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid Employee ID" });
  }

  try {
    const result = await pool.query("SELECT * FROM employees WHERE id=$1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, title, description, company, image } = req.body;

  try {
    const result = await pool.query(
      "UPDATE employees SET name=$1, title=$2, description=$3, company=$4, image=$5 WHERE id=$6 RETURNING *",
      [name, title, description, company, image, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ msg: "Updated successfully", data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteEmployee = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(
      "DELETE FROM employees WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res
      .status(200)
      .json({ msg: `Employee with ID ${id} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
