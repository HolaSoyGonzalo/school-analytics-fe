import React from "react";

import { Card } from "react-bootstrap";
import styled from "styled-components";

import LoginForm from "./LoginForm";

import { withRouter, Link } from "react-router-dom";

function LoginCard() {
  return (
    <>
      <Card style={{ width: "21rem" }} className="register-form login-form">
        <Card.Body>
          <div className="reg-form-header">
            {/* <img src={logo2} /> */}
            <LoginForm />
          </div>
        </Card.Body>
      </Card>
      <Card style={{ width: "21rem" }} className="login"></Card>
    </>
  );
}
export default withRouter(LoginCard);
