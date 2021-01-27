import React, { useState, useEffect } from "react";

import UsersList from "./UsersList";
import Input from "./Input";
import posts from "../api/posts";

import { Spinner } from "react-bootstrap";

const Home = ({ getRoute }) => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    posts.get("/users", { signal: signal }).then((res) => {
      setSpinner(false);
      if (input === "") {
        setUsers(res.data);
      } else {
        const filteredData = res.data.filter((data) => {
          return data.name.includes(input) || data.company.name.includes(input);
        });
        setUsers(filteredData);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [input]);

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
