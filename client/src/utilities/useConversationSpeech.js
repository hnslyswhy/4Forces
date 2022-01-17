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
const useConversationSpeech = (conversation, rate = 1, delay = 0) => {
  // Fetch and store a local set of voices supported by this browser. The speech API handles
  // this in an asynchronous manner so we need to manage this request.
  const [allVoices, setAllVoices] = useState(null);
  // Set the current index of the conversation that is being spoken out loud.
  const [audioArrayIndex, setAudioArrayIndex] = useState(0);
  // Determine if speech has been started.
  const [isSpeechStarted, setSpeechStarted] = useState(false);

  // We cannot initiate the audio until the voices list is returned to support multiple
  // speaker voices. If there is only one conversation object then we can ignore and
  // default to just one default voice.
  useEffect(() => {
    if (allVoices && allVoices.length) {
      setAudioArrayIndex(0);
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

  // setup text/utter, can only be activated with user interaction or you will
  // get an error "not-allowed".
  const setupUtterance = () => {};

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
          utter.pitch = 0.75;
          break;
        case "pilot":
          utter.voice = allVoices[33];
          break;
        default:
          utter.voice = allVoices[0];
      }
      //utter.lang = "en-US";
      synth.speak(utter);
      synth.pause();
    });
    console.log(`useConversationSpeech: Queued ${conversation.length} tracks.`);
  };

  const play = () => {
    if (!synth.paused && !synth.speaking) {
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

  return {
    conversationPlay: play,
    conversationPause: pause,
    conversationReset: reset,
  };
};

export default useConversationSpeech;
