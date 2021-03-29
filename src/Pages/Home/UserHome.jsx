import React, { useState, useEffect } from "react";
import UserInfos from "../../Components/Home/UserInfos";
import ExamChart from "../../Components/Home/ExamChart";
import Wave from "../../Assets/Wave";
import styled from "styled-components";

export default function UserHome(props) {
  const [UserInfo, setUserInfo] = useState([]);
  const [UserExam, setUserExam] = useState([]);

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
      console.log(data);
      if (data.role === "admin") {
        props.history.push("/admin");
      }
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchExams = async () => {
    try {
      const response = await fetch("http://localhost:9999/home/user/exams/", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      const data = await response.json();
      console.log(data);

      setUserExam(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfos(props);
    fetchExams(props);
  }, []);

  return (
    <Container fluid>
      {UserInfo && <UserInfos UserInfo={UserInfo} />}
      {UserExam.length > 0 && UserInfo && (
        <ExamChart UserExam={UserExam} UserInfo={UserInfo} />
      )}
      <Wave />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 10vh;

  max-height: 100vh;
`;
