const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

let config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// mongoose.connect(`mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`).then(() =>
mongoose.connect("mongodb://localhost/user").then(() =>
{
  console.log("connected to mongoDB")
})
.catch((e) => {
  console.log("Error connecting to mongoDB");
  console.log(e);
});
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})

module.exports =app;