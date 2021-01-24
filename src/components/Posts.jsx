import React, { useState, useEffect } from "react";
import Input from "./Input";
import PostsList from "./PostsList";
import posts from "../api/posts";
import Pagination from "./Pagination";

const Posts = ({ getRoute, href }) => {
  const [input, setInput] = useState("");
  const [postsData, setPostsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    posts
      .get(
        "/posts/",
        {
          params: {
            userId: href
          }
        },
        { signal: signal }
      )
      .then((res) => {
        if (input === "") {
          setPostsData(res.data);
        } else {
          const filteredData = res.data.filter((data) => {
            return data.title.includes(input);
          });
          setPostsData(filteredData);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      abortController.abort();
    };
  }, [input, href, postsData]);

  const indexLast = currentPage * postsPerPage;
  const indexFirst = indexLast - postsPerPage;
  const currentPosts = postsData.slice(indexFirst, indexLast);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
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
