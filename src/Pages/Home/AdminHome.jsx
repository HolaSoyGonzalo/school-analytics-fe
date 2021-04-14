import React, { useState, useEffect } from "react";
import UserInfos from "../../Components/Home/UserInfos";

import AdminExamChart from "../../Components/Home/AdminExamChart";
import styled from "styled-components";
import SearchedUserChart from "../../Components/Home/SearchedUserChart";

export default function AdminHome(props) {
  const [UserInfo, setUserInfo] = useState([]);
  const [AllExams, setAllExams] = useState([]);
  const [AllCourses, setAllCourses] = useState([]);
  const [AllClasses, setAllClasses] = useState([]);
  const [SingleStudentExams, setSingleStudentExams] = useState([]);

  const fetchInfos = async () => {
    try {
      const response = await fetch(
        "https://school-o-be.herokuapp.com/home/user/me/",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const data = await response.json();

      if (data.role === "student") {
        props.history.push("/user");
      }
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await fetch(
        "https://school-o-be.herokuapp.com/home/admin/exams/",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setAllExams(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClass = async () => {
    try {
      const response = await fetch(
        "https://school-o-be.herokuapp.com/home/admin/classrooms/",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setAllClasses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await fetch(
        "https://school-o-be.herokuapp.com/home/admin/courses/",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setAllCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfos();
    fetchExams();
    fetchCourse();
    fetchClass();
  }, []);

  return (
    <Container fluid>
      {props.SelectedStudentId === 0 ? (
        <>
          {UserInfo && <UserInfos UserInfo={UserInfo} />}
          {AllExams.length > 0 &&
            UserInfo &&
            AllCourses.length > 0 &&
            AllClasses.length > 0 && (
              <AdminExamChart
                AllExams={AllExams}
                UserInfo={UserInfo}
                AllClasses={AllClasses}
                AllCourses={AllCourses}
              />
            )}
        </>
      ) : (
        <>
          <ContainerSearched>
            <SearchedUserChart
              UserExam={AllExams.filter(
                (exam) => exam.userId === props.SelectedStudentId
              )}
            />
            <Button onClick={() => props.setSelectedStudentId(0)}>
              Back to Admin
            </Button>
          </ContainerSearched>
        </>
      )}
    </Container>
  );
}

const Button = styled.button`
  width: 268px;
  height: 30px;
  font-weight: 500;
  color: #ffffff;
  background-color: #167c80;
  padding: 4px;
  border: none;
  margin-top: 10px;

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
const Container = styled.div`
  margin-top: 6vh;
  max-height: 100vh;
`;
const ContainerSearched = styled.div`
  text-align: center;
`;
