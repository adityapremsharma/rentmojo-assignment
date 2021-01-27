import React, { useState, useEffect } from "react";
import posts from "../api/posts";
import Input from "./Input";
import Comments from "./Comments";

import { Spinner } from "react-bootstrap";

const PostDetails = ({ href }) => {
  const [input, setInput] = useState("");
  const [postData, setPostData] = useState([]);
  const [comments, setComments] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    posts
      .get("/posts/" + href, { signal: signal })
      .then((res) => {
        setSpinner(false);
        setPostData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      abortController.abort();
    };
  }, [input, href]);

  const getComments = () => {
    posts
      .get("/comments", {
        params: {
          postId: href
        }
      })
      .then((res) => {
        if (input === "") {
          setComments(res.data);
        } else {
          const filteredData = res.data.filter((data) => {
            return data.body.includes(input);
          });
          setComments(filteredData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (post) => {
    const deleteDecision = confirm(
      "Are you sure you want to DELETE this Post?"
    );
    if (deleteDecision) {
      posts
        .delete("/posts" + post.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return spinner ? (
    <Spinner className="spinner" animation="border" variant="success" />
  ) : (
    <div>
      <h3>/postdetails</h3>
      <Input onChange={(e) => setInput(e.target.value)} />
      <Comments
        getComments={getComments}
        deletePost={deletePost}
        postHeading={postData}
        showComments={comments}
      />
    </div>
  );
};

export default PostDetails;
