import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Pages
import Home from "./Pages/Home";
import SingleTest from "./Pages/SingleTest";
import Login from "./Pages/Login";
//Components
import SideBar from "./Components/SideBar";

function Container() {
  return (
    <Router>
      {/* {!props.app.isLoggedIn && !props.user.username ? (
      <>
        <Switch>
          <Route exact path="/login" component={} />
          <Route exact path="/register" component={} />
          <Route exact path="/forgotpassword" component={} />
          <Redirect to="/login" />
        </Switch>
      </>
    ) : (
      <> */}
      <Route path="/" component={SideBar} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/test" component={SingleTest} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/" component={} />
        <Route exact path="/" component={} />
        <Redirect to="/" /> */}
      </Switch>
      {/* </>
    )} */}
    </Router>
  );
}

export default Container;
