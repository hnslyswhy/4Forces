import React, { useState } from "react";
import translation from "../../assets/icons/translation.svg";
import "./Translation.scss";

const Translation = (props) => {
  const [isShowingTranslation, setIsShowingTranslation] = useState(false);
  const handleToggleTranslation = () => {
    setIsShowingTranslation(!isShowingTranslation);
  };
  return (
    <div className="translation" onClick={handleToggleTranslation}>
      <img className="translation__icon" src={translation} alt="translate" />
      {isShowingTranslation ? (
        <p className="translation__text">{props.translationString}</p>
      ) : (
        <p className="translation__text">Show Translation</p>
      )}
    </div>
  );
};

export default Translation;
