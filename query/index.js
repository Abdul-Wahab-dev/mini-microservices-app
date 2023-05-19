const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());
const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "POSTCREATED") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "COMMENTCREATED") {
    const { content, id, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }

  res.send({});

  res.send({ status: "OK" });
});

app.listen(4003, () => {
  console.log("Query is running on port 4003");
});
