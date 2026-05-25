import * as Speech from "expo-speech";

export const speak = (text: string, onStart?: () => void, onEnd?: () => void) => {
  Speech.stop();

  onStart?.();

  Speech.speak(text, {
    language: "en-US",
    rate: 0.6,
    onDone: onEnd,
  });
};

