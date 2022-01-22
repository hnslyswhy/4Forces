import React, { useState, useEffect } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import SpeechToText from "../SpeechToText/SpeechToText";
import eye from "../../assets/icons/eye.svg";
import eyeSlash from "../../assets/icons/eyeSlash.svg";
import "./SpeakingCard.scss";

const SpeakingCard = (props) => {
  const [isShowingReference, setIsShowingReference] = useState(false);

  const handleToggleReference = () => {
    setIsShowingReference(!isShowingReference);
  };
  return (
    <div className="speaking-card">
      <article className="speaking-card__card">
        <p className="speaking-card__headline">
          Question {parseInt(props.questionIndex) + 1} of {props.total}
        </p>
        <p className="speaking-card__instruction">
          Ex1: Listen To The Question
        </p>
        <AudioPlayer audioArray={props.data[props.questionIndex].audio} />
        <p className="speaking-card__instruction">Ex2: Record Your Answer</p>
        <SpeechToText />
        <p className="speaking-card__instruction">Ex Tips</p>
        <div
          className="speaking-card__reference"
          onClick={handleToggleReference}
        >
          <img
            className="speaking-card__icon"
            src={isShowingReference ? eye : eyeSlash}
            alt="reference"
          />
          {isShowingReference ? (
            <p className="speaking-card__text">
              {props.data[props.questionIndex].reference}
            </p>
          ) : (
            <p className="speaking-card__text">Sample Answer</p>
          )}
        </div>
      </article>
    </div>
  );
};

export default SpeakingCard;
