import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import arrowDown from "../../assets/icons/arrowDown.svg";
import { getQuestionsList } from "../../utilities/api";

const ListeningListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
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
        console.log(results);
        setQuestions({
          radioQuestions: results[0],
          scenarioQuestions: results[1],
        });
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        return <NotFound />;
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
      {!isLoading &&
        questions.radioQuestions.length &&
        questions.scenarioQuestions.length && (
          <main className="listening">
            <div className="listening__card">
              <div className="listening__item">
                <p className="listening__title">Radio Communication</p>
                <p className="listening__info">10 questions</p>
                <img
                  src={arrowDown}
                  alt="view-sentences"
                  onClick={handleToggleRadioQuestion}
                />
                <div className="listening__toggle">
                  {showingRadioQuestions &&
                    questions.radioQuestions.length &&
                    questions.radioQuestions.map((question, index) => (
                      <Link
                        key={question._id}
                        to={{
                          pathname: `/testprep/listeningprep/${question.id}`,
                          state: {
                            data: questions.radioQuestions,
                            property: "radio_communication",
                          },
                        }}
                      >
                        <div className="listening__question">{index + 1}</div>
                      </Link>
                    ))}
                </div>
              </div>

              <div className="listening__item">
                <p className="listening__title">Aviation Scenarios</p>
                <p className="listening__info">10 questions</p>
                <img
                  src={arrowDown}
                  alt="view-sentences"
                  onClick={handleToggleScenarioQuestions}
                />
                <div className="listening__toggle">
                  {showingScenarioQuestions &&
                    questions.scenarioQuestions.length &&
                    questions.scenarioQuestions.map((question, index) => (
                      <Link
                        key={question._id}
                        to={{
                          pathname: `/testprep/listeningprep/${question.id}`,
                          state: {
                            data: questions.scenarioQuestions,
                            property: "aviation_scenario",
                          },
                        }}
                      >
                        <div className="listening__question">{index + 1}</div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </main>
        )}
    </>
  );
};

export default ListeningListPage;
