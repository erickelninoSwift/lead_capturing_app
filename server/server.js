const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./connect/connect");
const { pool } = require("./connect/db");
const { Lead } = require("./model/LeadModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

dotenv.config();

const PORT = process.env.PORT ?? 8080;
const app = express();

//middlewares cors and json
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// =============

// endpoints

// GET ALL USERS REGISTERED

app.get("/users", async (request, response) => {
  try {
    const allusers = await pool.query("SELECT * FROM users");
    console.log(allusers.rows);
    return response.json({
      users: allusers.rows,
    });
  } catch (error) {
    console.log(error);
    response.json({
      detail: error,
    });
  }
});

// =======================

// Funtion to return Hash Password

const myhashmyPassword = (myPlaintextPassword) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(myPlaintextPassword, salt);
};

// =============================
// register User
// ===================================

app.post("/signup", async (request, response) => {
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
});

// =============================

// Login
app.post("/login", async (request, response) => {
  const { email, password } = request.body;
  try {
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
});
// ==========
// connect to DB and server
const start_server = async () => {
  try {
    await connectDB(process.env.MONGODB_STRING).then(() => {
      app.listen(PORT, () => {
        console.log("Application is runnig on PORT: ", PORT);
      });
    });
  } catch (error) {
    console.log(`Error was found : ${error}`);
  }
};

// ==================

start_server();
