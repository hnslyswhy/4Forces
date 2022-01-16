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
      {isShowingTranslation && (
        <p className="translation_text">{props.translationString}</p>
      )}
    </div>
  );
};

export default Translation;
