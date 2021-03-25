import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

import AddExamForm from "../../Components/Teacher/AddExam";

export default function NewExam(props) {
  return (
    <Container>
      <PanelContainer fluid>
        <AddExamContainer>
          <AddExamForm />
        </AddExamContainer>
      </PanelContainer>
    </Container>
  );
}

const PanelContainer = styled.div`
  margin-top: 100px;
  max-height: 100vh;
  display: flex;
`;

const AddExamContainer = styled.div``;
