import React, { useState, useEffect } from "react";

import UserInfos from "../../Components/Home/UserInfos";
import Wave from "../../Assets/Wave";
import styled from "styled-components";
import AdminNav from "../../Components/SideBar/AdminNav";

export default function AdminHome(props) {
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
      if (data.role === "student") {
        props.history.push("/user");
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
      <UserInfos UserInfo={UserInfo} />
      <Wave />
    </Container>
  );
}

const Container = styled.div`
  overflow-y: scroll;
  max-height: 100vh;
`;
