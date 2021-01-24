import React, { useState } from "react";
import Home from "./Home";
import Posts from "./Posts";
import PostDetails from "./PostDetails";
import Route from "./Route";

import { Container } from "react-bootstrap";

const App = () => {
  const [href, setHref] = useState("");
  const getRoute = (route) => {
    setHref(route);
  };

  return (
    <div className="App">
      <Container>
        <Route path="/">
          <Home getRoute={getRoute} />
        </Route>
        <Route path="/posts">
          <Posts getRoute={getRoute} href={href} />
        </Route>
        <Route path="/postdetails">
          <PostDetails getRoute={getRoute} href={href} />
        </Route>
      </Container>
    </div>
  );
};

export default App;
