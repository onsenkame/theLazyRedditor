import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { type } from "@testing-library/user-event/dist/type";
import { handVis } from "./debugUtils";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const model = await handpose.load();
    console.log("model loaded");
    // Loop interval to look for hands
    setInterval(() => {
      detect(model)
    }, 100);
  };

  const detect = async (model) => {
    console.log("this is hand model and props", model)
    //get data from webcam
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
    //get video props
    const video = webcamRef.current.video;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    //set video w and h
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;
    //set canvas w and h
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
    //detect hands
    const hand = await model.estimateHands(video);
    console.log(hand);
    //draw hand
    const canvasView = canvasRef.current.getContext("2d");
    handVis(hand, canvasView);
    }
  };

  runHandpose();
  
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex:9,
            width:640,
            height:480
          }}
        />
        <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex:9,
          width:640,
          height:480
        }}
        />
      </header>
    </div>
  );
}

export default App;
