export const sendActions = (predictions, intialPositions) => {
  console.log('waiting for action')
  //check for predictions
  if (predictions.length > 0) {
    //loop through predictions
    predictions.forEach((prediction) => {
      //get palm landmark
      const palmMark = prediction.landmarks[0];
      //get palm x and y
      const currentPalmY = palmMark[1];
      const currentPalmX = palmMark[0];
      //handSize
      const handSize = intialPositions[2];
      //calculate distance from initial position
      const distance = Math.sqrt(Math.pow(currentPalmX - intialPositions[0], 2) + Math.pow(currentPalmY - intialPositions[1], 2));
      const distanceToTrigger = handSize / 2; 
      //if palm moved more than hand length from initial position
      //movements are in relation to in real life movement
      if (currentPalmY > intialPositions[1] + distanceToTrigger) {
        alert('Action: down ------ Scrolling to next Post!');
      }
      if (currentPalmY < intialPositions[1] - distanceToTrigger) {
        alert('Action: up ------ Scrolling up to previous Post');
      }
      if (currentPalmX > intialPositions[0] + distanceToTrigger) {
        alert('Action: left ------ (if inside post: go back))');
      }
      if (currentPalmX < intialPositions[0] - distanceToTrigger) {
        alert('Action: right ------ Play / Pause / Click on Post');
      }
    });
  }
}