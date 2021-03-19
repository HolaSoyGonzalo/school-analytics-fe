import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { authorise } from "./Auth";
//Pages
import Home from "./Pages/Home";
import SingleTest from "./Pages/SingleTest";
import Login from "./Pages/Login";
//Components
import SideBar from "./Components/SideBar";
//Loaders
import LoaderFull from "./Components/Loaders/LoaderFull";

const Container = (props) => {
  const start = async () => {
    await authorise(props.setUser);
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
      {!props.app.isLoggedIn && !props.user.username ? (
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Redirect to="/" />
          </Switch>
        </>
      ) : (
        <>
          <Route path="/" component={SideBar} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/test" component={SingleTest} />
          </Switch>
        </>
      )}
      {props.app.isLoading && <LoaderFull />}
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
