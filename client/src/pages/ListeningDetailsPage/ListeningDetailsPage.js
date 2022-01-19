import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getAQuestion } from "../../utilities/api";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Reference from "../../components/Reference/Reference";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import "./ListeningDetailsPage.scss";

const ListeningDetailsPage = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [question, setQuestion] = useState(null);
  const [navIds, setNavIds] = useState({});

  useEffect(async () => {
    try {
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

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasError && !isLoading && <NotFound />}
      {!isLoading && !hasError && question && (
        <main className="listening-main">
          <section className="listening">
            <h1 className="listening__title">
              {question.type === "radio_communication"
                ? "Radio Communication"
                : "Aviation Scenario"}
            </h1>

            <div className="listening__card">
              <AudioPlayer audioArray={question.audio} />
              <form className="listening__form">
                {question.choices.map((choice, index) => {
                  return (
                    <div
                      key={String(index) + "option"}
                      className="listening__entries"
                    >
                      <input
                        className="listening__input"
                        type="radio"
                        id={Object.keys(choice)[0]}
                        value="a"
                        name="answer"
                      />
                      <label
                        className="listening__label"
                        htmlFor={Object.keys(choice)[0]}
                      >
                        {Object.values(choice)[0]}
                      </label>
                    </div>
                  );
                })}
              </form>

              <Reference referenceArray={question.audio} />
              <PreBackButtons
                previousId={navIds.previousId}
                nextId={navIds.nextId}
                cat="listeningquestions"
              />
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default ListeningDetailsPage;
