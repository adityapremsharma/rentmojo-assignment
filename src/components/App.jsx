import React, { useState } from "react";
import Home from "./Home";
import Posts from "./Posts";
import PostDetails from "./PostDetails";
import Route from "./Route";

import { Container } from "react-bootstrap";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../dark-mode/GlobalStyle";
import { lightTheme, darkTheme } from "../dark-mode/Theme";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const themeToggler = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const [href, setHref] = useState("");
  const getRoute = (route) => {
    setHref(route);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="App">
          <label class="switch">
            <input
              type="checkbox"
              onClick={themeToggler}
              value="Switch Theme"
            />
            <span class="slider"></span>
          </label>
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
      </>
    </ThemeProvider>
  );
};

export default App;
