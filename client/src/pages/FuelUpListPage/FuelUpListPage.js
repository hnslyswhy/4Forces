import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import arrowDown from "../../assets/icons/arrowDown.svg";
import "./FuelUpListPage.scss";

const FuelUpListPage = () => {
  const baseUrl = process.env.REACT_APP_API_URL; // ?????
  const [isLoading, setIsLoading] = useState(true);
  const [sentences, setSentences] = useState({});

  const [showingEntrySentence, setShowingEntrySentence] = useState(false);
  const [showingIntermediateSentence, setShowingIntermediateSentence] =
    useState(false);
  const [showingAdvancedSentence, setShowingAdvancedSentence] = useState(false);
  let entrySentencesList = [];
  let intermediateSentencesList = [];
  let advancedSentencesList = [];
  let data;

  // get all sentences
  useEffect(() => {
    axios
      .get(`http://localhost:8080/sentences`)
      .then((res) => {
        data = res.data;
        data.forEach((sentence) => {
          if (sentence.level === "entry") {
            entrySentencesList.push(sentence);
          }
          if (sentence.level === "intermediate") {
            intermediateSentencesList.push(sentence);
          }
          if (sentence.level === "advanced") {
            advancedSentencesList.push(sentence);
          }
        });
        /*   console.log(entrySentencesList);
        console.log(intermediateSentencesList);
        console.log(advancedSentencesList); */
        setSentences({
          entrySentences: entrySentencesList,
          intermediateSentences: intermediateSentencesList,
          advancedSentences: advancedSentencesList,
        });
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        return <NotFound />;
      });
  }, []);

  ///////////////////////////////
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
