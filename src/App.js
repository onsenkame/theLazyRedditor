import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { type } from "@testing-library/user-event/dist/type";
import { handVis } from "./debugUtils";
import { listenChecker } from "./listener";
import { sendActions } from "./sendActions";
import { snapShot } from "./snapShot";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let straightCounter = 0;
  let recordingInput = false;
  let handSnapShot = [];

  const runHandpose = async () => {
    const model = await handpose.load();
    console.log("model loaded");
    // Loop interval to look for hands
    setInterval(() => {
      detect(model);
    }, 100);
  };

  const detect = async (model) => {
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
      //returns 1-4 based on number straight fingers
      let listening = listenChecker(hand);
      straightCounter += listening;
      //waits for straightCounter to reach 100, then begins action calculation
      startListening(listening, hand);
      //send info to sendActions
      if (recordingInput) {
        sendActions(hand, handSnapShot);
      }
    }
  };

  const startListening = (listening, hand) => {
    if (straightCounter > 0 && listening === 0) {
      straightCounter -= 5;
    }
    if (straightCounter > 0) {
      straightCounter -= 1;
    }
    if (straightCounter >= 40) {
      setTimeout(stopListening, 3000);
      // [palm x, palm y, palm to tip of middle finger distance]
      handSnapShot = snapShot(hand);
      console.log('handSnapShot set', handSnapShot);
      recordingInput = true;
      straightCounter = 0;
    }
    console.log("straightCounter", straightCounter);
  };

  const stopListening = () => {
    recordingInput = false;
    handSnapShot = [];
  }

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
            zindex: 9,
            width: 640,
            height: 480,
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
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
