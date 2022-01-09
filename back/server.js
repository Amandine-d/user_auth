const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
// require("./src/models/user");
const router = require("./src/routes/users");


let config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// mongoose.connect(`mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`).then(() =>
mongoose.connect("mongodb://localhost/user").then(() => {
  console.log("connected to mongoDB")
})
  .catch((e) => {
    console.log("Error connecting to mongoDB");
    console.log(e);
  });
app.use(cors());
app.use(express.json());
app.use("/", router);


const port = 8000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})

module.exports = app;