import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

import AddStudentsCSV from "../../Components/Admin/AddStudents";
import AddExamForm from "../../Components/Teacher/AddExam";

export default function NewExam(props) {
  return (
    <Container>
      <PanelContainer fluid>
        <AddExamContainer>
          <AddExamForm />
        </AddExamContainer>
        <AddStudentsCSVContainer>
          <AddStudentsCSV />
        </AddStudentsCSVContainer>
      </PanelContainer>
    </Container>
  );
}

const PanelContainer = styled.div`
  margin-top: 100px;
  max-height: 100vh;
  display: flex;
  justify-content: space-evenly;
`;

const AddExamContainer = styled.div``;
const AddStudentsCSVContainer = styled.div``;
