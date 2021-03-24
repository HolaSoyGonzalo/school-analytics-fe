import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

export default function AdminPanel(props) {
  console.log("PORCO DIOOOOOO");
  return (
    <Container>
      <PanelContainer fluid>
        <h1>Hello There</h1>
      </PanelContainer>
    </Container>
  );
}

const PanelContainer = styled.div`
  margin-top: 100px;
  max-height: 100vh;
`;

const AddStudent = styled.div``;

const AddClass = styled.div``;

const AddCourse = styled.div``;
