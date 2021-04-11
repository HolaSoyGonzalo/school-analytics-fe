import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
//Styling/Animations
import styled from "styled-components";
import Spinner from "../Loaders/Spinner";

const AddExamForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const successNotify = (message) =>
    toast.success("Exams Uploaded with Success!");
  const submitFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:9999/home/admin/uploadExams`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            Accept: "application/json",
          },
        }
      ).then((response) => response.json());
      setLoading(false);
      successNotify("All good!");
      // const data = await response.json();
      // console.log(data);
      // if (!data.errors) {
      //   setTimeout(() => {
      //     setLoading(false);
      //     props.history.push("/admin/addExam");
      //   }, 2000);
      // } else {
      //   props.setError([{ ...data.errors[0].msg }]);
      //   props.showErrors(true);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <RegisterMainWrap>
        <RegisterMainContainer>
          <h5>Insert New Exam</h5>

          {loading ? (
            <div className="spinner">
              <Spinner />
            </div>
          ) : (
            <form onSubmit={submitFile}>
              <input
                ref={register}
                onChange={(e) => setFile(e.currentTarget.files[0])}
                type="file"
                name="file"
              />

              <Button type="submit">Insert</Button>
              <Toaster />
            </form>
          )}
        </RegisterMainContainer>
      </RegisterMainWrap>
    </>
  );
};

const RegisterMainWrap = styled.div``;

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
    height: 51px;
    width: 175px;
    margin: 22px auto 12px;
  }
  > h5 {
    width: 200px;
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
    padding: 0px 5px;
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
      background-color: #167c80;
      padding: 4px;
      border: none;
      margin-top: 6px;
      transition: opacity 2s ease;
      :hover {
        background-color: #23acb1;
      }
      :disabled {
        opacity: 1;
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

export default withRouter(AddExamForm);
