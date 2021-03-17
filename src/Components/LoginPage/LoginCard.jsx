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
            <div className="hrs">
              <p className="ml-3 mr-3 text-muted mt-3">OR</p>
            </div>
            <p>Forgot password?</p>
          </div>
        </Card.Body>
      </Card>
      <Card style={{ width: "21rem" }} className="login">
        <Card.Body>
          <div>
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
export default withRouter(LoginCard);
