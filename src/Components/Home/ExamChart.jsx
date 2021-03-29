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

const ExamChart = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const lineChart = (data, labels) => {
    const canvas = document.querySelector("#lineChart");
    const ctx = canvas.getContext("2d");

    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,

        datasets: [
          {
            data: data,
            backgroundColor: "rgba(220,0,0,0.3)",
            borderColor: "#00ff80",
          },
        ],
      },
      options: {},
    });
  };

  useEffect(() => {
    const createChart = async () => {
      let studentExams = await props.UserExam;
      let dataForChart = [];
      let labels = [];
      await studentExams.forEach((exam) => {
        dataForChart.push({ x: exam.date, y: parseInt(exam.grade) });
        labels.push(`${exam.date}`);
      });
      console.log(dataForChart);
      lineChart(dataForChart, labels);
    };
    createChart();
  }, []);

  return (
    <Container>
      <canvas id="lineChart"></canvas>
      {props.errors.show && (
        <Alert className="register-error" variant="danger">
          {props.errors.errors[0].message}
        </Alert>
      )}
    </Container>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExamChart)
);
