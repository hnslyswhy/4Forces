import React, { useState } from "react";
import eye from "../../assets/icons/eye.svg";
import eyeSlash from "../../assets/icons/eyeSlash.svg";

const Reference = (props) => {
  console.log(props.referenceArray);
  // how to unify the data all as arrays when coming here

  const [isShowingReference, setIsShowingReference] = useState(false);
  const handleToggleReference = () => {
    setIsShowingReference(!isShowingReference);
  };
  return (
    <div className="translation" onClick={handleToggleReference}>
      <img
        className="translation__icon"
        src={isShowingReference ? eye : eyeSlash}
        alt="translate"
      />
      {isShowingReference && (
        <>
          {props.referenceArray.map((referenceObj) => {
            return (
              <p key={referenceObj.en} className="translation_text">
                {referenceObj.en}
              </p>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Reference;
