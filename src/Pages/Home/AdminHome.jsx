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
      const response = await fetch("http://localhost:9999/home/user/me/", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
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
      const response = await fetch("http://localhost:9999/home/admin/exams/", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
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
        "http://localhost:9999/home/admin/classrooms/",
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
        "http://localhost:9999/home/admin/courses/",
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
           <Container>
           <h1>Exams Charts for: {props.SelectedStudentId}</h1>
          <span onClick={() => props.setSelectedStudentId(0)}>
            Back to Admin
          </span>
           </Container>
          
          <SearchedUserChart
            UserExam={AllExams.filter(
              (exam) => exam.userId === props.SelectedStudentId
            )}
          />
         
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 10vh;
  max-height: 100vh;
`;
