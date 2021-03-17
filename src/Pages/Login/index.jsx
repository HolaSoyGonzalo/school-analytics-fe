import { Container } from "react-bootstrap";
import styled from "styled-components";
import React from "react";
import Card from "../../Components/LoginPage/LoginCard";

export default function Login() {
  return (
    <Container>
      <LoginContainer>
        <Card />
      </LoginContainer>
    </Container>
  );
}

const LoginContainer = styled.div`
  text-align: -webkit-center;
  margin-top: 8rem;
`;
