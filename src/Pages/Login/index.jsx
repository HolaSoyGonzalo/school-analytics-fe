import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import Spinner from "../../Components/Loaders/Spinner";
import Logo from "../../Assets/logo.png";
const Login = (props) => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:9999/home/user/login", {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 403) {
        alert("Not authenticated");
        setLoading(false);
        return;
      }
      const data = await response.json();
      console.log(data);
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        console.log(data.accessToken);
        console.log(data.refreshToken);
        setLoading(false);
        if (data.role === "student") {
          props.history.push("/user");
        } else {
          props.history.push("/admin");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputDataHandler = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
    if (event.keyCode === 13) {
      loginHandler();
    }
  };

  useEffect(() => {
    inputData.email.length !== 0 && inputData.password.length !== 0
      ? setDisabled(false)
      : setDisabled(true);
  }, [inputData]);

  return (
    <>
      <LoginMainWrap>
        <LoginMainContainer>
          {loading ? (
            <div className="spinner">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={loginHandler}>
              <div className="title mb-2">
                <img
                  src={Logo}
                  style={{ maxWidth: "70px", maxHeight: "70px" }}
                  alt="logo"
                />
                <h3>School-O</h3>
              </div>
              <input
                name="email"
                placeholder="Email "
                required
                value={inputData.email}
                onChange={(event) => inputDataHandler(event)}
              />
              <input
                name="password"
                placeholder="Password"
                type="password"
                required
                value={inputData.password}
                onChange={(event) => inputDataHandler(event)}
              />
              <Button type="submit" disabled={disabled}>
                Log In
              </Button>
            </form>
          )}
        </LoginMainContainer>
      </LoginMainWrap>
    </>
  );
};

const LoginMainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 88vh;
`;

const LoginMainContainer = styled.div`
  background-color: white;
  border: 1px solid grey;
  border-radius: 1px;
  padding: 10px 0;
  margin: 0 0 10px;
  text-align: center;

  .spinner {
    display: flex;
    justify-content: center;
    padding: 30px 149px 26px;
  }

  > h1 {
    background-repeat: no-repeat;
    background-position: 0 -130px;
    height: 51px;
    width: 175px;
    margin: 22px auto 12px;
  }

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 0px;
    flex: 0 0 auto;
    padding: 0px 40px;

    .register-error {
      margin: 0;
      margin-top: 10px;
      background-color: transparent;
      border: none;
      color: red;
      padding: 0 12px;
      max-width: 268px;
      font-size: 14px;
    }
    > input {
      width: 268px;
      padding: 6px;
      margin: 0px 0px 10px;
      border: 1px solid grey;
      border-radius: 3px;
      background-color: rgba(218, 218, 218, 0.1);
      font-size: 14px;

      ::placeholder {
        color: rgba(38, 38, 38, 0.5);
        font-size: 0.75rem;
      }
      :focus {
        outline: none;
      }
    }
    > button {
      width: 100%;
      height: 30px;
      font-weight: 500;
      font-size: 0.9rem;
      background-color: lightblue;
      padding: 4px;
      border: none;
      transition: opacity 0.25s ease;
      :disabled {
        opacity: 0.3;
      }
    }
  }
`;

export default Login;
