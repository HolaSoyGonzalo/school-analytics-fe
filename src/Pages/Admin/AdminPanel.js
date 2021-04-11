import React from "react";
import styled from "styled-components";
import { Container, Tabs, Tab } from "react-bootstrap";
import AddClassForm from "../../Components/Admin/AddClassForm";
import AddStudentForm from "../../Components/Admin/AddStudentForm";
import AddCourseForm from "../../Components/Admin/AddCourseForm";

export default function AdminPanel(props) {
  return (
    <Container>
      <PanelContainer fluid>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
  <Tab eventKey="home" title="Home">
    <AddStudentForm />
    <AddClassForm />
    <AddCourseForm />
  </Tab>
  <Tab eventKey="profile" title="Profile">
  </Tab>
  <Tab eventKey="contact" title="Contact" >
  </Tab>
</Tabs>
        </PanelContainer>
    </Container>
  );
}

const PanelContainer = styled.div`
  margin-top: 50px;
  max-height: 100vh;
  
`;
