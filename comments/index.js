const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();
const axios = require("axios");
app.use(express.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];

  res.send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const { id } = req.params;

  const comments = commentsByPostId[id] || [];

  comments.push({
    id: commentId,
    content,
  });

  commentsByPostId[id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "COMMENTCREATED",
    data: {
      id: commentId,
      content,
      postId: id,
    },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("EVENT RECEIVED", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("comments service is running on port 4001");
});
