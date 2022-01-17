import React, { useState, useEffect } from "react";
import play from "../../assets/icons/play.svg";
import stop from "../../assets/icons/stop.svg";
import pause from "../../assets/icons/pause.svg";
import speed from "../../assets/icons/speed.svg";
import useConversationSpeech from "../../utilities/useConversationSpeech";
import "./AudioPlayer.scss";

const AudioPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAdjustingSpeed, setIsAdjustingSpeed] = useState(false);
  const {
    conversationPlay,
    conversationPause,
    conversationReset,
    setRate,
    checkPlaying,
  } = useConversationSpeech(props.audioArray);

  // play/pause the audio
  const handlePlayAudio = () => {
    setIsPlaying(true);
    conversationPlay();
  };

  const handlePauseAudio = () => {
    setIsPlaying(false);
    conversationPause();
  };

  // stop/reset the audio
  const handleStopAudio = () => {
    setIsPlaying(false);
    conversationReset();
  };

  //adjust audio speed
  const handleAdjustSpeed = () => {
    setIsAdjustingSpeed(true);
  };

  const handleSlowSpeed = () => {
    setIsPlaying(false);
    setRate(0.75);
    setIsAdjustingSpeed(false);
  };

  const handleFastSpeed = () => {
    setIsPlaying(false);
    setRate(1.25);
    setIsAdjustingSpeed(false);
  };

  return (
    <div className="audio">
      <div>
        {/*  <img className="audio__icon" src={isPlaying ? pause : play} alt="play" /> */}
        {!isPlaying && (
          <img
            className="audio__icon"
            onClick={handlePlayAudio}
            src={play}
            alt="play"
          />
        )}
        {isPlaying && (
          <img
            className="audio__icon"
            onClick={handlePauseAudio}
            src={pause}
            alt="pause"
          />
        )}
        <img
          className="audio__icon"
          onClick={handleStopAudio}
          src={stop}
          alt="stop"
        />
      </div>

      <div>
        <img
          className="audio__icon"
          src={speed}
          alt="play"
          onClick={handleAdjustSpeed}
        />
        {isAdjustingSpeed && (
          <>
            <span onClick={handleSlowSpeed}>0.75X</span>
            <span onClick={handleFastSpeed}>1.25X</span>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
