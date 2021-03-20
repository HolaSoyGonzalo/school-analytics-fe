import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//Styling/Animations

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) =>
    dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const UserInfos = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <form>
        <input name="firstname" value={props.UserInfo.firstname} />
        <input name="lastname" value={props.UserInfo.lastname} />
        <input name="dob" value={props.UserInfo.birthday} />
        <input name="gender" value={props.UserInfo.gender} />
        <input name="email" value={props.UserInfo.email} />

        {props.errors.show && (
          <Alert className="register-error" variant="danger">
            {props.errors.errors[0].message}
          </Alert>
        )}
      </form>
    </Container>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInfos)
);
