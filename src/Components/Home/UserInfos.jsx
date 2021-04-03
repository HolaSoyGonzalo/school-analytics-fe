import React, { useState } from "react";
import { Container, Alert, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
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
      <TitleContainer>
        <Title>
          <h1>
            Welcome {"  "}
            <span>
              {props.UserInfo.firstname} {props.UserInfo.lastname}
            </span>
          </h1>
          <hr style={{ width: "100%" }} />
        </Title>
      </TitleContainer>

      {props.errors.show && (
        <Alert className="register-error" variant="danger">
          {props.errors.errors[0].message}
        </Alert>
      )}
    </Container>
  );
};

const TitleContainer = styled.div`
  margin-top: 10vh;
  max-height: 100vh;
  max-width: 50%;
`;

const Title = styled.div`
  margin-top: 10vh;
  max-height: 100vh;

  h1 {
    font-weight: bold;
    color: #167c80;
  }

  span {
    font-weight: 300;
  }
`;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInfos)
);
