import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
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
          text: "Math",
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
          text: "Math",
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
      englishChart(dataForChart, labels);
    };
    thirdChart();
  }, []);

  return (
    <Container>
      <h2>Math</h2>
      <canvas id="mathChart"></canvas>
      <h2>IT</h2>
      <canvas id="itChart"></canvas>
      <h2>English</h2>
      <canvas id="englishChart"></canvas>
      {props.errors.show && (
        <Alert className="register-error" variant="danger">
          {props.errors.errors[0].message}
        </Alert>
      )}
    </Container>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserExamChart)
);
