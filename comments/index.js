const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];

  res.send(comments);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const { id } = req.params;

  const comments = commentsByPostId[id] || [];

  comments.push({
    id: commentId,
    content,
  });

  commentsByPostId[id] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("comments service is running on port 4001");
});
