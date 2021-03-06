import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
//Styling/Animations
import styled from "styled-components";
import Spinner from "../Loaders/Spinner";

const RegistrationForm = (props) => {
  const [inputData, setInputData] = useState({
    password: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  console.log(props.myInfos);
  const registrationHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const newUser = {
        password: inputData.password,
      };
      const response = await fetch(
        `https://school-o-be.herokuapp.com/home/user/register/student/${props.match.params.token}`,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      props.history.push("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const inputDataHandler = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    inputData.password.length !== 0 ? setDisabled(false) : setDisabled(true);
  }, [inputData]);

  return (
    <>
      <RegisterMainWrap>
        <RegisterMainContainer>
          <h5>Welcome to School-O</h5>
          {loading ? (
            <div className="spinner">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={registrationHandler}>
              <input name="firstname" value={props.myInfos.firstname} />
              <input name="lastname" value={props.myInfos.lastname} />
              <input
                name="dob"
                placeholder="DOB HERE"
                type="date"
                value={props.myInfos.birthday}
              />

              <input name="gender" value={props.myInfos.gender} />
              <input name="email" type="email" value={props.myInfos.email} />
              <h5
                style={{
                  width: "268px",
                  margin: " 0 auto",
                  fontSize: "17px",
                  color: " grey",
                  marginBottom: "10px",
                }}
              >
                Choose your password
              </h5>
              <input
                name="password"
                placeholder="Password"
                type="password"
                required
                value={inputData.password}
                onChange={(event) => inputDataHandler(event)}
              />
              <Button type="submit" disabled={disabled}>
                Confirm
              </Button>
            </form>
          )}
        </RegisterMainContainer>
      </RegisterMainWrap>
    </>
  );
};

const RegisterMainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 88vh;
`;

const RegisterMainContainer = styled.div`
  background-color: white;
  border: 1px solid grey;
  border-radius: 1px;
  padding: 10px 0 20px;
  margin: 0 0 10px;
  text-align: center;

  .spinner {
    display: flex;
    justify-content: center;
    padding: 30px 149px 20px;
  }
  > h1 {
    background-repeat: no-repeat;
    background-position: 0 -130px;
    height: 51px;
    width: 175px;
    margin: 22px auto 12px;
  }
  > h5 {
    width: 268px;
    margin: 0 auto;
    font-size: 17px;
    color: grey;
  }
  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    flex: 0 0 auto;
    padding: 0px 40px;
    font-size: 14px;
    > input {
      width: 268px;
      padding: 6px;
      margin: 0px 0px 10px;
      border: 1px solid grey;
      border-radius: 3px;
      background-color: rgba(218, 218, 218, 0.1);
      ::placeholder {
        color: rgba(38, 38, 38, 0.5);
        font-size: 0.75rem;
      }
      :focus {
        outline: none;
      }
    }
    > button {
      width: 268px;
      height: 30px;
      font-weight: 500;
      font-size: 0.9rem;
      background-color: lightblue;
      padding: 4px;
      border: none;
      margin-top: 6px;
      transition: opacity 0.25s ease;
      :disabled {
        opacity: 0.3;
      }
    }
    > p {
      width: 268px;
      font-size: 12px;
      color: lightgrey;
      margin: 16px 0;
    }
    .register-error {
      margin: 0;
      margin-top: 10px;
      background-color: transparent;
      border: none;
      color: red;
      padding: 0 12px;
      max-width: 268px;
    }
    .register-success {
      margin: 0;
      margin-top: 10px;
      background-color: transparent;
      border: none;
      color: lightblue;
      padding: 0 12px;
      max-width: 268px;
      display: flex;
      align-items: center;
    }
  }
`;

export default withRouter(RegistrationForm);
