import React, { useState } from "react";
import "./App.scss";
import Login from "./screens/Login/login";
import Home from "./screens/Home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopBar from "./components/topBar/topBar";
import Apps from "./screens/Apps/apps";
import Docs from "./screens/Docs/docs";

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <div className="App">
      <Router>
        {window.location.pathname === "/" ? "" : <TopBar />}

        <Switch>
          {/* {auth ? <TopBar /> : <></>} */}
          <Route
            exact={true}
            path="/"
            component={() => {
              return <Login />;
            }}
          />
        </Switch>
        <Switch>
          <Route
            exact={true}
            path="/home"
            component={() => {
              if (!auth) {
                return <Home />;
              } else return <Home />;
            }}
          />
          <Route
            exact={true}
            path="/apps"
            component={() => {
              if (!auth) {
                return <Apps />;
              } else return <Apps />;
            }}
          />
          <Route
            exact={true}
            path="/docs"
            component={() => {
              if (!auth) {
                return <Docs />;
              } else return <Docs />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
