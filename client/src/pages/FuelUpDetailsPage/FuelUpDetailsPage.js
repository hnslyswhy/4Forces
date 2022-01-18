import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import SentenceBlock from "../../components/SentenceBlock/SentenceBlock";
import Reference from "../../components/Reference/Reference";
import Translation from "../../components/Translation/Translation";
import SpeechToText from "../../components/SpeechToText/SpeechToText";
import back from "../../assets/icons/back.svg";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";

const FuelUpDetailsPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { state } = useLocation();
  const [targetSentence, setTargetSentence] = useState(null);
  const [navIds, setNavIds] = useState({});

  useEffect(() => {
    let sentenceIndex = state.data.findIndex((sentence) => sentence.id === id);
    setTargetSentence(state.data[sentenceIndex]);

    let previousId;
    let nextId;
    if (sentenceIndex === 0) {
      previousId = "";
      nextId = state.data[sentenceIndex + 1].id;
    } else if (sentenceIndex === state.data.length - 1) {
      previousId = state.data[sentenceIndex - 1].id;
      nextId = "";
    } else {
      previousId = state.data[sentenceIndex - 1].id;
      nextId = state.data[sentenceIndex + 1].id;
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
              data={state.data}
              property={state.property}
              cat="sentences"
            />
            <SpeechToText />
          </section>
        </main>
      )}
    </>
  );
};

export default FuelUpDetailsPage;
