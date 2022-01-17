import React from "react";
import { Link } from "react-router-dom";
import left from "../../assets/icons/prev.svg";
import right from "../../assets/icons/next.svg";
import "./PreBackButtons.scss";

const PreBackButtons = (props) => {
  console.log(props);
  return (
    <div className="pre-back">
      <Link
        to={{
          pathname: props.previousId
            ? `/testprep/fuelup/${props.previousId}`
            : "/testprep/fuelup",
          state: { sentenceData: props.sentenceData, level: props.level },
        }}
      >
        <img className="pre-back__button" src={left} alt="previous" />
      </Link>
      <Link
        to={{
          pathname: props.nextId
            ? `/testprep/fuelup/${props.nextId}`
            : "/testprep/fuelup",
          state: { sentenceData: props.sentenceData, level: props.level },
        }}
      >
        <img className="pre-back__button" src={right} alt="next" />
      </Link>
    </div>
  );
};

export default PreBackButtons;
