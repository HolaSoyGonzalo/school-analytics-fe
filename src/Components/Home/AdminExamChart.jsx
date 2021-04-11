import React, { useState, useEffect } from "react";
import { Container, Alert, Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Chart } from "chart.js";
import styled from "styled-components";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) =>
    dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const AdminExamChart = (props) => {
  const [classroom, setClassroom] = useState(1);
  const [course, setCourse] = useState(1);
  const [dataSet, setDataSet] = useState({});

  const [graphNode, setGraphNode] = useState(null);

  const studChart = (data, labels) => {
    if (graphNode) {
      graphNode.destroy();
    }
    const canvas = document.querySelector("#studentChart");
    const ctx = canvas.getContext("2d");
    let myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: data,
      },
      options: {
        responsive: true,

        legend: {
          position: "bottom",
          align: "center",
          maxHeight: 400,
          maxWidth: 200,
          labels: {
            usePointStyle: true,
          },
        },
        title: {
          display: true,
          style: "bold",
          text: "Classroom's Trend",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 2,
                max: 10,
              },
            },
          ],
        },
      },
    });

    setGraphNode(myLineChart);
  };
  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const sortDate = (a, b) => {
    let aDate = new Date(a).getTime();
    let bDate = new Date(b).getTime();
    return aDate - bDate;
  };

  const sortDataset = (a, b) => {
    let aDate = new Date(a.x).getTime();
    let bDate = new Date(b.x).getTime();
    return aDate - bDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generalChart();
  };

  const generalChart = async () => {
    let courseExams = await props.AllExams.filter(
      (exam) => exam.courseId === parseInt(course)
    );
    let classAndCourseExams = await courseExams.filter(
      (exam) => exam.user.classroomId === parseInt(classroom)
    );

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
          borderWidth: 1.6,
          tension: 0.15,
          borderColor: randomColor(),
          pointStyle: "rect",
          pointRadius: 5,
        });
      }

      if (examDate.indexOf(exam.date) < 0) {
        examDate.push(exam.date);
      }
    });
    await examDate.sort(sortDate);
    await dataSet.forEach((set) => {
      set.data.sort(sortDataset);
    });
    studChart(dataSet, examDate);
  };

  useEffect(() => {
    generalChart();
  }, []);

  return (
    <Container className="pb-5 ">
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
        <Button type="submit">Submit</Button>
      </Form>
      <hr />
      <canvas id="studentChart"></canvas>
      {props.errors.show && (
        <Alert className="register-error" variant="danger">
          {props.errors.errors[0].message}
        </Alert>
      )}
    </Container>
  );
};

const Button = styled.button`
  height: 40px;
  width: 100px;
  background-color: #167c80;
  color: white;
  border: 0;
  font-family: "Poppins", sans-serif !important;
  border-radius: 10px 10px 10px 10px;
  :hover {
    background-color: #1f9ca0;
  }
`;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminExamChart)
);
