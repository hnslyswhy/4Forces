import React from "react";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import SentenceBlock from "../../components/SentenceBlock/SentenceBlock";
import Reference from "../../components/Reference/Reference";
import Translation from "../../components/Translation/Translation";
import SpeechToText from "../../components/SpeechToText/SpeechToText";
import back from "../../assets/icons/back.svg";

const FuelUpPage = () => {
  return (
    <main className="fuel-main">
      <div>
        <img src={back} alt="go-back" />
      </div>
      <section className="fuel">
        <div className="fuel__levels">
          <span className="fuel__level">entry</span>
          <span className="fuel__level">intermediate</span>
          <span className="fuel__level">advanced</span>
        </div>
        <div className="fuel__card">
          <p className="fuel__title">Sentence 1 of #</p>
          <AudioPlayer />
          <SentenceBlock />
          <Reference />
          <Translation />
        </div>
        <div className="fuel__buttons">
          <button className="fuel__prev">Prev</button>
          <button className="fuel__next">Next</button>
        </div>
        <SpeechToText />
      </section>
    </main>
  );
};

export default FuelUpPage;
