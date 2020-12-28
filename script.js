let audioElement = document.getElementById("audio");
let recordButton = document.getElementById("record-button");
let stopButton = document.getElementById("stop-button");

let chunks = [];
let recorder = null;

const main = async () => {
  try {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // we only need audio
  } catch (error) {
    console.log(error);
  }
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = saveCurrentRecording;
  recorder.onstop = sendToMediaPlayer;
};

const saveCurrentRecording = (event) => {
  chunks.push(event.data);
  console.log(chunks);
};

const sendToMediaPlayer = () => {
  const blob = new Blob(chunks, {
    type: "audio/mp4; codecs=opus",
  });
  const url = URL.createObjectURL(blob);
  audioElement.setAttribute("src", url);

  //clear the recorded chunks if preferred
  chunks = [];
};
const startRecording = () => {
  recorder.start();
  recordButton.disabled = true;
  recordButton.classList.add("red");
  stopButton.classList.remove("red");
  recordButton.innerText = "Recording...";
  stopButton.disabled = false;
};
const stopRecording = () => {
  recorder.stop();
  recordButton.disabled = false;
  recordButton.classList.remove("red");
  stopButton.disabled = true;
  recordButton.innerText = "Record";

  stopButton.classList.add("red");
};
main();
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
