export const snapShot = (prediction) => {
  //get palm landmark
  const palmMark = prediction[0].landmarks[0];
  //get tip of middle finger for comparison
  const middleTip = prediction[0].landmarks[12];
  //get handsize in pixels by measuring distance between palm and middle finger tip
  const handSize = Math.sqrt(Math.pow(palmMark[0] - middleTip[0], 2) + Math.pow(palmMark[1] - middleTip[1], 2));
  //get palm y
  const palmY = palmMark[1];
  //get palm x
  const palmX = palmMark[0];
  return [palmX, palmY, handSize];
};
