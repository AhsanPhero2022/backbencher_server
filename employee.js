const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.user,
  host: "localhost",
  database: process.env.database,
  password: process.env.password,
  port: 5432,
});

const createEmployee = (req, res) => {
  const { name, title, description, company, image } = req.body;

  pool.query(
    "INSERT INTO employees (name, title, description, company, image) VALUES ($1,$2,$3,$4,$5) RETURNING * ",
    [name, title, description, company, image],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }

      res.status(200).json({
        msg: "data created successfully",
        data: result.rows[0],
      });
    }
  );
};

const getEmployees = (req, res) => {
  pool.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      data: result.rows,
    });
  });
};

const getEmployeeById = (req, res) => {
  let id = parseInt(req.params.id);

  pool.query("SELECT * FROM employees WHERE id=$1", [id], (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      data: result.rows,
    });
  });
};

const updateEmployee = (req, res) => {
  let id = parseInt(req.params.id);
  const { name, title, description, company, image } = req.body;

  pool.query(
    "UPDATE employees  SET name =$1 ,title = $2, description = $3, company = $4, image = $5 WHERE id=$6",
    [name, title, description, company, image, id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json({
        data: "Updated successfully",
      });
    }
  );
};

const deleteEmployee = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM employees WHERE id=$1", [id], (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      msg: `Employee with ${id} Deleted successfully`,
    });
  });
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  updateEmployee,
  deleteEmployee,
};
