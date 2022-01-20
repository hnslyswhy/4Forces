import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";
import SpeechToText from "../../components/SpeechToText/SpeechToText";
import { getASpeakingQuestion } from "../../utilities/api";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import eye from "../../assets/icons/eye.svg";
import eyeSlash from "../../assets/icons/eyeSlash.svg";
import back from "../../assets/icons/back.svg";
import NotFound from "../../utilities/NotFound/NotFound";
import { v4 as uuidv4 } from "uuid";
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

  const handleGoBack = () => {
    history.push("/testprep/speakingprep");
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasError && !isLoading && <NotFound />}
      {!isLoading && !hasError && question && (
        <main className="speaking-question">
          <img
            className="speaking-question__back"
            src={back}
            alt="go-back"
            onClick={handleGoBack}
          />
          <img
            src={question.image}
            alt="cb"
            className="speaking-question__img"
          />
          <div className="speaking-question__container">
            {question.questions.map((question, index) => {
              return (
                <article
                  key={question.audio[0].en}
                  className="speaking-question__card"
                >
                  <p className="speaking-question__headline">
                    Question {index + 1} of {total}
                  </p>
                  <p className="speaking-question__instruction">
                    Ex1: Listen To The Question
                  </p>
                  <AudioPlayer audioArray={question.audio} />
                  <p className="speaking-question__instruction">
                    Ex2: Record Your Answer
                  </p>
                  <SpeechToText id={uuidv4()} />
                  <p className="speaking-question__instruction">Ex Tips</p>
                  <div
                    className="speaking-question__reference"
                    onClick={handleToggleReference}
                  >
                    <img
                      className="speaking-question__icon"
                      src={isShowingReference ? eye : eyeSlash}
                      alt="reference"
                    />
                    {isShowingReference ? (
                      <p className="speaking-question__text">
                        {question.reference}
                      </p>
                    ) : (
                      <p className="speaking-question__text">Sample Answer</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <PreBackButtons className="speaking-question__buttons" />
        </main>
      )}
    </>
  );
};

export default SpeakingDetailsPage;
