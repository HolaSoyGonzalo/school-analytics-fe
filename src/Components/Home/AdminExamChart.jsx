import React, { useState, useEffect } from "react";
import { Container, Alert, Form, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Chart from "chart.js";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) =>
    dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const AdminExamChart = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [classroom, setClassroom] = useState();
  const [course, setCourse] = useState(1);
  const [written, setWritten] = useState(false);

  const studChart = (data, labels) => {
    const canvas = document.querySelector("#studentChart");
    const ctx = canvas.getContext("2d");
    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,

        datasets: [
          {
            data: data,
            borderColor: "#00ff80",
            backgroundColor: "transparent",
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Research",
        },
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const generalChart = async () => {
    let courseExams = await props.AllExams.filter(
      (exam) => exam.courseId === course
    );
    let classAndCourseExams = await courseExams.filter(
      (exam) => exam.user.classroomId === classroom
    );
    let dataForChart = [];
    let labels = [];
    await classAndCourseExams.forEach((exam) => {
      dataForChart.push({ x: exam.date, y: parseInt(exam.grade) });
      labels.push(` ${exam.date}`);
    });
    console.log(dataForChart);
    studChart(dataForChart, labels);
  };

  useEffect(() => {
    console.log(props);
    generalChart();
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Class</Form.Label>
            <Form.Control
              onChange={(e) => {
                setClassroom(e.currentTarget.value);
              }}
              as="select"
              defaultValue="Choose..."
            >
              {props.AllClasses.map((Class) => (
                <option value={Class.id}>{Class.year + Class.section}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Course</Form.Label>
            <Form.Control
              onChange={(e) => {
                setCourse(e.currentTarget.value);
              }}
              as="select"
              defaultValue="Choose..."
            >
              {props.AllCourses.map((Course) => (
                <option value={Course.id}>{Course.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Is Written ? " />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <hr />
      <h2>Results</h2>
      <canvas id="studentChart"></canvas>
      {props.errors.show && (
        <Alert className="register-error" variant="danger">
          {props.errors.errors[0].message}
        </Alert>
      )}
    </Container>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminExamChart)
);
