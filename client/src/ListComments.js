import React from "react";

export default function ListComments({ comments }) {
  const renderComments = comments.map((comment) => {
    const status = comment.status;

    const content = {
      approved: comment.content,
      rejected: "This comment has been rejected",
      pending: "This comment is awaiting moderation",
    };

    return <li key={comment.id}>{content[status]}</li>;
  });
  return <ul>{renderComments}</ul>;
}
