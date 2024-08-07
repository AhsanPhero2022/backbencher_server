const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "backBencher",
  password: "513323",
  port: 5432,
});

const createEmployee = (req, res) => {
  const { name, email } = req.body;

  pool.query(
    "INSERT INTO employees (name,email) VALUES ($1,$2) RETURNING * ",
    [name, email],
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

module.exports = {
  createEmployee,
  getEmployees,
  // getEmployeeById,
  // updateEmployee,
  // updateEmployee,
  // deleteEmployee,
};
