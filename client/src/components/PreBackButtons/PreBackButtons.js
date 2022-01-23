import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { updateProgress } from "../../utilities/api";
import AuthContext from "../../utilities/AuthContext";
import left from "../../assets/icons/prev.svg";
import right from "../../assets/icons/next.svg";
import "./PreBackButtons.scss";

const PreBackButtons = (props) => {
  const [baseRoute, setBaseRoute] = useState(null);
  const authCtx = useContext(AuthContext);
  const { pathname } = useLocation();

  const handleUpdateProgress = () => {
    updateProgress(props.currentId, authCtx.user._id, pathname);
  };

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
      <Link
        to={props.nextId ? `${baseRoute}/${props.nextId}` : baseRoute}
        onClick={handleUpdateProgress}
      >
        <img className="pre-back__icon" src={right} alt="next" />
      </Link>
    </div>
  );
};

export default PreBackButtons;
