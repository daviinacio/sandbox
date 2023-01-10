import React from "react";

function TimeToText(tempo){
	var minutes = Math.floor((tempo % (1000 * 60 * 60)) / 60);
	var seconds = Math.floor((tempo % (1000 * 60 * 60)) % 60);

	var min = minutes < 10 ? "0" + minutes + ":" : minutes + ":";
	var sec = seconds < 10 ? "0" + seconds : seconds;

	let result = min + sec; //h + min + sec;

	// If the count down is over, write some text
	return result;
}

export default function VideoRecord({ initialTime = 300 }) {
  const videoElement = React.useRef();

  const [isCameraAllowed, setIsCameraAllowed] = React.useState(true);
  const [mediaRecorder, setMediaRecorder] = React.useState(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [time, setTime] = React.useState(initialTime);

  const [videoBlobURL, setVideoBlobURL] = React.useState("");
  const [recordedFile, setRecordedFile] = React.useState(null);

  React.useEffect(() => {
    if(!videoElement) return;

    navigator.mediaDevices
				.getUserMedia({ audio: true, video: { facingMode: "user" } })
				.then(function (stream) {
          videoElement.current.id = "videoElementN1";
          videoElement.current.srcObject = stream;
          videoElement.current.muted = true;
          videoElement.current.setAttribute("controls", "false");
          videoElement.current.setAttribute("playsinline", true);
          videoElement.current.setAttribute("controls", false);
          videoElement.current.onloadedmetadata = function () {
            videoElement.current.play();
            
            const mediaRecorder = new MediaRecorder(stream, {
              audioBitsPerSecond: 16000,
              videoBitsPerSecond: 500000,
              mimeType: "video/webm",
            });

            setMediaRecorder(mediaRecorder);
            setVideoBlobURL("");
            
            const recordedChunks = [];

            mediaRecorder.ondataavailable = function (event) {
              if (event.data.size > 0) recordedChunks.push(event.data);
            };

            mediaRecorder.onstop = function () {
              const blob = new Blob(recordedChunks, { type: "octet-stream" });
              setVideoBlobURL(window.URL.createObjectURL(blob));
              setRecordedFile(blob);
              recordedChunks.splice(0, recordedChunks.length);
            };
          };
				})
        .catch(function (error) {
          setIsCameraAllowed(false);
        });
  }, [videoElement]);


  const startRecording = React.useCallback(() => {
    if(!mediaRecorder || isRecording || mediaRecorder.state === "recording") return;
    mediaRecorder.start();
    setIsRecording(true);
  }, [mediaRecorder, isRecording]);


  const stopRecording = React.useCallback(() => {
    if(!mediaRecorder || !isRecording || mediaRecorder.state !== "recording") return;
    mediaRecorder.stop();
    setTime(initialTime);
    setIsRecording(false);
  }, [mediaRecorder, isRecording, initialTime]);

  
  React.useEffect(() => {
    if(!isRecording) return;

    const interval = setInterval(() => {
      setTime((time) => {
        if(time > 0 && isRecording){
          return time - 1;
        }
        else {
          stopRecording();
          return time;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording, stopRecording]);


  if(!isCameraAllowed) return (
    <center><p>Acesso a camera não permitida</p></center>
  )

  return (
    <center>
      <video ref={videoElement} autoPlay muted></video>
      {mediaRecorder && (
        <div>
          <center>
            <p>{TimeToText(time)}</p>
          </center>
          {!isRecording &&
            <button onClick={() => startRecording()}>Gravar</button>
          }
          {isRecording &&
            <button onClick={() => stopRecording()}>Parar</button>
          }
          {videoBlobURL && (
            <a href={videoBlobURL} download={"videocurriculo.webm"}>Baixar</a>
          )}
        </div>
      )}
    </center>
  );
}