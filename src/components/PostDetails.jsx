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

  const [postsHref, setPostsHref] = useState("");

  

  useEffect(() => {
    const localHref = localStorage.getItem("postdetailshref");
    if (localHref) {
      
      setPostsHref(JSON.parse(localHref));
    } else if (href && !localHref) {
      
      setPostsHref(href);
    }
  }, [href]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    

    localStorage.setItem("postdetailshref", JSON.stringify(postsHref));

    if (postsHref) {
    posts
      .get("/posts/" + postsHref, { signal: signal })
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
  }
  }, [postsHref]);

  const getComments = () => {
    posts
      .get("/comments", {
        params: {
          postId: postsHref
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
        .delete("/posts/" + post.id)
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
