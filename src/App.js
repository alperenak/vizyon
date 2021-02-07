import React, { useEffect, useState } from "react";
import "./App.scss";
import Login from "./screens/Login/login";
import Home from "./screens/Home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopBar from "./components/topBar/topBar";
import Apps from "./screens/Apps/apps";
import Docs from "./screens/Docs/docs";
import Homework from "./screens/HomeWork/homework";
import Admin from "./screens/Admin/admin";
import { useCookies } from "react-cookie";
import ActivityDetail from "./screens/Admin/ActivityDetail/activityDetail";
import SideBar from "./components/Sidebar/sidebar";
import Messages from "./screens/Messages/Messages";
import MessageDetails from "./screens/Messages/MessageDetails";
import Settings from "./screens/Settings/settings";
import Profile from "./screens/Profile/profile";
function App() {
  const [auth] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies, removeCookies] = useCookies();
  const pathname = window.location.pathname;

  useEffect(() => {
    window.addEventListener(
      "beforeunload",
      () => {
        if (!localStorage.getItem("rememberMe")) {
          removeCookies("token");
        }
      },
      []
    );
  }, []);

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
          />{" "}
          <Route
            exact={true}
            path="/admin/apps/:id"
            component={() => {
              if (!auth) {
                return <Admin />;
              } else return <Admin />;
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
          <Route exact={true} path="/admin" component={Login} />
          <Route exact={true} path="/admin/home" component={Admin} />
          <Route exact={true} path="/admin/announcements" component={Admin} />
          <Route exact={true} path="/admin/class" component={Admin} />
          <Route exact={true} path="/admin/user" component={Admin} />
          <Route exact={true} path="/admin/syllabus" component={Admin} />
          <Route exact={true} path="/admin/activity" component={Admin} />
          <Route
            exact={true}
            path="/admin/user/student/:id"
            component={Admin}
          />
          <Route
            exact={true}
            path="/admin/user/teacher/:id"
            component={Admin}
          />
          <Route exact={true} path="/admin/apps" component={Admin} />
          <Route exact={true} path="/admin/exams" component={Admin} />
          <Route exact={true} path="/messages" component={Messages} />
          <Route
            exact={true}
            path="/messages/details/:id"
            component={MessageDetails}
          />
          <Route
            exact={true}
            path="/messages/new/:id"
            component={MessageDetails}
          />
          <Route exact={true} path="/settings" component={Settings} />
          <Route exact={true} path="/profile" component={Profile} />
          <Route
            exact={true}
            path="/admin/activity/:id"
            component={() => {
              return (
                <div style={{ display: "flex", width: "100%", height: "100%" }}>
                  <SideBar />
                  <ActivityDetail />
                </div>
              );
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
