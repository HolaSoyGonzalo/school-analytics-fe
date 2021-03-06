import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Alert } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
//Styling/Animations
import styled from "styled-components";
import Spinner from "../Loaders/Spinner";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) =>
    dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const AddStudentForm = (props) => {
  const [inputData, setInputData] = useState({
    section: "",
    year: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const errorNotify = (message) => toast.error("Something went wrong");
  const successNotify = (message) => toast.success("Class Added with Success!");

  const registrationHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const newUser = {
        section: inputData.section,
        year: inputData.year,
      };
      const response = await fetch(
        `https://school-o-be.herokuapp.com/home/admin/class/add`,
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
            section: "",
            year: "",
          });
          successNotify("Class Added!");
        }, 1500);
      } else {
        errorNotify(data.errors);
        setLoading(false);
        setInputData({
          section: "",
          year: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputDataHandler = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    inputData.section.length !== 0 ? setDisabled(false) : setDisabled(true);
  }, [inputData]);
  return (
    <>
      <RegisterMainWrap>
        <RegisterMainContainer>
          <h5>Insert New Class</h5>

          {loading ? (
            <div className="spinner">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={registrationHandler}>
              <input
                name="section"
                type="section"
                placeholder="Section"
                value={inputData.section}
                required
                onChange={(event) => inputDataHandler(event)}
              />
              <input
                name="year"
                type="year"
                placeholder="Year"
                type=""
                value={inputData.year}
                required
                onChange={(event) => inputDataHandler(event)}
              />

              <Button type="submit" disabled={disabled}>
                Insert
              </Button>
              {props.errors.show && (
                <Alert className="register-error" variant="danger">
                  {props.errors.errors[0].message}
                </Alert>
              )}
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
  border: 0.1px solid #dbdbdb;
  border-radius: 5px;
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
    padding: 0px 10px;
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddStudentForm)
);
