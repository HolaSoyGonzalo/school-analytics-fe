import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
//Components
import SideBar from "./Components/SideBar/";
//Loaders
import LoaderFull from "./Components/Loaders/LoaderFull";

const Container = (props) => {
  const start = async () => {
    setTimeout(() => {
      props.setLoading(false);
    }, 1300);
  };

  useEffect(() => {
    props.setLoading(true);
    start();
  }, []);

  return (
    <Router>
      <Route path="/" component={SideBar} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register/:token" component={Register} />
        <Route exact path="/" component={Home} />
      </Switch>
      {/* {props.app.isLoading && <LoaderFull />} */}
    </Router>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (data) => dispatch({ type: "UPDATE_USER_INFO", payload: data }),
  setLoading: (boolean) => dispatch({ type: "SET_LOADING", payload: boolean }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) =>
    dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
