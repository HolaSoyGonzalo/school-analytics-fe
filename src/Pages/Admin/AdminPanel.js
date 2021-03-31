import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

import AddClassForm from "../../Components/Admin/AddClassForm";
import AddStudentForm from "../../Components/Admin/AddStudentForm";
import AddCourseForm from "../../Components/Admin/AddCourseForm";

export default function AdminPanel(props) {
  return (
    <Container>
      <PanelContainer fluid>
        <AddStudentContainer>
          <AddStudentForm />
        </AddStudentContainer>
        <AddClassContainer>
          <AddClassForm />
        </AddClassContainer>
        <AddCourseContainer>
          <AddCourseForm />
        </AddCourseContainer>
      </PanelContainer>
    </Container>
  );
}

const PanelContainer = styled.div`
  margin-top: 100px;
  max-height: 100vh;
  display: flex;
`;

const AddStudentContainer = styled.div``;

const AddClassContainer = styled.div``;

const AddCourseContainer = styled.div``;
