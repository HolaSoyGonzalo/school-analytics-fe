import React from "react";
import styled from "styled-components";
import { Container, Tabs, Tab } from "react-bootstrap";

import AddClassForm from "../../Components/Admin/AddClassForm";
import AddStudentForm from "../../Components/Admin/AddStudentForm";
import AddTeacherForm from "../../Components/Admin/AddTeacherForm";
import AddCourseForm from "../../Components/Admin/AddCourseForm";
import AddStudentsCSV from "../../Components/Admin/AddStudents";
import AddExamForm from "../../Components/Admin/AddExam";

export default function AdminPanel(props) {
  return (
    <Container>
      <NavContainer fluid>
        <Tabs defaultActiveKey="Student/Teacher" id="uncontrolled-tab-example">
          <Tab eventKey="Student/Teacher" title="Add User">
            <PanelContainer fluid>
              <AddStudentForm />
              <AddTeacherForm />
            </PanelContainer>
          </Tab>{" "}
          <Tab eventKey="Courses/Classes" title="Courses/Classes">
            <PanelContainer fluid>
              <AddClassForm />
              <AddCourseForm />
            </PanelContainer>
          </Tab>
          <Tab eventKey="CSV" title="CSV">
            <CsvContainer fluid>
              <AddStudentsCSV />
              <AddExamForm />
            </CsvContainer>
          </Tab>
        </Tabs>
      </NavContainer>
    </Container>
  );
}

const NavContainer = styled.div`
  margin-top: 50px;
  max-height: 100vh;
  justify-content: space-evenly;
  a {
    color: black !important;
  }
`;
const PanelContainer = styled.div`
  max-height: 100vh;
  display: flex;
  justify-content: space-between;
`;

const CsvContainer = styled.div`
  max-height: 100vh;
  display: flex;
  justify-content: space-between;
`;
