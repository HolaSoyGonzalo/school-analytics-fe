import React, { useState } from "react";
import { Container, Alert, Card } from "react-bootstrap";
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
      <h1>
        WELCOME {props.UserInfo.firstname} {props.UserInfo.lastname}
      </h1>

      {props.errors.show && (
        <Alert className="register-error" variant="danger">
          {props.errors.errors[0].message}
        </Alert>
      )}
    </Container>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInfos)
);
