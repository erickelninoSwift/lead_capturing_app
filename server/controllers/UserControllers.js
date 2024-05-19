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
        detail: "please provide correct username/password",
      });
    }
    const comparePassword = await bcrypt.compare(
      password,
      userFound.rows[0].hashed_password
    );

    if (!comparePassword) {
      return response.json({
        detail: "password used was not correct",
      });
    }
    const token = jwt.sign({ email }, "secret", { expiresIn: "3h" });
    return response.status(200).json({
      email: userFound.rows[0].email,
      token,
      message: "Login Success",
    });
  } catch (error) {
    response.json({
      detail: "failed to connec tto server",
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

module.exports = { LoginController, SignupController };
