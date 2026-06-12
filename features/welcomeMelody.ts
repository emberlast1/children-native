import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from "expo-audio";

const welcomeMelodySource = require("../assets/audio/welcome-melody.wav");

let player: AudioPlayer | null = null;
let audioModeReady = false;

const getPlayer = () => {
  if (!player) {
    player = createAudioPlayer(welcomeMelodySource);
  }
  return player;
};

const ensureAudioMode = async () => {
  if (audioModeReady) return;

  await setAudioModeAsync({
    playsInSilentMode: true,
    shouldPlayInBackground: false,
    interruptionMode: "mixWithOthers",
  });

  audioModeReady = true;
};

const waitForLoaded = async (activePlayer: AudioPlayer) => {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (activePlayer.isLoaded) return true;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  return activePlayer.isLoaded;
};

export const playWelcomeMelody = async (): Promise<boolean> => {
  try {
    await ensureAudioMode();
    const activePlayer = getPlayer();
    activePlayer.volume = 0.46;
    activePlayer.loop = false;

    await waitForLoaded(activePlayer);

    if (activePlayer.isLoaded) {
      await activePlayer.seekTo(0);
    }

    activePlayer.play();
    return true;
  } catch {
    return false;
  }
};

export const stopWelcomeMelody = () => {
  try {
    if (!player) return;

    player.pause();

    if (player.isLoaded) {
      void player.seekTo(0).catch(() => undefined);
    }
  } catch {
    // Player can already be released during fast navigation.
  }
};
