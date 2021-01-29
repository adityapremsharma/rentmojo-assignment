import React from "react";

import { Button, Alert } from "react-bootstrap";
import Link from "./Link";

const Comments = ({ postHeading, getComments, deletePost, showComments }) => {
  return (
    <div>
      <Alert variant="dark">
        {postHeading.title}
        <br />
        <br />
        <Alert.Link
          className="showComments"
          onClick={() => {
            getComments();
          }}
        >
          Show Comments
        </Alert.Link>
      </Alert>
      <Link href="/posts">
        <Button
          onClick={() => {
            deletePost(postHeading);
          }}
          variant="outline-danger"
        >
          Delete Post
        </Button>
      </Link>
      <br />
      <br />
      {showComments.map((comment) => {
        return (
          <Alert key={comment.id} variant="dark">
            {comment.body}
          </Alert>
        );
      })}
    </div>
  );
};

export default Comments;
