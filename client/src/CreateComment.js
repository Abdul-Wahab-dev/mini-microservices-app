import React, { useState } from "react";
import axios from "axios";
export default function CreateComment({ postId }) {
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };
  return (
    <div>
      <div>Create Comment</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            placeholder="comment"
            name="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
