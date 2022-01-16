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
        to={
          props.previousId
            ? `/testprep/fuelup/${props.previousId}`
            : "/testprep/fuelup"
        }
      >
        <img className="pre-back__button" src={left} alt="previous" />
      </Link>
      <Link
        to={
          props.nextId ? `/testprep/fuelup/${props.nextId}` : "/testprep/fuelup"
        }
      >
        <img className="pre-back__button" src={right} alt="next" />
      </Link>
    </div>
  );
};

export default PreBackButtons;
