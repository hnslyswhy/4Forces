import React from "react";
import studying from "../../assets/images/learn.jpg";
import { Link } from "react-router-dom";
import "./TestPrepPage.scss";

const TestPrepPage = () => {
  return (
    <main className="prep-main">
      <Link to={"/testprep/fuelup"}>
        <div className="prep-main__card">
          <img className="prep-main__img" src={studying} alt="foundation" />
          <p className="prep-main__title"> Fuel Up</p>
        </div>
      </Link>

      <Link to={"/testprep/listeningprep"}>
        <div className="prep-main__card">
          <img className="prep-main__img" src={studying} alt="listening" />
          <p className="prep-main__title"> Listening Prep</p>
        </div>
      </Link>

      <Link to={"/testprep/speakingprep"}>
        <div className="prep-main__card">
          <img className="prep-main__img" src={studying} alt="speaking" />
          <p className="prep-main__title"> Speaking Prep</p>
        </div>
      </Link>
    </main>
  );
};

export default TestPrepPage;
