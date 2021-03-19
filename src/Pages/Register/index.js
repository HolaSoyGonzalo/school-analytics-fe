import React, { useState, useEffect } from "react";
import RegistrationModal from "./registrationModal";
import styled from "styled-components";

export default function Register() {
  const [myInfos, setMyInfos] = useState([]);

  const fetchInfos = async (props) => {
    try {
      const response = await fetch(
        `http://localhost:9999/home/user/register/student/21e0b856-39ef-4119-b4e4-0f40764513e3`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      setMyInfos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfos();
  }, []);

  return (
    <Container fluid>
      <RegistrationModal myInfos={myInfos} />
    </Container>
  );
}

const Container = styled.div`
  overflow-y: scroll;
  max-height: 100vh;
`;
