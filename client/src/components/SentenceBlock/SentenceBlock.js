import React, { useState, useEffect } from "react";
import "./SentenceBlock.scss";

const SentenceBlock = (props) => {
  const [userChoices, setUserChoices] = useState([]);
  const [wordsChoices, setWordsChoices] = useState(
    props.blockString.split(" ")
  );
  const [isRightAnswer, setIsRightAnswer] = useState(false);
  const [message, setMessage] = useState(null);
  const rightOrder = props.blockString.split(" ");

  // get random order
  useEffect(() => {
    let randomOrder = [...rightOrder];
    for (let i = rightOrder.length - 1; i >= 0; i--) {
      let randomNum = Math.floor(Math.random() * (i + 1));
      [randomOrder[randomNum], randomOrder[i]] = [
        randomOrder[i],
        randomOrder[randomNum],
      ];
    }
    setWordsChoices(randomOrder);
  }, [props.blockString]);

  useEffect(() => {
    checkAnswer();
    //  console.log(isRightAnswer);
  }, [userChoices]);

  const checkAnswer = () => {
    console.log("rightOder: ", rightOrder);
    console.log("userChoice: ", userChoices);
    if (userChoices.length !== rightOrder.length) {
      console.log("length check");
      return;
    } else {
      console.log("every word check");
      for (let i = 0; i < rightOrder.length; i++) {
        if (rightOrder[i] !== userChoices[i]) {
          setMessage(["Try Again!"]);
          return;
        }
      }
      setIsRightAnswer(true);
      setMessage(["Congrats!"]);
    }
  };

  const handleClickUserChoice = (index) => {
    // add to word choice end
    let clickedWord = userChoices[index];
    let copyChoicesArray = [...wordsChoices];
    copyChoicesArray.push(clickedWord);
    setWordsChoices(copyChoicesArray);
    // remove from user choices
    let copyUserArray = [...userChoices];
    copyUserArray.splice(index, 1);
    setUserChoices(copyUserArray);
  };

  const handleClickWordChoice = (index) => {
    console.log(index);
    // add to user choice end
    let clickedWord = wordsChoices[index];
    let copyUserArray = [...userChoices];
    copyUserArray.push(clickedWord);
    setUserChoices(copyUserArray);
    // remove from choices
    let copyChoicesArray = [...wordsChoices];
    copyChoicesArray.splice(index, 1);
    setWordsChoices(copyChoicesArray);
    //check answer will be triggered by useEffect watched userChoices
  };

  return (
    <div className="block">
      <div className="block__user">
        {userChoices.map((word, index) => (
          <span
            key={word + String(index)}
            className="block__user-word"
            onClick={() => handleClickUserChoice(index)}
          >
            {word}
          </span>
        ))}
      </div>
      <div className="block__choices">
        {wordsChoices.map((word, index) => (
          <span
            key={word + String(index)}
            className="block__word"
            onClick={() => handleClickWordChoice(index)}
          >
            {word}
          </span>
        ))}
      </div>
      {wordsChoices.length === 0 && <p className="block__message">{message}</p>}
    </div>
  );
};

export default SentenceBlock;
