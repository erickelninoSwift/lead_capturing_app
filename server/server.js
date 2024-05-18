const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./connect/connect");
const { pool } = require("./connect/db");

const { Lead } = require("./model/LeadModel");

dotenv.config();

const PORT = process.env.PORT ?? 8080;
const app = express();

//middlewares cors and json
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// =============

// endpoints

app.get("/", (request, response) => {
  return response.send("<h1> Welcome Erick </h1>");
});

app.get("/users", async (request, response) => {
  try {
    const allusers = await pool.query("SELECT * FROM users");
    console.log(allusers);
    response.send("success");
  } catch (error) {
    return response.status(404).json({
      detail: error,
    });
  }
});

// ===================

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
