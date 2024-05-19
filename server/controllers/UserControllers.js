const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { pool } = require("../connect/db");

const saltRounds = 10;
const myhashmyPassword = (myPlaintextPassword) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(myPlaintextPassword, salt);
};

const LoginController = async (request, response) => {
  const { email, password } = request.body;
  try {
    // chaking user
    const userFound = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!userFound.rows.length) {
      return response.json({
        detail: "user is not found , please provide correct username/password",
      });
    }
    const comparePassword = await bcrypt.compare(
      password,
      userFound.rows[0].hashed_password
    );
    console.log(comparePassword);

    if (!comparePassword) {
      return response.json({
        detail: "password used was not correct please provide right password",
      });
    }
    const token = jwt.sign({ email }, "secret", { expiresIn: "3h" });
    return response.json({
      email: userFound.rows[0].email,
      token,
    });
  } catch (error) {
    console.log(error);
    response.json({
      detail: error,
    });
  }
};

const SignupController = async (request, response) => {
  const { email, password } = request.body;

  const hashed = myhashmyPassword(password);

  try {
    await pool.query(
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2)",
      [email, hashed]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "3h" });
    return response.json({ email, token });
  } catch (error) {
    return response.json({
      detail: error,
    });
  }
};

// app.get("/users", async (request, response) => {
//   try {
//     const allusers = await pool.query("SELECT * FROM users");
//     console.log(allusers.rows);
//     return response.json({
//       users: allusers.rows,
//     });
//   } catch (error) {
//     console.log(error);
//     response.json({
//       detail: error,
//     });
//   }
// });

module.exports = { LoginController, SignupController };
