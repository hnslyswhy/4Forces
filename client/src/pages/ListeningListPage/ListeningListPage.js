import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import arrowDown from "../../assets/icons/arrowDown.svg";
import { getQuestionsList } from "../../utilities/api";
import "./ListeningListPage.scss";

const ListeningListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [questions, setQuestions] = useState({});
  const [showingRadioQuestions, setShowingRadioQuestions] = useState(false);
  const [showingScenarioQuestions, setShowingScenarioQuestions] =
    useState(false);

  useEffect(() => {
    Promise.all([
      getQuestionsList("radiocommunication"),
      getQuestionsList("aviationscenario"),
    ])
      .then((results) => {
        setQuestions({
          radioQuestions: results[0],
          scenarioQuestions: results[1],
        });
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const handleToggleRadioQuestion = () => {
    setShowingRadioQuestions(!showingRadioQuestions);
  };

  const handleToggleScenarioQuestions = () => {
    setShowingScenarioQuestions(!showingScenarioQuestions);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasError && !isLoading && <NotFound />}
      {!isLoading &&
        !hasError &&
        questions.radioQuestions.length &&
        questions.scenarioQuestions.length && (
          <main className="listening">
            <div
              className="listening__item"
              onClick={handleToggleRadioQuestion}
            >
              <p className="listening__title">Radio Communication</p>
              <div className="listening__questions">
                <p className="listening__info">10 questions</p>
                <img src={arrowDown} alt="view-sentences" />
              </div>
              <div className="listening__toggle">
                {showingRadioQuestions &&
                  questions.radioQuestions.length &&
                  questions.radioQuestions.map((question, index) => (
                    <Link
                      to={`/testprep/listeningprep/${question.id}`}
                      key={question._id}
                    >
                      <div className="listening__question">{index + 1}</div>
                    </Link>
                  ))}
              </div>
            </div>

            <div
              className="listening__item"
              onClick={handleToggleScenarioQuestions}
            >
              <p className="listening__title">Aviation Scenarios</p>
              <div className="listening__questions">
                <p className="listening__info">10 questions</p>
                <img src={arrowDown} alt="view-sentences" />
              </div>
              <div className="listening__toggle">
                {showingScenarioQuestions &&
                  questions.scenarioQuestions.length &&
                  questions.scenarioQuestions.map((question, index) => (
                    <Link
                      to={`/testprep/listeningprep/${question.id}`}
                      key={question._id}
                    >
                      <div className="listening__question">{index + 1}</div>
                    </Link>
                  ))}
              </div>
            </div>
          </main>
        )}
    </>
  );
};

export default ListeningListPage;
