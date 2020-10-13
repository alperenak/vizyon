import React, { useContext, useEffect, useState } from "react";
import "./App.scss";
import Login from "./screens/Login/login";
import Home from "./screens/Home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopBar from "./components/topBar/topBar";
import Apps from "./screens/Apps/apps";
import Docs from "./screens/Docs/docs";
import Homework from "./screens/HomeWork/homework";
import Admin from "./screens/Admin/admin";
import IsAdmin, { GetToken, GetUser } from "./actions/action";
import { useCookies } from "react-cookie";
import { UserContext } from "./context/userContext";
import ActivityDetail from "./screens/Admin/ActivityDetail/activityDetail";
function App() {
  const token = GetToken();
  const [auth, setAuth] = useState(false);
  const location = window.location;
  const pathname = window.location.pathname;
  //
  return (
    <div className="App">
      <Router>
        {pathname === "/" ||
        pathname === "/login/teacher" ||
        pathname == "/login/student" ||
        pathname?.includes("/admin") ||
        pathname === "/admin" ? (
          ""
        ) : (
          <TopBar />
        )}

        <Switch>
          {/* {auth ? <TopBar /> : <></>} */}
          <Route
            exact={true}
            path="/"
            component={() => {
              return <Login />;
            }}
          />
          <Route
            exact={true}
            path="/login/teacher"
            component={() => {
              return <Login />;
            }}
          />
          <Route
            exact={true}
            path="/login/student"
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
          <Route
            exact={true}
            path="/homeworks"
            component={() => {
              if (!auth) {
                return <Homework />;
              } else return <Homework />;
            }}
          />
          <Route exact={true} path="/admin" component={Admin} />
          <Route exact={true} path="/admin/home" component={Admin} />
          <Route exact={true} path="/admin/announcements" component={Admin} />
          <Route exact={true} path="/admin/class" component={Admin} />
          <Route exact={true} path="/admin/user" component={Admin} />
          <Route exact={true} path="/admin/syllabus" component={Admin} />
          <Route exact={true} path="/admin/activity" component={Admin} />
          <Route exact={true} path="/admin/apps" component={Admin} />
          <Route
            exact={true}
            path="/admin/activity/:id"
            component={ActivityDetail}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
