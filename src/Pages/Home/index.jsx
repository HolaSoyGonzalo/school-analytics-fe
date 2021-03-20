import React, { useState, useEffect } from "react";
import UserInfos from "../../Components/Home/UserInfo";
import Wave from "../../Assets/Wave";
import styled from "styled-components";

export default function Home(props) {
  const [UserInfo, setUserInfo] = useState([]);

  const fetchInfos = async () => {
    try {
      const response = await fetch("http://localhost:9999/home/user/me/", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
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
