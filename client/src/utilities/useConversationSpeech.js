import React, { useState, useEffect } from "react";

/*
* Args:
*   conversation: is a list of conversation objects with the properties 
                  [speaker, en] that will be read in order.
*       Ex. 
*       [
*          {
*              "speaker": "controller",
*              "en": "Read this text out loud"
*          }
*          ...
*       ],
*    rate: is the speed at which text will be read, the value range is from [0-1]. The default
*          is 1.
*    delay: is the time in seconds before reading each conversation object. ex. 1 (sec)
*           the default is 0 (sec).
*/
const useConversationSpeech = (conversation, rate = 1) => {
  // Fetch and store a local set of voices supported by this browser.
  // The speech API handles this in an asynchronous manner .
  const [allVoices, setAllVoices] = useState(null);

  const [localRate, setLocalRate] = useState(rate);
  // Cannot initiate the audio until the voices list is returned.
  // If there is only one conversation object then we can ignore and default to just one default voice.
  useEffect(() => {
    if (allVoices && allVoices.length) {
    }
  }, [allVoices]);

  setTimeout(5000, () => {
    if (!allVoices || allVoices.length === 0) {
      console.error("useConversationSpeech: Unable to fetch speech voices.");
    }
  });

  //initiate speechSynthesis
  const synth = window.speechSynthesis;
  // This will trigger the async fetch of the voices list. It is a no-op.
  synth.getVoices();

  // This event handler will notify when the list of voices is returned. Note:
  // In some cases the voices might still not be retrieved and we still need to
  // wait for the results.
  synth.onvoiceschanged = () => {
    let voices = synth.getVoices();
    if (voices && voices.length) {
      setAllVoices(voices);

      // Debug code
      /*
      voices.forEach((voice, index) => {
        console.log(`${index}: ${voice.lang} ${voice.name}`);
      });
      */
    }
  };

  const initConversation = () => {
    if (synth.speaking) {
      synth.cancel();
    }

    // Push into synth a queue of conversation tracks.
    conversation.forEach((element) => {
      let utter = new SpeechSynthesisUtterance();

      utter.onend = (event) => {
        console.log(
          `useConversationSpeech: Finished speaking all ${conversation.length} tracks in conversation>`
        );
      };

      utter.onerror = (event) => {
        console.error("useConversationSpeech: " + event.error);
      };

      utter.text = element.en;
      switch (element.speaker) {
        case "controller":
          utter.voice = allVoices[40];
          //       utter.pitch = 0.75;
          break;
        case "pilot":
          utter.voice = allVoices[33];
          break;
        default:
          utter.voice = allVoices[0];
      }
      utter.lang = "en-US";
      utter.rate = localRate;
      synth.speak(utter);
      synth.pause();
    });
    console.log(`useConversationSpeech: Queued ${conversation.length} tracks.`);
  };

  const play = () => {
    if (!synth.paused || !synth.speaking) {
      initConversation();
    }
    synth.resume();
  };

  const pause = () => {
    synth.pause();
  };

  const reset = () => {
    synth.cancel();
  };

  const setRate = (rate) => {
    let r = rate;
    if (rate > 10.0) {
      rate = 10.0;
    } else if (rate < 0.0) {
      rate = 0.0;
    }
    setLocalRate(r);
    reset();
  };

  /*   const checkPlaying = () => {
    return synth.speaking;
  }; */

  return {
    conversationPlay: play,
    conversationPause: pause,
    conversationReset: reset,
    setRate: setRate,
    /*     checkPlaying: checkPlaying, */
  };
};

export default useConversationSpeech;
