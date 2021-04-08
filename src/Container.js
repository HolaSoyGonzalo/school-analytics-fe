import React, { useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//PAGES
//Login&Register
import Login from "./Pages/Login";
import Register from "./Pages/Register";

//Admin
import AdminHome from "./Pages/Home/AdminHome";
import AdminPanel from "./Pages/Admin/AdminPanel";
import NewExam from "./Pages/Exam/NewExam";
import UserHome from "./Pages/Home/UserHome";
import Students from "./Pages/Students";

import Overview from "./Pages/Overview";
//Components
import AdminNav from "./Components/SideBar/AdminNav";
import StudentNav from "./Components/SideBar/StudentNav";

//Loaders
import LoaderFull from "./Components/Loaders/LoaderFull";

const Container = (props) => {
  const [SelectedStudentId, setSelectedStudentId] = useState(0);
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
      <Route
        path="/admin"
        render={(props) => {
          return (
            <AdminNav {...props} setSelectedStudentId={setSelectedStudentId} />
          );
        }}
      />
      <Route
        exact
        path="/admin"
        render={(props) => {
          return (
            <AdminHome
              {...props}
              SelectedStudentId={SelectedStudentId}
              setSelectedStudentId={setSelectedStudentId}
            />
          );
        }}
      />
      <Route path="/admin/panel" component={AdminPanel} />
      <Route path="/admin/addExam" component={NewExam} />
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
