import React, { useState, useEffect } from "react";
import { Container, Alert, Form, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Chart from "chart.js";
import { SubjectRounded } from "@material-ui/icons";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) =>
    dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const AdminExamChart = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [classroom, setClassroom] = useState(1);
  const [course, setCourse] = useState(1);
  const [written, setWritten] = useState(false);

  const studChart = (data, labels) => {
    const canvas = document.querySelector("#studentChart");
    const ctx = canvas.getContext("2d");
    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: data,
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

  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(course);
    console.log(classroom);
    generalChart();
  };

  const generalChart = async () => {
    let courseExams = await props.AllExams.filter(
      (exam) => exam.courseId === parseInt(course)
    );
    let classAndCourseExams = await courseExams.filter(
      (exam) => exam.user.classroomId === parseInt(classroom)
    );
    let written = await classAndCourseExams;
    console.log(classAndCourseExams);
    let examDate = [];
    let dataSet = [];
    await classAndCourseExams.forEach((exam) => {
      let studentInDataset = dataSet.findIndex(
        (student) => student.id === exam.userId
      );
      if (studentInDataset >= 0) {
        dataSet[studentInDataset].data.push({
          x: exam.date,
          y: parseFloat(exam.grade),
        });
      } else {
        let data = [
          {
            x: exam.date,
            y: parseFloat(exam.grade),
          },
        ];
        let label = ` ${exam.user.firstname} ${exam.user.lastname}`;
        dataSet.push({
          id: exam.userId,
          data: data,
          label: label,
          backgroundColor: "transparent",
          borderColor: randomColor(),
        });
      }
      if (examDate.indexOf(exam.date) < 0) {
        examDate.push(exam.date);
      }
    });
    console.log(dataSet);
    studChart(dataSet, examDate);
  };

  useEffect(() => {
    console.log("triggered");
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
