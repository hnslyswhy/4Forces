import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import left from "../../assets/icons/prev.svg";
import right from "../../assets/icons/next.svg";
import "./PreBackButtons.scss";

const PreBackButtons = (props) => {
  const [baseRoute, setBaseRoute] = useState(null);

  useEffect(() => {
    if (props.cat === "listeningquestions") {
      setBaseRoute("/testprep/listeningprep");
    } else if (props.cat === "sentences") {
      setBaseRoute("/testprep/fuelup");
    } else if (props.cat === "speakingquestions") {
      setBaseRoute("/testprep/speakingprep");
    }
  }, [props]);

  return (
    <div className={`pre-back ${props.className}`}>
      <Link
        to={props.previousId ? `${baseRoute}/${props.previousId}` : baseRoute}
      >
        <img className="pre-back__icon" src={left} alt="previous" />
      </Link>
      <Link to={props.nextId ? `${baseRoute}/${props.nextId}` : baseRoute}>
        <img className="pre-back__icon" src={right} alt="next" />
      </Link>
    </div>
  );
};

export default PreBackButtons;
