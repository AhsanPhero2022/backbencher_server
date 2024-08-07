const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.user,
  host: "localhost",
  database: process.env.database,
  password: process.env.password,
  port: 5432,
});

const createEmployee = (req, res) => {
  const { name, email, image } = req.body;

  pool.query(
    "INSERT INTO employees (name,email,image) VALUES ($1,$2,$3) RETURNING * ",
    [name, email, image],
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

const updateEmployee = (req, res) => {
  let id = parseInt(req.params.id);
  const { name, email, image } = req.body;

  pool.query(
    "UPDATE employees  SET name =$1 ,email = $2, image = $3 WHERE id=$4",
    [name, email, image, id],
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
  updateEmployee,
  updateEmployee,
  deleteEmployee,
};
