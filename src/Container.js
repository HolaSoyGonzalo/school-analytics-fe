import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserHome from "./Pages/Home/UserHome";
import AdminHome from "./Pages/Home/AdminHome";
import AdminPanel from "./Pages/Admin/AdminPanel";
import Students from "./Pages/Students";
import Exam from "./Pages/Exam";
import Overview from "./Pages/Overview";
//Components
import AdminNav from "./Components/SideBar/AdminNav";
import StudentNav from "./Components/SideBar/StudentNav";

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
      <Route exact path="/" component={Login} />
      <Route exact path="/register/:token" component={Register} />
      <Route path="/user" component={StudentNav} />
      <Route path="/admin" component={AdminNav} />
      <Route exact path="/admin" component={AdminHome} />
      <Route path="/admin/panel" component={AdminPanel} />
      <Route exact path="/user" component={UserHome} />
      <Route path="/students" component={Students} />
      <Route path="/overview" component={Overview} />
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
