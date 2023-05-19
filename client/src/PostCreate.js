import React, { useState } from "react";
import axios from "axios";
export default function PostCreate() {
  const [title, setTitle] = useState("");
  const submitHandle = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", {
      title,
    });
    setTitle("");
  };

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };
  return (
    <div>
      <h1>PostCreate</h1>
      <form onSubmit={submitHandle}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange(setTitle)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
