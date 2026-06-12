import * as Speech from "expo-speech";
import { Platform } from "react-native";

/** Slightly higher pitch and slower rate for a softer, kid-friendly voice. */
const SPEECH_OPTIONS = {
  language: "en-US",
  rate: Platform.select({ ios: 0.46, android: 0.88, default: 0.9 }),
  pitch: Platform.select({ ios: 1.35, android: 1.15, default: 1.2 }),
} as const;

export const speak = (
  text: string,
  onStart?: () => void,
  onEnd?: () => void
) => {
  Speech.stop();
  onStart?.();

  Speech.speak(text, {
    ...SPEECH_OPTIONS,
    onDone: onEnd,
    onStopped: onEnd,
    onError: onEnd,
  });
};
