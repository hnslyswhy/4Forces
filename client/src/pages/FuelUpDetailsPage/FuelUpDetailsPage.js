import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import SentenceBlock from "../../components/SentenceBlock/SentenceBlock";
import Reference from "../../components/Reference/Reference";
import Translation from "../../components/Translation/Translation";
import SpeechToText from "../../components/SpeechToText/SpeechToText";
import back from "../../assets/icons/back.svg";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";

const FuelUpDetailsPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { state } = useLocation();
  const [targetSentence, setTargetSentence] = useState(null);
  const [navIds, setNavIds] = useState({});

  console.log(state);

  /*   if (state.level === "entry") {
    localStorage.setItem("entrySentences", JSON.stringify(state.sentenceData));
    console.log(localStorage.getItem("entrySentences"));
  }

  if (state.level === "intermediate") {
    localStorage.setItem(
      "intermediateSentences",
      JSON.stringify(state.sentenceData)
    );
  }

  if (state.level === "advanced") {
    localStorage.setItem(
      "advancedSentences",
      JSON.stringify(state.sentenceData)
    );
  } */

  useEffect(() => {
    let sentenceIndex = state.sentenceData.findIndex(
      (sentence, index) => sentence.id === id
    );
    setTargetSentence(state.sentenceData[sentenceIndex]);

    let previousId;
    let nextId;

    // Get the correct previous index
    if (sentenceIndex === 0) {
      previousId = "";
      nextId = state.sentenceData[sentenceIndex + 1].id;
    } else if (sentenceIndex === state.sentenceData.length - 1) {
      previousId = state.sentenceData[sentenceIndex - 1].id;
      nextId = "";
    } else {
      previousId = state.sentenceData[sentenceIndex - 1].id;
      nextId = state.sentenceData[sentenceIndex + 1].id;
    }
    setNavIds({
      previousId: previousId,
      nextId: nextId,
    });
  }, [id]);

  const handleGoBack = () => {
    history.push("/testprep/fuelup");
  };

  return (
    <>
      {/*     {!targetSentence && <LoadingSpinner />} */}
      {targetSentence && (
        <main className="fuel-main">
          <div>
            <img src={back} alt="go-back" onClick={handleGoBack} />
          </div>
          <section className="fuel">
            <div className="fuel__card">
              <AudioPlayer audioArray={targetSentence.audio} />
              <SentenceBlock blockString={targetSentence.audio[0].en} />
              <Reference referenceArray={targetSentence.audio} />
              <Translation translationString={targetSentence["zh-cn"]} />
            </div>
            <PreBackButtons
              previousId={navIds.previousId}
              nextId={navIds.nextId}
              sentenceData={state.sentenceData}
              level={state.level}
            />
            <SpeechToText />
          </section>
        </main>
      )}
    </>
  );
};

export default FuelUpDetailsPage;
