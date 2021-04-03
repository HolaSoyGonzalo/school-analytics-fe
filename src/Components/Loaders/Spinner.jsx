import React from "react";
import styled, { keyframes } from "styled-components";

function Spinner() {
  return (
    <SkCircle className="sk-circle">
      <div className="sk-circle1 sk-child"></div>
      <div className="sk-circle4 sk-child"></div>
      <div className="sk-circle10 sk-child"></div>
    </SkCircle>
  );
}

const skCircleBounceDelay = keyframes`
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }`;

const SkCircle = styled.div`
  width: 50px;
  height: 50px;
  position: relative;

  .sk-child {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    :before {
      content: "";
      display: block;
      margin: 0 auto;
      width: 25%;
      height: 25%;
      background-color: #167c80;
      border-radius: 100%;
      -webkit-animation: ${skCircleBounceDelay} 1.2s infinite ease-in-out both;
      animation: ${skCircleBounceDelay} 1.2s infinite ease-in-out both;
    }
  }

  .sk-circle4 {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .sk-circle10 {
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  .sk-circle4:before {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .sk-circle10:before {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }
`;

export default Spinner;
