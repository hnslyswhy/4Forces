import React from "react";
import { useLocation } from "react-router-dom";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import SentenceBlock from "../../components/SentenceBlock/SentenceBlock";
import Reference from "../../components/Reference/Reference";
import Translation from "../../components/Translation/Translation";
import SpeechToText from "../../components/SpeechToText/SpeechToText";
import back from "../../assets/icons/back.svg";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";

const FuelUpDetailsPage = (props) => {
  //console.log(useLocation().state);

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
        <PreBackButtons />
        <SpeechToText />
      </section>
    </main>
  );
};

export default FuelUpDetailsPage;
