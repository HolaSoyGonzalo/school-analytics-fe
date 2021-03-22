import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserHome from "./Pages/Home/UserHome";
import AdminHome from "./Pages/Home/AdminHome";
import Students from "./Pages/Students";
import Exam from "./Pages/Exam";
import Overview from "./Pages/Overview";
//Components
import UserSidebar from "./Components/SideBar/UserSidebar";
import AdminSidebar from "./Components/SideBar/AdminSidebar";
//Loaders
import LoaderFull from "./Components/Loaders/LoaderFull";

const Container = (props) => {
  //  const start = async () => {
  //     await Authorize(props.setUser);
  //     setTimeout(() => {
  //       props.setLoading (false);
  //     }, 1300);
  //   };

  //   useEffect(() => {
  //     props.setLoading(true);
  //     start();
  //   }, []);

  return (
    <Router>
      <Route path="/user" component={UserSidebar} />
      <Route path="/admin" component={AdminSidebar} />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register/:token" component={Register} />
        <Route exact path="/user" component={UserHome} />
        <Route exact path="/exam" component={Exam} />
        <Route exact path="/students" component={Students} />
        <Route exact path="/overview" component={Overview} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setLoading: (boolean) => dispatch({ type: "SET_LOADING", payload: boolean }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) =>
    dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
