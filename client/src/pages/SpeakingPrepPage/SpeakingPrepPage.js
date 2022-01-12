import React from "react";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";
import Reference from "../../components/Reference/Reference";
import SpeechToText from "../../components/SpeechToText/SpeechToText";

const SpeakingPrepPage = () => {
  return (
    <main className="speaking-main">
      <section className="speaking">
        <img src="" alt="cb" className="speaking__img" />
        <div className="speaking__card">
          <p className="speaking__headline">Question 1 of #</p>
          <AudioPlayer />
          <SpeechToText />
          <Reference />
        </div>
        <PreBackButtons />
      </section>
    </main>
  );
};

export default SpeakingPrepPage;
