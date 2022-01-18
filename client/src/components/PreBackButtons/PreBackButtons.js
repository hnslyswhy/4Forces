import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import left from "../../assets/icons/prev.svg";
import right from "../../assets/icons/next.svg";
import "./PreBackButtons.scss";

const PreBackButtons = (props) => {
  const [baseRoute, setBaseRoute] = useState(null);
  console.log(props.cat);

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
    <div className="pre-back">
      <Link
        to={{
          pathname: props.previousId
            ? `${baseRoute}/${props.previousId}`
            : baseRoute,
          state: { data: props.data, property: props.property },
        }}
      >
        <img className="pre-back__button" src={left} alt="previous" />
      </Link>
      <Link
        to={{
          pathname: props.nextId ? `${baseRoute}/${props.nextId}` : baseRoute,
          state: { data: props.data, property: props.property },
        }}
      >
        <img className="pre-back__button" src={right} alt="next" />
      </Link>
    </div>
  );
};

export default PreBackButtons;
