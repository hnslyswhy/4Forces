import React, { useState } from "react";
import eye from "../../assets/icons/eye.svg";
import eyeSlash from "../../assets/icons/eyeSlash.svg";
import "./Reference.scss";

const Reference = (props) => {
  const [isShowingReference, setIsShowingReference] = useState(false);
  const handleToggleReference = () => {
    setIsShowingReference(!isShowingReference);
  };
  return (
    <div
      className={`reference ${props.className}`}
      onClick={handleToggleReference}
    >
      <img
        className="reference__icon"
        src={isShowingReference ? eye : eyeSlash}
        alt="reference"
      />
      {isShowingReference ? (
        <>
          {props.referenceArray.map((referenceObj) => {
            return (
              <p key={referenceObj.en} className="reference__text">
                {referenceObj.en}
              </p>
            );
          })}
        </>
      ) : (
        <p className="reference__text">Show Reference</p>
      )}
    </div>
  );
};

export default Reference;
