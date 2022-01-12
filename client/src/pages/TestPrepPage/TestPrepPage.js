import React from "react";
import studying from "../../assets/images/learn.jpg";
import "./TestPrepPage.scss";

const TestPrepPage = () => {
  return (
    <main className="prep-main">
      <div className="prep-main__card">
        <img className="prep-main__img" src={studying} alt="foundation" />
        <p className="prep-main__title"> Fuel Up</p>
      </div>
      <div className="prep-main__card">
        <img className="prep-main__img" src={studying} alt="listening" />
        <p className="prep-main__title"> Listening Prep</p>
      </div>
      <div className="prep-main__card">
        <img className="prep-main__img" src={studying} alt="speaking" />
        <p className="prep-main__title"> Speaking Prep</p>
      </div>
    </main>
  );
};

export default TestPrepPage;
