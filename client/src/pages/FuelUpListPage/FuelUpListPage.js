import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../utilities/useHttp";
import { getSentencesList } from "../../utilities/api";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import "./FuelUpListPage.scss";

const FuelUpListPage = () => {
  const { data, error, status, sendRequest } = useHttp(getSentencesList, false);
  const [currentLevel, setCurrentLevel] = useState({
    entry: false,
    intermediate: false,
    advanced: false,
  });
  const [showingQuestion, setShowingQuestion] = useState(false);

  /////to clean up avoiding memory leak  --- not really work well
  let _isMounted = useRef(true);
  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const handleGetEntryLevel = () => {
    if (_isMounted.current) {
      sendRequest("entry");
      setCurrentLevel({
        entry: true,
        intermediate: false,
        advanced: false,
      });
      setShowingQuestion(true);
      console.log(data);
    }
  };
  ///////////////////////////////
  const handleGetIntermediateLevel = () => {
    sendRequest("intermediate");
    setCurrentLevel({
      entry: false,
      intermediate: true,
      advanced: false,
    });
    setShowingQuestion(true);
  };

  const handleGetAdvancedLevel = () => {
    sendRequest("advanced");
    setCurrentLevel({
      entry: false,
      intermediate: false,
      advanced: true,
    });
    setShowingQuestion(true);
  };

  const handleToggleQuestions = (e) => {
    e.stopPropagation();
    setShowingQuestion(!showingQuestion);
  };

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  /// ??? why this is not triggered
  if (status === "error") {
    return <NotFound />;
  }

  return (
    <main className="fuelUpList">
      <div className="fuelUpList__card">
        <div className="fuelUpList__item" onClick={handleGetEntryLevel}>
          <p className="fuelUpList__title">Entry Level</p>
          <p className="fuelUpList__info" onClick={handleToggleQuestions}>
            490 sentences
          </p>
          <div className="fuelUpList__toggle">
            {currentLevel.entry &&
              showingQuestion &&
              data.map((sentence, index) => (
                <Link key={sentence._id} to={`/testprep/fuelup/${sentence.id}`}>
                  <div className="fuelUpList__question">{index}</div>
                </Link>
              ))}
          </div>
        </div>

        <div className="fuelUpList__item">
          <p className="fuelUpList__title" onClick={handleGetIntermediateLevel}>
            intermediate Level
          </p>
          <p className="fuelUpList__info" onClick={handleToggleQuestions}>
            307 sentences
          </p>
          <div className="fuelUpList__toggle">
            {currentLevel.intermediate &&
              showingQuestion &&
              data.map((sentence, index) => (
                <div key={sentence._id} className="fuelUpList__question">
                  {index}
                </div>
              ))}
          </div>
        </div>

        <div className="fuelUpList__item">
          <p className="fuelUpList__title" onClick={handleGetAdvancedLevel}>
            Advanced Level
          </p>
          <p className="fuelUpList__info" onClick={handleToggleQuestions}>
            103 sentences
          </p>
          <div className="fuelUpList__toggle">
            {currentLevel.advanced &&
              showingQuestion &&
              data.map((sentence, index) => (
                <div key={sentence._id} className="fuelUpList__question">
                  {index}
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FuelUpListPage;
