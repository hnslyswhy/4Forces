import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import arrowDown from "../../assets/icons/arrowDown.svg";
import { getSentencesList, getProgress } from "../../utilities/api";
import AuthContext from "../../utilities/AuthContext";
import "./FuelUpListPage.scss";

const FuelUpListPage = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [visited, setVisited] = useState(null);
  const [sentences, setSentences] = useState({});
  const [showingEntrySentence, setShowingEntrySentence] = useState(false);
  const [showingIntermediateSentence, setShowingIntermediateSentence] =
    useState(false);
  const [showingAdvancedSentence, setShowingAdvancedSentence] = useState(false);

  // get all sentences
  useEffect(() => {
    Promise.all([
      getSentencesList("entry"),
      getSentencesList("intermediate"),
      getSentencesList("advanced"),
      getProgress(authCtx.user._id),
    ])
      .then((results) => {
        setSentences({
          entrySentences: results[0],
          intermediateSentences: results[1],
          advancedSentences: results[2],
        });

        let visitedSentences = results[3].progress.filter(
          (visit) =>
            parseInt(visit.questionId) >= 1000 &&
            parseInt(visit.questionId) < 2000
        );

        setVisited(visitedSentences);
        console.log(visited);
        console.log(sentences);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  //handle display
  const handleToggleEntrySentence = (e) => {
    setShowingEntrySentence(!showingEntrySentence);
  };
  const handleToggleIntermediateSentence = (e) => {
    setShowingIntermediateSentence(!showingIntermediateSentence);
  };
  const handleToggleAdvancedSentence = (e) => {
    setShowingAdvancedSentence(!showingAdvancedSentence);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasError && !isLoading && <NotFound />}
      {!isLoading && !hasError && visited && sentences && (
        <main className="fuelUpList">
          <div className="fuelUpList__item" onClick={handleToggleEntrySentence}>
            <p className="fuelUpList__title">Entry Level</p>
            <div className="fuelUpList__sentences">
              <p className="fuelUpList__info">490 sentences</p>
              <img src={arrowDown} alt="view-sentences" />
            </div>
            <div className="fuelUpList__toggle">
              {showingEntrySentence &&
                sentences.entrySentences.length &&
                sentences.entrySentences.map((sentence, index) => (
                  <Link
                    to={`/testprep/fuelup/${sentence.id}`}
                    key={sentence._id}
                  >
                    <div className={`fuelUpList__question `}>{index + 1}</div>
                  </Link>
                ))}
            </div>
          </div>

          <div
            className="fuelUpList__item"
            onClick={handleToggleIntermediateSentence}
          >
            <p className="fuelUpList__title">intermediate Level</p>
            <div className="fuelUpList__sentences">
              <p className="fuelUpList__info">307 sentences</p>
              <img src={arrowDown} alt="view-sentences" />
            </div>
            <div className="fuelUpList__toggle">
              {showingIntermediateSentence &&
                sentences.intermediateSentences.length &&
                sentences.intermediateSentences.map((sentence, index) => (
                  <Link
                    to={`/testprep/fuelup/${sentence.id}`}
                    key={sentence._id}
                  >
                    <div className="fuelUpList__question">{index + 1}</div>
                  </Link>
                ))}
            </div>
          </div>

          <div
            className="fuelUpList__item"
            onClick={handleToggleAdvancedSentence}
          >
            <p className="fuelUpList__title">Advanced Level</p>
            <div className="fuelUpList__sentences">
              <p className="fuelUpList__info">103 sentences</p>
              <img src={arrowDown} alt="view-sentences" />
            </div>
            <div className="fuelUpList__toggle">
              {showingAdvancedSentence &&
                sentences.advancedSentences.length &&
                sentences.advancedSentences.map((sentence, index) => (
                  <Link
                    to={`/testprep/fuelup/${sentence.id}`}
                    key={sentence._id}
                  >
                    <div className="fuelUpList__question">{index + 1}</div>
                  </Link>
                ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default FuelUpListPage;
