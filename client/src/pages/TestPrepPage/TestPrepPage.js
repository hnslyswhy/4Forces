import React from "react";
import { Link } from "react-router-dom";
import "./TestPrepPage.scss";

const TestPrepPage = () => {
  return (
    <main className="prep-main">
      <h1 className="prep-main__headline">Please Select</h1>
      <div className="prep-main__options">
        <Link to={"/testprep/fuelup"} className="prep-main__item">
          <div className="prep-main__card prep-main__card--sentence">
            <p className="prep-main__title"> Foundation</p>
          </div>
        </Link>

        <Link to={"/testprep/listeningprep"} className="prep-main__item">
          <div className="prep-main__card prep-main__card--listening">
            <p className="prep-main__title"> Listening Prep</p>
          </div>
        </Link>

        <Link to={"/testprep/speakingprep"} className="prep-main__item">
          <div className="prep-main__card   prep-main__card--speaking">
            <p className="prep-main__title"> Speaking Prep</p>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default TestPrepPage;
