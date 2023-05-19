const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();
const axios = require("axios");
app.use(cors());
app.use(express.json());
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
  const status = "pending";
  comments.push({
    id: commentId,
    content,
    status,
  });

  commentsByPostId[id] = comments;
  console.log("comment created before");
  await axios.post("http://localhost:4005/events", {
    type: "COMMENTCREATED",
    data: {
      id: commentId,
      content,
      postId: id,
      status,
    },
  });
  console.log("comment created before");
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("EVENT RECEIVED", req.body.type);
  const { type, data } = req.body;
  if (type === "COMMENTMODERATED") {
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    await axios.post("http://localhost:4005/events", {
      type: "COMMENTUPDATED",
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("comments service is running on port 4001");
});
