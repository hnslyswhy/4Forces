import React, { useState } from "react";
import eye from "../../assets/icons/eye.svg";
import eyeSlash from "../../assets/icons/eyeSlash.svg";

const Reference = (props) => {
  const [isShowingReference, setIsShowingReference] = useState(false);
  const handleToggleReference = () => {
    setIsShowingReference(!isShowingReference);
  };
  return (
    <div className="reference" onClick={handleToggleReference}>
      <img
        className="reference__icon"
        src={isShowingReference ? eye : eyeSlash}
        alt="reference"
      />
      {isShowingReference && (
        <>
          {props.referenceArray.map((referenceObj) => {
            return (
              <p key={referenceObj.en} className="reference_text">
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
