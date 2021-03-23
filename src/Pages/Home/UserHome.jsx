import React, { useState, useEffect } from "react";
import UserInfos from "../../Components/Home/UserInfos";
import Wave from "../../Assets/Wave";
import styled from "styled-components";
import { accessToken } from "../../api";

export default function UserHome(props) {
  const [UserInfo, setUserInfo] = useState([]);

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

  useEffect(() => {
    fetchInfos(props);
  }, []);

  return (
    <Container fluid>
      <h1>User</h1>
      <UserInfos UserInfo={UserInfo} />
      <Wave />
    </Container>
  );
}

const Container = styled.div`
  overflow-y: scroll;
  max-height: 100vh;
`;
