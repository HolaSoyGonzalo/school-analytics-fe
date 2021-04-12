import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Chart from "chart.js";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) =>
    dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const UserExamChart = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const mathChart = (data, labels) => {
    const canvas = document.querySelector("#mathChart");
    const ctx = canvas.getContext("2d");
    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,

        datasets: [
          {
            data: data,
            borderColor: "#00ff80",
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Results",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 10,
              },
            },
          ],
        },
      },
    });
  };

  const itChart = (data, labels) => {
    const canvas = document.querySelector("#itChart");
    const ctx = canvas.getContext("2d");
    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,

        datasets: [
          {
            data: data,

            borderColor: "#ff00aa",
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Math",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 10,
              },
            },
          ],
        },
      },
    });
  };

  const artChart = (data, labels) => {
    const canvas = document.querySelector("#artChart");
    const ctx = canvas.getContext("2d");
    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,

        datasets: [
          {
            data: data,

            borderColor: "#3700ff",
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Math",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 10,
              },
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    const firstChart = async () => {
      let studentExams = await props.UserExam.filter(
        (exam) => exam.courseId === 3
      );
      let dataForChart = [];
      let labels = [];
      await studentExams.forEach((exam) => {
        dataForChart.push({ x: exam.date, y: parseInt(exam.grade) });
        labels.push(` ${exam.date}`);
      });
      console.log(dataForChart);
      mathChart(dataForChart, labels);
    };
    firstChart();
    const secondChart = async () => {
      let studentExams = await props.UserExam.filter(
        (exam) => exam.courseId === 1
      );
      let dataForChart = [];
      let labels = [];
      await studentExams.forEach((exam) => {
        dataForChart.push({ x: exam.date, y: parseInt(exam.grade) });
        labels.push(` ${exam.date}`);
      });
      console.log(dataForChart);
      itChart(dataForChart, labels);
    };
    secondChart();
    const thirdChart = async () => {
      let studentExams = await props.UserExam.filter(
        (exam) => exam.courseId === 2
      );
      let dataForChart = [];
      let labels = [];
      await studentExams.forEach((exam) => {
        dataForChart.push({ x: exam.date, y: parseInt(exam.grade) });
        labels.push(` ${exam.date}`);
      });
      console.log(dataForChart);
      artChart(dataForChart, labels);
    };
    thirdChart();
  }, []);

  return (
    <Container>
      <NavContainer fluid>
        <Tabs defaultActiveKey="Art" id="uncontrolled-tab-example">
          <Tab eventKey="Art" title="Art">
            <PanelContainer fluid>
              <canvas id="artChart"></canvas>
            </PanelContainer>
          </Tab>{" "}
          <Tab eventKey="IT" title="IT">
            <PanelContainer fluid>
              <canvas id="itChart"></canvas>
            </PanelContainer>
          </Tab>
          <Tab eventKey="Math" title="Math">
            <CsvContainer fluid>
              <canvas id="mathChart"></canvas>
            </CsvContainer>
          </Tab>
        </Tabs>
      </NavContainer>
    </Container>
  );
};

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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserExamChart)
);
