import React from "react";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Translation from "../../components/Translation/Translation";
import eye from "../../assets/icons/eye.svg";
import Reference from "../../components/Reference/Reference";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";

const ListeningPrep = () => {
  return (
    <main className="listening-main">
      <section className="listening">
        <div className="listening__levels">
          <span className="listening__level">Scenario</span>
          <span className="listening__level">ATC</span>
        </div>
        <div className="listening__card">
          <AudioPlayer />
          <form className="listening__form">
            <div className="listening__entries">
              <input
                className="listening__input"
                type="radio"
                id="A"
                value="a"
                name="answer"
              />
              <label className="listening__label" htmlFor="A">
                CHOICEA
              </label>
            </div>
            <div className="listening__entries">
              <input
                className="listening__input"
                type="radio"
                id="B"
                value="b"
                name="answer"
              />
              <label className="listening__label" htmlFor="B">
                CHOICEB
              </label>
            </div>
            <div className="listening__entries">
              <input
                className="listening__input"
                type="radio"
                id="C"
                value="c"
                name="answer"
              />
              <label className="listening__label" htmlFor="C">
                CHOICEC
              </label>
            </div>
            <div className="listening__entries">
              <input
                className="listening__input"
                type="radio"
                value="d"
                name="answer"
              />
              <label className="listening__label" htmlFor="D">
                CHOICED
              </label>
            </div>
          </form>

          <div className="">
            <div>
              <img src={eye} alt="reference" />
              <Reference />
            </div>
          </div>
          <PreBackButtons />
        </div>
      </section>
    </main>
  );
};

export default ListeningPrep;
