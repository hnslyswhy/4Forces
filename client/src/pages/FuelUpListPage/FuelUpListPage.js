import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import arrowDown from "../../assets/icons/arrowDown.svg";
import { getSentencesList } from "../../utilities/api";
import "./FuelUpListPage.scss";

const FuelUpListPage = () => {
  const [isLoading, setIsLoading] = useState(true);
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
    ])
      .then((values) => {
        setSentences({
          entrySentences: values[0],
          intermediateSentences: values[1],
          advancedSentences: values[2],
        });
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        return <NotFound />;
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
      {!isLoading && (
        <main className="fuelUpList">
          <div className="fuelUpList__card">
            <div className="fuelUpList__item">
              <p className="fuelUpList__title">Entry Level</p>
              <p className="fuelUpList__info">490 sentences</p>
              <img
                src={arrowDown}
                alt="view-sentences"
                onClick={handleToggleEntrySentence}
              />
              <div className="fuelUpList__toggle">
                {showingEntrySentence &&
                  sentences.entrySentences.length &&
                  sentences.entrySentences.map((sentence, index) => (
                    <Link
                      key={sentence._id}
                      to={{
                        pathname: `/testprep/fuelup/${sentence.id}`,
                        state: {
                          sentenceData: sentences.entrySentences,
                          level: "entry",
                        },
                      }}
                    >
                      <div className="fuelUpList__question">{index + 1}</div>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="fuelUpList__item">
              <p className="fuelUpList__title">intermediate Level</p>
              <p className="fuelUpList__info">307 sentences</p>
              <img
                src={arrowDown}
                alt="view-sentences"
                onClick={handleToggleIntermediateSentence}
              />
              <div className="fuelUpList__toggle">
                {showingIntermediateSentence &&
                  sentences.intermediateSentences.length &&
                  sentences.intermediateSentences.map((sentence, index) => (
                    <Link
                      key={sentence._id}
                      to={{
                        pathname: `/testprep/fuelup/${sentence.id}`,
                        state: {
                          sentenceData: sentences.intermediateSentences,
                          level: "intermediate",
                        },
                      }}
                    >
                      <div className="fuelUpList__question">{index + 1}</div>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="fuelUpList__item">
              <p className="fuelUpList__title">Advanced Level</p>
              <p className="fuelUpList__info">103 sentences</p>
              <img
                src={arrowDown}
                alt="view-sentences"
                onClick={handleToggleAdvancedSentence}
              />
              <div className="fuelUpList__toggle">
                {showingAdvancedSentence &&
                  sentences.advancedSentences.length &&
                  sentences.advancedSentences.map((sentence, index) => (
                    <Link
                      key={sentence._id}
                      to={{
                        pathname: `/testprep/fuelup/${sentence.id}`,
                        state: {
                          sentenceData: sentences.advancedSentences,
                          level: "advanced",
                        },
                      }}
                    >
                      <div className="fuelUpList__question">{index + 1}</div>
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

export default FuelUpListPage;
