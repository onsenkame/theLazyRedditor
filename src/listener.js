//landmarks: 0 is palm
const fingerLandmarks = {
  indexFinger: [5, 6, 7, 8],
  middleFinger: [9, 10, 11, 12],
  ringFinger: [13, 14, 15, 16],
  pinky: [17, 18, 19, 20]
}

// make net for hand for visualization
export const listenChecker = (predictions) => {
  //check for predictions
  const deviation = 0.3;
  let straightCount = 0;
  if (predictions.length > 0) {
    //loop through predictions
    predictions.forEach((prediction) => {
      //get landmarks
      const landmarks = prediction.landmarks;
      //loop through fingers
      for (let finger in fingerLandmarks) {
        const slopeAB = (landmarks[fingerLandmarks[finger][3]][1] - landmarks[fingerLandmarks[finger][2]][1]) / (landmarks[fingerLandmarks[finger][3]][0] - landmarks[fingerLandmarks[finger][2]][0]);
        const slopeAC = (landmarks[fingerLandmarks[finger][3]][1] - landmarks[fingerLandmarks[finger][1]][1]) / (landmarks[fingerLandmarks[finger][3]][0] - landmarks[fingerLandmarks[finger][1]][0]);
        const over = (slopeAC * (1+deviation));
        const under = (slopeAC * (1-deviation));
        if (slopeAB < over && slopeAB > under) {
          console.log('straight enough', slopeAB, slopeAC)
          straightCount++;
        }
      }
    });
  }
  return straightCount;
};
