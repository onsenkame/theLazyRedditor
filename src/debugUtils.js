// make net for hand for visualization
export const handVis = (predictions, canvasView) => {
  //check for predictions
  if (predictions.length > 0) {
    //loop through predictions
    predictions.forEach((prediction) => {
      //get landmarks
      const landmarks = prediction.landmarks;
      //loop through landmarks and draw
      for (let i = 0; i < landmarks.length; i++) {
        // get points
        const x = landmarks[i][0];
        const y = landmarks[i][1];
        //draw
        canvasView.beginPath();
        canvasView.arc(x, y, 2, 0, 2 * Math.PI);
        //line color
        canvasView.fillStyle = "red";
        canvasView.fill();
      }
    });
  }
};
