import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getAQuestion } from "../../utilities/api";
import back from "../../assets/icons/back.svg";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Reference from "../../components/Reference/Reference";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import { v4 as uuidv4 } from "uuid";
import "./ListeningDetailsPage.scss";

const ListeningDetailsPage = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [question, setQuestion] = useState(null);
  const [navIds, setNavIds] = useState({});
  const [isRightAnswer, setIsRightAnswer] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  const resetState = () => {
    setHasError(false);
    setIsRightAnswer(false);
    setIsLoading(true);
    setQuestion({});
    setNavIds({ previousId: "", nextId: "" });
  };

  useEffect(async () => {
    try {
      resetState();
      let res = await getAQuestion(id);
      setQuestion(res);
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

  const handleChooseAnswer = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value.toLowerCase() === question.answer) {
      setIsRightAnswer({ isClicked: true, message: "Well Done!" });
    } else {
      setIsRightAnswer({ isClicked: true, message: "Try Again!" });
    }
  };

  const handleGoBack = () => {
    history.push("/testprep/listeningprep");
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasError && !isLoading && <NotFound />}
      {!isLoading && !hasError && question && (
        <main className="listen-question">
          <div className="listen-question__top">
            <img
              className="listen-question__back"
              src={back}
              alt="go-back"
              onClick={handleGoBack}
            />
            <h1 className="listen-question__title">
              {question.type === "radio_communication"
                ? "Radio Communication"
                : "Aviation Scenario"}
            </h1>
          </div>

          <AudioPlayer
            className="listen-question__audio"
            audioArray={question.audio}
          />
          <form className="listen-question__form" onChange={handleChooseAnswer}>
            {question.choices.map((choice, index) => {
              return (
                /*  <div
                  key={uuidv4()}
                  className="listen-question__entries "
                 id={uuidv4()}
                  className={`listen-question__entries ${
                    isClicked ? "listen-question__clicked" : ""
                  } `}
                  onClick={() => handleClick(id)}
                > */
                <label
                  key={uuidv4()}
                  id={uuidv4()}
                  className="listen-question__label"
                  htmlFor={Object.keys(choice)[0]}
                >
                  {Object.values(choice)[0]}{" "}
                  <input
                    className="listen-question__input"
                    type="radio"
                    id={Object.keys(choice)[0]}
                    value={Object.keys(choice)[0]}
                  />
                </label>
              );
            })}
            {isRightAnswer.isClicked && (
              <p className="listen-question__check">{isRightAnswer.message}</p>
            )}
          </form>

          <Reference
            referenceArray={question.audio}
            className="listen-question__reference"
          />
          <PreBackButtons
            className="listen-question__preBack"
            previousId={navIds.previousId}
            nextId={navIds.nextId}
            cat="listeningquestions"
          />
        </main>
      )}
    </>
  );
};

export default ListeningDetailsPage;
