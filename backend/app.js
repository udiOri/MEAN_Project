const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//express init + mongoose connect///

const postRoutes = require("./models/routes/posts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://udi:2ULoPERkqkWY015u@meanstack-qyxt3.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(error => {
    console.log(error);
  });

app.use(cors());
app.use(bodyParser.json());

app.use("/api/posts", postRoutes);

module.exports = app;
