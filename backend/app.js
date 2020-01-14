const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added"
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "7fhrw9e9",
      title: "First Server side post",
      content: "This is coming from the server"
    },
    {
      id: "fwfp998hf",
      title: "Second Server side post",
      content: "This is coming from the server - ADAMS"
    }
  ];
  res.status(200).json({
    message: "Posts fetched succesfully",
    posts: posts
  });
});

module.exports = app;
