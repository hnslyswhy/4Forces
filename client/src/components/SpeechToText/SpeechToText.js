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

  if (!browserSupportsSpeechRecognition) {
    return <NotFound />;
  }

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
          onClick={SpeechRecognition.startListening}
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
      <p className="speech__text">{transcript}</p>
    </div>
  );
};

export default SpeechToText;
