import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";
import SpeechToText from "../../components/SpeechToText/SpeechToText";
import { getASpeakingQuestion } from "../../utilities/api";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import eye from "../../assets/icons/eye.svg";
import eyeSlash from "../../assets/icons/eyeSlash.svg";
import NotFound from "../../utilities/NotFound/NotFound";
import "./SpeakingDetailsPage.scss";

const SpeakingDetailsPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isShowingReference, setIsShowingReference] = useState(false);
  const [total, setTotal] = useState(null);

  useEffect(async () => {
    try {
      let res = await getASpeakingQuestion(id);
      setQuestion(res);
      setTotal(res.questions.length);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setHasError(true);
      setIsLoading(false);
    }
  }, [id]);

  const handleToggleReference = () => {
    setIsShowingReference(!isShowingReference);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasError && !isLoading && <NotFound />}
      {!isLoading && !hasError && question && (
        <main className="speaking-main">
          <section className="speaking">
            <img src="" alt="cb" className="speaking__img" />
            <div className="speaking__container">
              {question.questions.map((question, index) => {
                return (
                  <article
                    key={question.audio[0].en}
                    className="speaking__card"
                  >
                    <p className="speaking__headline">
                      Question {index + 1} of {total}
                    </p>
                    <AudioPlayer audioArray={question.audio} />
                    <SpeechToText />
                    <div
                      className="speaking__reference"
                      onClick={handleToggleReference}
                    >
                      <img
                        className="speaking__icon"
                        src={isShowingReference ? eye : eyeSlash}
                        alt="reference"
                      />
                      {isShowingReference && <p>{question.reference}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
            <PreBackButtons />
          </section>
        </main>
      )}
    </>
  );
};

export default SpeakingDetailsPage;
