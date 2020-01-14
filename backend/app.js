const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");

//express init + mongoose connect///

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

// Post Method - Use req (getting the data and send to DB )
// + res ( the response from DB) ////////

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added",
      postId: createdPost._id
    });
  });
});

// Get Method - Use only res ///////

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched succesfully",
      posts: documents
    });
  });
});

// Delete Method - adding the ID of the specific post to the path //////////

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
