const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
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
    const { content, id, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "COMMENTUPDATED") {
    const { content, id, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
    console.log("COMMENT UPDATED");
  }

  res.send({ status: "OK" });
});

app.listen(4003, () => {
  console.log("Query is running on port 4003");
});
