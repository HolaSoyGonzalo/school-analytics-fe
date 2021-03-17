import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, withRouter, Link } from "react-router-dom";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  loginUser: (credentls) =>
    dispatch({
      type: "LOGIN_USER",
      payload: credentls,
    }),
  loginUserWithThunk: (credentls) =>
    dispatch(async (dispatch, getState) => {
      try {
        const response = await fetch(
          "https://school-analytics-be.herokuapp.com/home/users/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(credentls),
          }
        );
        if (response.ok) {
          const resp = await response.json();
          dispatch({
            type: "LOGIN_USER",
            payload: resp,
          });
          console.log(response, "login response");
        }
      } catch (error) {
        console.log(error);
      }
    }),
});

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.loginUserWithThunk({ email, password });
    props.history.push("/");
  };
  const user = useSelector((state) => state.loggedInUser);
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <LoginFormStyled>
          <input
            required
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email or email"
          />
          <input
            type="password"
            required
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </LoginFormStyled>
        <LoginButtonStyled type="submit">Log In</LoginButtonStyled>
      </Form>
    </>
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);

const LoginFormStyled = styled.div`
  margin-top: 2rem;
  margin-bottom: 10px;
  input {
    margin-bottom: 5px;
    width: 17rem;
    background-color: #fafafa;
    border: 1px rgb(211, 211, 211) solid;
    padding: 7px;
    font-size: 13px;
  }
  input:focus {
    outline: rgb(167, 167, 167) !important;
  }
`;

const LoginButtonStyled = styled.div`
  background-color: rgba(var(--d69, 0, 149, 246), 1);
  color: white;
  border: 0px;
  padding: 5px;
  width: 17rem;
  margin-top: 7px;
  font-size: 14px;
  font-weight: bold;
`;
