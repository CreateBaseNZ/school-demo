import { useState, useEffect } from "react";

const useTts = () => {
  const [tts, setTts] = useState({ supported: true, isSpeaking: false });

  useEffect(() => {
    if (!"speechSynthesis" in window) {
      setTts((curr) => ({ ...curr, supported: false }));
    }
  }, []);

  let timeout;
  const timer = () => {
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
    timeout = setTimeout(timer, 10000);
  };

  const speak = () => {
    setTts((curr) => ({ ...curr, isSpeaking: true }));

    window.speechSynthesis.cancel();
    timeout = setTimeout(timer, 10000);
    const speech = new SpeechSynthesisUtterance(ttsSettings.text);
    speech.onend = () => {
      clearTimeout(timeout);
      setTts((curr) => ({ ...curr, isSpeaking: false }));
    };
    window.speechSynthesis.speak(speech);
  };

  const stopSpeak = () => {
    window.speechSynthesis.cancel();
    setTts((curr) => ({ ...curr, isSpeaking: false }));
  };

  return [tts.supported, tts.isSpeaking, speak, stopSpeak];
};

export default useTts;
