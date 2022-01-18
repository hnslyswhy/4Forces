import React, { useState, useEffect } from "react";

/*
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
*    rate: is the speed at which text will be read, the value range is from [0-2]. The default
*          is 1.
*    delay: is the time in seconds before reading each conversation object. ex. 1 (sec)
*           the default is 0 (sec).
*/
const useConversationSpeech = (conversation, rate = 1, onConversationEnd) => {
  const [allVoices, setAllVoices] = useState(null);
  const [localRate, setLocalRate] = useState(rate);

  //initiate speechSynthesis
  const synth = window.speechSynthesis;

  useEffect(() => {
    let voices = synth.getVoices();
    setTimeout(() => {
      setAllVoices(voices);
    }, 500);
  }, []);

  /* // This event handler will notify when the list of voices is returned.
  synth.onvoiceschanged = () => {
    let voices = synth.getVoices();
    if (voices && voices.length) {
      setAllVoices(voices);
    
      voices.forEach((voice, index) => {
        console.log(`${index}: ${voice.lang} ${voice.name}`);
      });
  
    }
  };  */

  const initConversation = () => {
    if (synth.speaking) {
      synth.cancel();
    }
    // Push into synth a queue of conversation tracks.
    conversation.forEach((element, index) => {
      let utter = new SpeechSynthesisUtterance();
      //when a section of the queue finish
      utter.onend = (event) => {
        console.log(
          `useConversationSpeech: Finished speaking track #${index} in conversation>`
        );
        // when all the queue finish
        if (index === conversation.length - 1) {
          onConversationEnd();
        }
      };
      //when has error
      utter.onerror = (event) => {
        console.error("useConversationSpeech: " + event.error);
      };
      //set audio text/script
      utter.text = element.en;
      //set audio voice/accent
      if (allVoices.length) {
        switch (element.speaker) {
          case "controller":
            utter.voice = allVoices[33];
            //   utter.pitch = 0.75;
            break;
          case "pilot":
            utter.voice = allVoices[3];
            break;
          case "question":
            utter.voice = allVoices[0];
            break;
          default:
            utter.voice = allVoices[11];
        }
      }
      //set audio language
      utter.lang = "en-US";
      //set audio speed
      utter.rate = localRate;
      synth.speak(utter);
      synth.pause();
    });
    //    console.log(`useConversationSpeech: Queued ${conversation.length} tracks.`);
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
    onConversationEnd();
  };

  const setRate = (rate) => {
    let r = rate;
    if (rate > 2.0) {
      r = 2.0;
    } else if (rate < 0.0) {
      r = 0.0;
    }
    setLocalRate(r);
    reset();
  };

  return {
    conversationPlay: play,
    conversationPause: pause,
    conversationReset: reset,
    setRate: setRate,
    isSpeaking: synth.isSpeaking,
  };
};

export default useConversationSpeech;
