const express = require("express");

const app = express();
const axios = require("axios");
app.use(express.json());

app.post("/events", async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === "COMMENTCREATED") {
      const { content, id, postId } = data;

      const status = content.toLowerCase().includes("dog")
        ? "rejected"
        : "approved";
      await axios.post("http://localhost:4005/events", {
        type: "COMMENTMODERATED",
        data: {
          id,
          content,
          status,
          postId,
        },
      });
    }

    res.send({ status: "OK" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(4002, () => {
  console.log("moderation is running on port 4002");
});
