import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import NotFound from "../../utilities/NotFound/NotFound";
import speaking from "../../assets/icons/speakingMic.svg";
import "./SpeechToText.scss";

const SpeechToText = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const recordRef = useRef(null);
  /* const [curTranscript, setCurTranscript] = useState(null);

  useEffect(() => {
    console.log([props.id]);
    console.log(recordRef.current);

    if (recordRef.current === props.id) {
      console.log(transcript);
      setCurTranscript(transcript);
    }
  }, [transcript]);
   */

  if (!browserSupportsSpeechRecognition) {
    return <NotFound />;
  }

  const handleStartRecording = (id) => {
    console.log(id);
    if (id === props.id) {
      recordRef.current = id;
      SpeechRecognition.startListening();
    }
  };

  return (
    <div className="speech">
      <div className="speech__controls">
        <span className="speech__reset" onClick={resetTranscript}>
          Reset
        </span>
        <img
          className="speech__record"
          src={speaking}
          alt="start recording"
          onClick={() => handleStartRecording(props.id)}
        />
        <span
          className="speech__stop"
          onClick={SpeechRecognition.stopListening}
        >
          Stop
        </span>
      </div>
      <p className="speech__notice">
        Microphone:
        <span className="speech__strong">{listening ? "on" : "off"}</span>
      </p>
      {recordRef.current === props.id && (
        <p className="speech__text">{transcript}</p>
      )}
    </div>
  );
};

export default SpeechToText;
