//// Breathing waves of mythic light by Ana Sofia Calixto
//// code created with p5.js and MDN Web Docs references image(), createCapture() and setTimeout(),
//// as well as help of various colleagues from the CompArts course
//// image(): https://p5js.org/reference/#/p5/image
//// createCapture(): https://p5js.org/reference/#/p5/createCapture
//// setTimeout(): https://developer.mozilla.org/en-US/docs/Web/API/setTimeout

let capture;
// delay between filming the person and playing the video
// adjust as needed to experiment with the code
let delayInSeconds = 240;
// how long the person is recorded
let recordDurationInSeconds = 60;
// how long the playback lasts
let playbackDurationInSeconds = 60;
let frames = [];

function setup() {
  createCanvas(640, 480);

  // try to create a video capture object
  try {
    capture = createCapture(VIDEO, onCaptureReady);
    capture.hide(); // hide the video to allow delay effect
  } catch (error) {
    console.error("Error creating capture:", error);
  }
}

function onCaptureReady() {
  console.log("Capture ready");
  // function called when the video capture is ready
  setTimeout(stopCapture, (delayInSeconds + recordDurationInSeconds) * 1000);
}

function stopCapture() {
  // function called to stop the video capture after the specified delay and record duration
  console.log("Stopping capture");
  try {
    capture.stop();
    frameRate(30); // set playback frame rate to 30 frames per second
    setTimeout(resetFrames, playbackDurationInSeconds * 1000);
  } catch (error) {
    console.error("Error stopping capture:", error);
  }
}

function resetFrames() {
  // function called to reset the captured frames after playback duration
  console.log("Resetting frames");
  frames = [];
}

function draw() {
  background(0);

  // display the captured video frames during the initial delay and recording duration
  if (frameCount > delayInSeconds * 30 && frameCount <= (delayInSeconds + recordDurationInSeconds) * 30) {
    frames.push(capture.get());
  }

  // play captured frames after the delay and recording duration
  if (frameCount > (delayInSeconds + recordDurationInSeconds) * 30 && frames.length > 0) {
    image(frames.shift(), 0, 0, width, height);
  }
}

// resize canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}