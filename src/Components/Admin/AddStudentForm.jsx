import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
//Styling/Animations
import styled from "styled-components";
import Spinner from "../Loaders/Spinner";

const AddStudentForm = (props) => {
  const [inputData, setInputData] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
    gender: "",
    email: "",
    role: "",
    classroomId: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const errorNotify = (message) => toast.error("Something went wrong");
  const successNotify = (message) =>
    toast.success("Student Added with Success!");

  const registrationHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const newUser = {
        firstname: inputData.firstname,
        lastname: inputData.lastname,
        birthday: inputData.birthday,
        gender: inputData.gender,
        email: inputData.email,
        role: inputData.role,
        classroomId: inputData.classroomId,
      };
      const response = await fetch(
        `https://school-o-be.herokuapp.com/home/admin/students/add`,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (!data.errors) {
        setTimeout(() => {
          setLoading(false);
          setInputData({
            firstname: "",
            lastname: "",
            birthday: "",
            gender: "",
            email: "",
            role: "",
            classroomId: "",
          });
          successNotify("New Student Added!");
        }, 1500);
      } else {
        errorNotify(data.errors);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputDataHandler = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    inputData.firstname.length !== 0 ? setDisabled(false) : setDisabled(true);
  }, [inputData]);
  return (
    <>
      <RegisterMainWrap>
        <RegisterMainContainer>
          <h5>Insert New Student </h5>

          {loading ? (
            <div className="spinner">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={registrationHandler}>
              {" "}
              <input
                name="firstname"
                placeholder="Student Firstname"
                value={inputData.firstname}
                onChange={(event) => inputDataHandler(event)}
              />
              <input
                name="lastname"
                placeholder="Student Lastname"
                value={inputData.lastname}
                onChange={(event) => inputDataHandler(event)}
              />
              <input
                name="birthday"
                placeholder="Student birthday"
                type="date"
                value={inputData.birthday}
                onChange={(event) => inputDataHandler(event)}
              />
              <input
                name="gender"
                placeholder="Student gender"
                value={inputData.gender}
                onChange={(event) => inputDataHandler(event)}
              />
              <input
                name="email"
                placeholder="Student email"
                value={inputData.email}
                onChange={(event) => inputDataHandler(event)}
              />
              <input
                name="role"
                placeholder="student"
                value="student"
                onChange={(event) => inputDataHandler(event)}
              />
              <input
                name="classroomId"
                placeholder="Student classroomId"
                value={inputData.classroomId}
                onChange={(event) => inputDataHandler(event)}
              />
              <Button type="submit" disabled={disabled}>
                Insert
              </Button>
              <Toaster />
            </form>
          )}
        </RegisterMainContainer>
      </RegisterMainWrap>
    </>
  );
};

const RegisterMainWrap = styled.div``;

const Button = styled.button`
  width: 268px;
  height: 30px;
  font-weight: 500;
  color: #ffffff;
  background-color: #167c80;
  padding: 4px;
  border: none;
  margin-top: 6px;
  transition: opacity 2s ease;
  :hover {
    background-color: #23acb1;
  }
  :focus {
    background-color: #2ecdd3;
  }
  :disabled {
    opacity: 0.5;
  }
`;

const RegisterMainContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
    width: 200px;
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
    padding: 0px 15px;
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

export default withRouter(AddStudentForm);
