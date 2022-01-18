import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import eye from "../../assets/icons/eye.svg";
import Reference from "../../components/Reference/Reference";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";

const ListeningDetailsPage = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const { state } = useLocation();
  const [property, setProperty] = useState(null);
  const [targetQuestion, setTargetQuestion] = useState(null);
  const [navIds, setNavIds] = useState({});

  console.log(state.data);
  console.log(id);

  useEffect(() => {
    //set type
    setProperty(state.property);
    //set target question
    let targetQuestionIndex = state.data.findIndex(
      (question) => String(question.id) === id
    );
    setTargetQuestion(state.data[targetQuestionIndex]);

    //set navIds
    let previousId;
    let nextId;
    console.log(targetQuestionIndex);
    console.log(typeof targetQuestionIndex);
    if (targetQuestionIndex === 0) {
      previousId = "";
      nextId = String(state.data[targetQuestionIndex + 1].id);
    } else if (targetQuestionIndex === state.data.length - 1) {
      previousId = String(state.data[targetQuestionIndex - 1].id);
      nextId = "";
    } else {
      previousId = String(state.data[targetQuestionIndex - 1].id);
      nextId = String(state.data[targetQuestionIndex + 1].id);
    }
    setNavIds({
      previousId: previousId,
      nextId: nextId,
    });
  }, [id]);

  return (
    <>
      {targetQuestion && (
        <main className="listening-main">
          <section className="listening">
            <h1 className="listening__title">
              {property === "radio_communication"
                ? "Radio Communication"
                : "Aviation Scenario"}
            </h1>

            <div className="listening__card">
              <AudioPlayer audioArray={targetQuestion.audio} />
              <form className="listening__form">
                {targetQuestion.choices.map((choice, index) => {
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

              <Reference referenceArray={targetQuestion.audio} />
              <PreBackButtons
                previousId={navIds.previousId}
                nextId={navIds.nextId}
                data={state.data}
                property={state.property}
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
