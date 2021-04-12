import React, { useState, useEffect } from "react";
import RegistrationForm from "../../Components/RegistrationForm";
import styled from "styled-components";

export default function Register(props) {
  const [myInfos, setMyInfos] = useState([]);

  const fetchInfos = async (props) => {
    try {
      const response = await fetch(
        `https://school-o-be.herokuapp.com/home/user/register/student/${props.match.params.token}`,
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
    console.log(myInfos);
    fetchInfos(props);
  }, []);

  return (
    <Container fluid>
      <RegistrationForm myInfos={myInfos} />
    </Container>
  );
}

const Container = styled.div`
  overflow-y: scroll;
  max-height: 100vh;
`;
