import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { getASentence } from "../../utilities/api";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import SentenceBlock from "../../components/SentenceBlock/SentenceBlock";
import Reference from "../../components/Reference/Reference";
import Translation from "../../components/Translation/Translation";
import SpeechToText from "../../components/SpeechToText/SpeechToText";
import back from "../../assets/icons/back.svg";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";
import NotFound from "../../utilities/NotFound/NotFound";
import "./FuelUpDetailsPage.scss";

const FuelUpDetailsPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [sentence, setSentence] = useState(null);
  const [navIds, setNavIds] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // to ensure all the state will be reset
  const resetState = () => {
    setHasError(false);
    setSentence(null);
    setIsLoading(true);
    setNavIds({ previousId: "", nextId: "" });
  };

  useEffect(async () => {
    resetState();
    try {
      let res = await getASentence(id);
      setSentence(res);
      setNavIds({
        previousId: res.previousId,
        nextId: res.nextId,
      });
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setHasError(true);
      setIsLoading(false);
    }
  }, [id]);

  const handleGoBack = () => {
    history.push("/testprep/fuelup");
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasError && !isLoading && <NotFound />}
      {!isLoading && !hasError && sentence && (
        <main className="fuel-main">
          <img
            className="fuel-main__back"
            src={back}
            alt="go-back"
            onClick={handleGoBack}
          />
          <section className="fuel">
            <p className="fuel__instruction">Ex1: Listen to The Sentence</p>
            <AudioPlayer audioArray={sentence.audio} />
            <p className="fuel__instruction">Ex2: Build The Sentence</p>
            <SentenceBlock blockString={sentence.audio[0].en} />
            <p className="fuel__instruction">Ex Tips</p>
            <Reference referenceArray={sentence.audio} />
            <Translation translationString={sentence["zh-cn"]} />
            <p className="fuel__instruction">Ex3: Repeat The Sentence</p>
            <SpeechToText />
            <PreBackButtons
              previousId={navIds.previousId}
              nextId={navIds.nextId}
              cat="sentences"
            />
          </section>
        </main>
      )}
    </>
  );
};

export default FuelUpDetailsPage;
