import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import left from "../../assets/icons/prev.svg";
import right from "../../assets/icons/next.svg";
import { getASpeakingQuestion } from "../../utilities/api";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import back from "../../assets/icons/back.svg";
import NotFound from "../../utilities/NotFound/NotFound";
import "./SpeakingDetailsPage.scss";
import SpeakingCard from "../../components/SpeakingCard/SpeakingCard";

const SpeakingDetailsPage = () => {
  const { id, questionId } = useParams();
  const history = useHistory();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [navIds, setNavIds] = useState({});
  const [total, setTotal] = useState(null);

  const resetState = () => {
    setHasError(false);
    setIsLoading(true);
    setQuestion({});
    setNavIds({});
    setTotal(null);
  };

  useEffect(async () => {
    resetState();
    try {
      let res = await getASpeakingQuestion(id);
      setQuestion(res);
      setTotal(res.questions.length);

      if (questionId === "0") {
        setNavIds({
          previousId: "",
          nextId: String(parseInt(questionId) + 1),
        });
      } else if (parseInt(questionId) === res.questions.length - 1) {
        setNavIds({
          nextId: "",
          previousId: String(parseInt(questionId) - 1),
        });
      } else {
        setNavIds({
          nextId: String(parseInt(questionId) + 1),
          previousId: String(parseInt(questionId) - 1),
        });
      }

      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setHasError(true);
      setIsLoading(false);
    }
  }, [id, questionId]);

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
          <SpeakingCard
            data={question.questions}
            total={total}
            questionIndex={questionId}
          />
          <div className="speaking-question__buttons">
            <Link
              to={
                navIds.previousId
                  ? `/testprep/speakingprep/${id}/${navIds.previousId}`
                  : "/testprep/speakingprep"
              }
            >
              <img
                className="speaking-question__icon"
                src={left}
                alt="previous"
              />
            </Link>
            <Link
              to={
                navIds.nextId
                  ? `/testprep/speakingprep/${id}/${navIds.nextId}`
                  : "/testprep/speakingprep"
              }
            >
              <img className="speaking-question__icon" src={right} alt="next" />
            </Link>
          </div>
        </main>
      )}
    </>
  );
};

export default SpeakingDetailsPage;
