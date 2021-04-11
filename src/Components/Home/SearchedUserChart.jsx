import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Chart from "chart.js";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) =>
    dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

const SearchedUserChart = (props) => {
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

  const englishChart = (data, labels) => {
    const canvas = document.querySelector("#englishChart");
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
      englishChart(dataForChart, labels);
    };
    thirdChart();
  }, [props.UserExam]);

  return (
    <Container >
      <Carousel fade>
        <Carousel.Item>
          <canvas id="mathChart"></canvas> 
        </Carousel.Item>
        <Carousel.Item>
          <canvas id="itChart"></canvas>
        </Carousel.Item>
        <Carousel.Item>
          <canvas id="englishChart"></canvas>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchedUserChart)
);
