import React, { useState, useEffect } from "react";

import UsersList from "./UsersList";
import Input from "./Input";
import posts from "../api/posts";

import { Spinner } from "react-bootstrap";

const Home = ({ getRoute }) => {
  const [input, setInput] = useState("");
  const [debounced, setDebounced] = useState(input);
  const [users, setUsers] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounced(input);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    localStorage.removeItem("postshref");

    posts.get("/users", { signal: signal }).then((res) => {
      setSpinner(false);
      if (debounced === "") {
        setUsers(res.data);
      } else {
        const filteredData = res.data.filter((data) => {
          return (
            data.name.includes(debounced) ||
            data.company.name.includes(debounced)
          );
        });
        setUsers(filteredData);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [debounced]);

  return spinner ? (
    <Spinner className="spinner" animation="border" variant="success" />
  ) : (
    <div className="App">
      <h3>/home</h3>
      <Input onChange={(e) => setInput(e.target.value)} />
      <UsersList users={users} getRoute={getRoute} />
    </div>
  );
};

export default Home;
