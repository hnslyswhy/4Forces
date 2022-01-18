import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import "./SentenceBlock.scss";

const SentenceBlock = (props) => {
  let wordsArray = props.blockString.split(" ");

  const [randomArrayObj, setRandomArrayObj] = useState(null);

  useEffect(() => {
    //shuffle words order
    let randomOrderArray = [...wordsArray];
    for (let i = randomOrderArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomOrderArray[i], randomOrderArray[j]] = [
        randomOrderArray[j],
        randomOrderArray[i],
      ];
    }
    console.log(randomOrderArray);
    // give each word an id
    let randomListObj = [];
    randomOrderArray.forEach((word) =>
      randomListObj.push({ word: word, id: uuidv4() })
    );
    setRandomArrayObj(randomListObj);
  }, [props.blockString]);

  const checkSentence = () => {
    let rightIndexOrder = [];
    wordsArray.forEach((word) => {
      randomArrayObj.forEach((wordObj, index) => {
        if (wordObj.word === word) {
          rightIndexOrder.push(index);
        }
      });
    });
    return rightIndexOrder;
  };

  const handleOnDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;

    const items = Array.from(randomArrayObj);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRandomArrayObj(items);
    let indexCheckList = checkSentence();
    console.log(indexCheckList);
  };

  return (
    <>
      {randomArrayObj && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="randomArray">
            {(provided) => (
              <div
                className="block"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {randomArrayObj.map((word, index) => {
                  return (
                    <Draggable
                      key={word.id}
                      draggableId={String(index)}
                      index={index}
                    >
                      {(provided) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="block__word"
                        >
                          {word.word}
                        </span>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
};

export default SentenceBlock;
