import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import arrowDown from "../../assets/icons/arrowDown.svg";
import { getSpeakingQuestionsList } from "../../utilities/api";
import "./SpeakingListPage.scss";

const SpeakingListPage = () => {
  const [showingQuestions, setShowingQuestion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState(null);

  useEffect(async () => {
    let res = await getSpeakingQuestionsList();
    setQuestions(res);
    setIsLoading(false);
  }, []);

  const handleToggleQuestion = () => {
    setShowingQuestion(!showingQuestions);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && questions.length && (
        <main className="speaking">
          <div className="speaking__item" onClick={handleToggleQuestion}>
            <p className="speaking__title">Short Answer Questions</p>
            <div className="speaking__questions">
              <p className="speaking__info">1 question</p>
              <img src={arrowDown} alt="view-sentences" />
            </div>
            {showingQuestions && (
              <div className="speaking__toggle">
                {questions.map((question, index) => (
                  <Link
                    to={`/testprep/speakingprep/${question.id}/0`}
                    key={question._id}
                  >
                    <div className="speaking__question">{index + 1}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default SpeakingListPage;
