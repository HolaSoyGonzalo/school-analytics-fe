import React, { useState, useEffect } from "react";
import RegistrationModal from "../../Components/RegistrationForm";
import styled from "styled-components";

export default function Register(props) {
  const [myInfos, setMyInfos] = useState([]);

  const fetchInfos = async (props) => {
    try {
      const response = await fetch(
        `http://localhost:9999/home/user/register/student/${props.match.params.token}`,
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
    fetchInfos(props);
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
