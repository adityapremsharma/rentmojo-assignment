import React, { useState, useEffect } from "react";
import Input from "./Input";
import PostsList from "./PostsList";
import posts from "../api/posts";
import Pagination from "./Pagination";

import { Spinner } from "react-bootstrap";

const Posts = ({ getRoute, href }) => {
  const [input, setInput] = useState("");
  const [debounced, setDebounced] = useState(input);
  const [postsData, setPostsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;
  const [spinner, setSpinner] = useState(true);

  const [postsHref, setPostsHref] = useState("");

  

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounced(input);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);

  useEffect(() => {
    const localHref = localStorage.getItem("postshref");
    if (localHref) {
      setPostsHref(JSON.parse(localHref));
    } else if (href && !localHref) {
      setPostsHref(href);
      
      console.log("postsHref")
    }
  }, [href]);

  // useEffect(() => {
  //   if (href && !localHref) {
  //     setPostsHref(href);
  //   }

  //   localStorage.setItem("postshref", JSON.stringify(postsHref));
  // }, [localHref, href, postsHref])

  useEffect(() => {
    console.log(postsHref)
    const abortController = new AbortController();
    const signal = abortController.signal;
    
    localStorage.removeItem("postdetailshref");
    

    localStorage.setItem("postshref", JSON.stringify(postsHref));

      if (postsHref) {
    posts
      .get(
        "/posts/",
        {
          params: {
            userId: postsHref
          }
        },
        { signal: signal }
      )
      .then((res) => {
        setSpinner(false);
        if (debounced === "") {
          setPostsData(res.data);
        } else {
          const filteredData = res.data.filter((data) => {
            return data.title.includes(debounced);
          });
          setPostsData(filteredData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }

    return () => {
      abortController.abort();
    };
  }, [debounced, postsHref]);

  const indexLast = currentPage * postsPerPage;
  const indexFirst = indexLast - postsPerPage;
  const currentPosts = postsData.slice(indexFirst, indexLast);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return spinner ? (
    <Spinner className="spinner" animation="border" variant="success" />
  ) : (
    <div>
      <h3>/posts</h3>
      <Input onChange={(e) => setInput(e.target.value)} />
      <PostsList users={currentPosts} getRoute={getRoute} />
      <Pagination
        totalPosts={postsData.length}
        postsPerPage={postsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Posts;
