import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import ListComments from "./ListComments";
export default function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4003/posts");
    console.log(res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const renderPosts = Object.values(posts).map((post) => (
    <div
      className="card"
      key={post.id}
      style={{
        width: "30%",
        marginBottom: "20px",
        border: "1px solid #f5f5f5",
      }}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <ListComments comments={post.comments} />
        <CreateComment postId={post.id} />
      </div>
    </div>
  ));
  console.log(posts);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {renderPosts}
    </div>
  );
}
